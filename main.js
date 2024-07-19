const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const planets = [];
let zoomLevel = 1;

function init() {
    createStars(500);
    createPlanets(5);
    animate();
}

function createStars(count) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        const speed = Math.random() * 0.05;
        stars.push({ x, y, size, speed });
    }
}

function createPlanets(count) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 30 + 20;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const speed = Math.random() * 0.02;
        planets.push({ x, y, radius, color, speed });
    }
}

function drawStars() {
    ctx.fillStyle = '#fff';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * zoomLevel, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawPlanets() {
    planets.forEach(planet => {
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius * zoomLevel, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawPlanets();
    updateStars();
    updatePlanets();
    requestAnimationFrame(animate);
}

function updateStars() {
    stars.forEach(star => {
        star.x += star.speed * zoomLevel;
        if (star.x > canvas.width) star.x = 0;
    });
}

function updatePlanets() {
    planets.forEach(planet => {
        planet.x += planet.speed * zoomLevel;
        if (planet.x > canvas.width) planet.x = 0;
    });
}

document.getElementById('zoomIn').addEventListener('click', () => {
    zoomLevel += 0.1;
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (zoomLevel > 0.1) zoomLevel -= 0.1;
});

document.getElementById('reset').addEventListener('click', () => {
    zoomLevel = 1;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
