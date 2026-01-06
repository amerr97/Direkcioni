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

    if (isNaN(ya) || isNaN(xa) || isNaN(yb) ||
