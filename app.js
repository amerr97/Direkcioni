// Input elements
const yaInput = document.getElementById('ya');
const xaInput = document.getElementById('xa');
const ybInput = document.getElementById('yb');
const xbInput = document.getElementById('xb');
const distanceDisplay = document.getElementById('distance');
const angleDisplay = document.getElementById('angle');
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Keyboard navigation
yaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') xaInput.focus();
});

xaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') ybInput.focus();
});

ybInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') xbInput.focus();
});

xbInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') xbInput.blur();
});

// Calculate and update on input
[yaInput, xaInput, ybInput, xbInput].forEach(input => {
    input.addEventListener('input', updateCalculations);
});

function isValidDecimal(value) {
    if (value === '' || value === '-') return true;
    return /^-?\d*\.?\d*$/.test(value);
}

function calculateDAngle(ya, xa, yb, xb) {
    if (ya === null || xa === null || yb === null || xb === null) return null;
    
    const deltaY = yb - ya;
    const deltaX = xb - xa;
    
    if (deltaX === 0) return null;
    
    let dAngle = Math.atan(deltaY / deltaX);
    
    // Apply quadrant corrections
    if (deltaY > 0 && deltaX > 0) {
        // No adjustment
    } else if (deltaY > 0 && deltaX < 0) {
        dAngle += Math.PI;
    } else if (deltaY < 0 && deltaX < 0) {
        dAngle += Math.PI;
    } else if (deltaY < 0 && deltaX > 0) {
        dAngle += 2 * Math.PI;
    }
    
    return dAngle;
}

function calculateDistance(ya, xa, yb, xb) {
    if (ya === null || xa === null || yb === null || xb === null) return null;
    
    const deltaY = ya - yb;
    const deltaX = xa - xb;
    
    return Math.sqrt(deltaY * deltaY + deltaX * deltaX);
}

function convertToDMS(angleRad) {
    if (angleRad === null) return 'N/A';
    
    const angleDeg = angleRad * 180.0 / Math.PI;
    
    const degrees = Math.floor(angleDeg);
    const minutesFloat = (angleDeg - degrees) * 60.0;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60.0);
    
    return `${degrees}° ${String(minutes).padStart(2, '0')}' ${String(seconds).padStart(2, '0')}"`;
}

function updateCalculations() {
    const ya = parseFloat(yaInput.value) || null;
    const xa = parseFloat(xaInput.value) || null;
    const yb = parseFloat(ybInput.value) || null;
    const xb = parseFloat(xbInput.value) || null;
    
    const distance = calculateDistance(ya, xa, yb, xb);
    const dAngle = calculateDAngle(ya, xa, yb, xb);
    const dAngleSec = convertToDMS(dAngle);
    
    // Update displays
    if (distance !== null) {
        distanceDisplay.textContent = `Dužina je ${distance.toFixed(3)} m`;
    } else {
        distanceDisplay.textContent = 'Dužina je N/A m';
    }
    
    angleDisplay.textContent = `Direkcioni ugao: ${dAngleSec}`;
    
    // Update graph
    drawGraph(ya, xa, yb, xb);
}

function drawGraph(ya, xa, yb, xb) {
    if (ya === null || xa === null || yb === null || xb === null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 50;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Find min/max values (Y -> X axis, X -> Y axis)
    const minX = Math.min(ya, yb);
    const maxX = Math.max(ya, yb);
    const minY = Math.min(xa, xb);
    const maxY = Math.max(xa, xb);
    
    // Add padding
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const paddingX = rangeX > 0 ? rangeX * 0.1 : 1.0;
    const paddingY = rangeY > 0 ? rangeY * 0.1 : 1.0;
    
    const scaledMinX = minX - paddingX;
    const scaledMaxX = maxX + paddingX;
    const scaledMinY = minY - paddingY;
    const scaledMaxY = maxY + paddingY;
    
    const scaleX = graphWidth / (scaledMaxX - scaledMinX);
    const scaleY = graphHeight / (scaledMaxY - scaledMinY);
    
    // Convert coordinates to screen coordinates
    function mapToScreenX(yCoord) {
        return padding + (yCoord - scaledMinX) * scaleX;
    }
    
    function mapToScreenY(xCoord) {
        return padding + graphHeight - (xCoord - scaledMinY) * scaleY;
    }
    
    // Calculate screen positions
    const pointAX = mapToScreenX(ya);
    const pointAY = mapToScreenY(xa);
    const pointBX = mapToScreenX(yb);
    const pointBY = mapToScreenY(xb);
    
    // Draw line between A and B
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pointAX, pointAY);
    ctx.lineTo(pointBX, pointBY);
    ctx.stroke();
    
    // Draw point A (blue circle, 10px radius)
    ctx.fillStyle = '#2196F3';
    ctx.beginPath();
    ctx.arc(pointAX, pointAY, 10, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw point B (red circle, 10px radius)
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(pointBX, pointBY, 10, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw text labels
    ctx.font = '20px Arial';
    ctx.fillStyle = '#2196F3';
    ctx.fillText('A', pointAX + 12, pointAY - 8);
    
    ctx.fillStyle = '#F44336';
    ctx.fillText('B', pointBX + 12, pointBY - 8);
}

// Initial draw
updateCalculations();
