window.addEventListener('load', () => {
    const tl = gsap.timeline();
    const startBtn = document.getElementById('start-btn');

    // 1. Caricamento barra
    tl.to("#progress-bar", {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to("#status-text", { opacity: 0, duration: 0.3 });
            startBtn.style.display = "block";
            gsap.from(startBtn, { y: 10, opacity: 0, duration: 0.5 });
        }
    });

    // 2. Sequenza d'ingresso dopo il click
    startBtn.addEventListener('click', () => {
        const entryTl = gsap.timeline();

        entryTl.to("#loader", { opacity: 0, duration: 0.8, onComplete: () => document.getElementById('loader').style.display = 'none' })
            .set("#hero-intro", { visibility: "visible" })
            .to("#hero-intro", { opacity: 1, duration: 1 })
            .to("#hero-intro", { opacity: 0, duration: 0.8, delay: 1.2, onComplete: () => document.getElementById('hero-intro').style.display = 'none' })
            .set("#main-content", { visibility: "visible" })
            .to("#main-content", { opacity: 1, duration: 1.5 })
            .from(".portal-card", { y: 60, opacity: 0, stagger: 0.2, duration: 1, ease: "power4.out" }, "-=1");
    });

    startBtn.addEventListener('click', () => {
        const entryTl = gsap.timeline();

        entryTl.to("#loader", { /* ... */ })
            .set("#hero-intro", { visibility: "visible" })
            /* ... altre animazioni ... */
            .set("body", { overflowY: "auto" }) // <--- ABILITA LO SCROLL QUI
            .to("#main-content", { opacity: 1, duration: 1.5 });
    });
});

// --- PARTICELLE ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vX = (Math.random() - 0.5) * 0.4;
        this.vY = (Math.random() - 0.5) * 0.4;
    }
    draw() {
        ctx.fillStyle = "rgba(0, 210, 255, 0.15)";
        ctx.beginPath(); ctx.arc(this.x, this.y, 1.2, 0, Math.PI * 2); ctx.fill();
    }
    update() {
        this.x += this.vX; this.y += this.vY;
        if (this.x < 0 || this.x > canvas.width) this.vX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vY *= -1;
        this.draw();
    }
}
for (let i = 0; i < 100; i++) particles.push(new Particle());
function loop() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => p.update()); requestAnimationFrame(loop); }
loop();

// --- CLICK PORTALI ---
document.querySelectorAll('.portal-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const color = getComputedStyle(card).getPropertyValue('--clr');
        gsap.to("#warp-veil", { backgroundColor: color, scaleY: 1, duration: 0.7, ease: "expo.inOut", onComplete: () => alert("Warping...") });
    });
});