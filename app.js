// ===== ELEMENTI =====
const yaInput = document.getElementById('ya');
const xaInput = document.getElementById('xa');
const ybInput = document.getElementById('yb');
const xbInput = document.getElementById('xb');

const distanceDisplay = document.getElementById('distance');
const angleDisplay = document.getElementById('angle');

const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// ===== TASTATURA (ENTER) =====
yaInput.addEventListener('keydown', e => { if (e.key === 'Enter') xaInput.focus(); });
xaInput.addEventListener('keydown', e => { if (e.key === 'Enter') ybInput.focus(); });
ybInput.addEventListener('keydown', e => { if (e.key === 'Enter') xbInput.focus(); });
xbInput.addEventListener('keydown', e => { if (e.key === 'Enter') xbInput.blur(); });

// ===== AUTOMATSKI UPDATE =====
[yaInput, xaInput, ybInput, xbInput].forEach(input => {
    input.addEventListener('input', updateCalculations);
});

// ===== MATEMATIKA =====
function calculateDistance(ya, xa, yb, xb) {
    const dY = yb - ya;
    const dX = xb - xa;
    return Math.sqrt(dY * dY + dX * dX);
}

function calculateDAngle(ya, xa, yb, xb) {
    let angle = Math.atan2(yb - ya, xb - xa); // svi kvadranti
    if (angle < 0) angle += 2 * Math.PI;
    return angle;
}

function convertToDMS(angleRad) {
    if (angleRad === null) return 'N/A';

    let degTotal = angleRad * 180 / Math.PI;

    let deg = Math.floor(degTotal);
    let minFloat = (degTotal - deg) * 60;
    let min = Math.floor(minFloat);
    let sec = Math.round((minFloat - min) * 60);

    if (sec === 60) { sec = 0; min++; }
    if (min === 60) { min = 0; deg++; }

    return `${deg}° ${String(min).padStart(2,'0')}' ${String(sec).padStart(2,'0')}"`;
}

// ===== GLAVNA FUNKCIJA =====
function updateCalculations() {
    const ya = parseFloat(yaInput.value);
    const xa = parseFloat(xaInput.value);
    const yb = parseFloat(ybInput.value);
    const xb = parseFloat(xbInput.value);

    if (isNaN(ya) || isNaN(xa) || isNaN(yb) || isNaN(xb)) {
        distanceDisplay.textContent = 'Dužina je N/A m';
        angleDisplay.textContent = 'Direkcioni ugao: N/A';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    const distance = calculateDistance(ya, xa, yb, xb);
    const angleRad = calculateDAngle(ya, xa, yb, xb);
    const angleDMS = convertToDMS(angleRad);

    distanceDisplay.textContent = `Dužina je ${distance.toFixed(3)} m`;
    angleDisplay.textContent = `Direkcioni ugao: ${angleDMS}`;

    drawGraph(ya, xa, yb, xb);
}

// ===== CRTANJE =====
function drawGraph(ya, xa, yb, xb) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 50;
    const w = canvas.width - 2 * padding;
    const h = canvas.height - 2 * padding;

    const minX = Math.min(ya, yb);
    const maxX = Math.max(ya, yb);
    const minY = Math.min(xa, xb);
    const maxY = Math.max(xa, xb);

    const dx = maxX - minX || 1;
    const dy = maxY - minY || 1;

    const scaleX = w / dx;
    const scaleY = h / dy;

    const mapX = y => padding + (y - minX) * scaleX;
    const mapY = x => padding + h - (x - minY) * scaleY;

    const Ax = mapX(ya);
    const Ay = mapY(xa);
    const Bx = mapX(yb);
    const By = mapY(xb);

    // Linija
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(Ax, Ay);
    ctx.lineTo(Bx, By);
    ctx.stroke();

    // Tačka A
    ctx.fillStyle = '#2196F3';
    ctx.beginPath();
    ctx.arc(Ax, Ay, 8, 0, Math.PI * 2);
    ctx.fill();

    // Tačka B
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(Bx, By, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '16px Arial';
    ctx.fillStyle = '#2196F3';
    ctx.fillText('A', Ax + 10, Ay - 10);
    ctx.fillStyle = '#F44336';
    ctx.fillText('B', Bx + 10, By - 10);
}

// ===== INIT =====
updateCalculations();
