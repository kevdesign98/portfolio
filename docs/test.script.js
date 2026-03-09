/**
 * GATEWAY ENGINE: INTERSTELLAR EDITION
 * Logic: Particles + Tilt 3D + Warp Jump
 */

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let warpSpeed = 0.5; // Velocità di crociera
let isWarping = false;

// 1. CONFIGURAZIONE CANVAS
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// 2. CLASSE PARTICELLE (EFFETTO SCIA)
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        // Velocità radiale dal centro
        this.vX = (this.x - canvas.width / 2) * 0.005;
        this.vY = (this.y - canvas.height / 2) * 0.005;
        this.history = []; // Per le scie nel warp
    }

    update() {
        this.x += this.vX * (isWarping ? warpSpeed : 1);
        this.y += this.vY * (isWarping ? warpSpeed : 1);

        // Se esce dallo schermo, resetta
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        if (isWarping) {
            // Disegna scia cinematografica
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = this.size;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.vX * 2, this.y - this.vY * 2);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Inizializza particelle
for (let i = 0; i < 150; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// 3. TILT 3D CARD (L'EFFETTO PROFESSIONALE)
const cards = document.querySelectorAll('.portal-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Rotazione calibrata (max 8 gradi per eleganza)
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        
        // Gestione spotlight (se presente nel CSS)
        const spotlight = card.querySelector('.spotlight');
        if (spotlight) {
            spotlight.style.setProperty('--mouse-x', `${x}px`);
            spotlight.style.setProperty('--mouse-y', `${y}px`);
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
});

// 4. SEQUENZA DI CARICAMENTO E START
const startBtn = document.getElementById('start-btn');
const progressBar = document.getElementById('progress-bar');

let load = 0;
const interval = setInterval(() => {
    load += Math.random() * 15;
    if (load >= 100) {
        load = 100;
        clearInterval(interval);
        gsap.to(startBtn, { display: 'block', opacity: 1, duration: 0.5 });
    }
    progressBar.style.width = load + '%';
}, 100);

startBtn.addEventListener('click', () => {
    const tl = gsap.timeline();
    tl.to("#loader", { y: "-100%", duration: 1.2, ease: "expo.inOut" })
      .to("#main-content", { visibility: "visible", opacity: 1, duration: 1.5 }, "-=0.5");
});

// 5. IL SALTO NELL'IPERSPAZIO (WARP JUMP)
cards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        const accentColor = getComputedStyle(this).getPropertyValue('--clr');

        // Attiva effetto Interstellar
        isWarping = true;
        gsap.to(window, { 
            duration: 2, 
            onUpdate: () => { warpSpeed += 0.5; } 
        });

        // Transizione finale
        const tl = gsap.timeline();
        tl.to("#main-content", { 
            opacity: 0, 
            scale: 0.85, 
            filter: "blur(10px)", 
            duration: 0.8, 
            ease: "power2.in" 
        })
        .to("#warp-veil", { 
            backgroundColor: accentColor, 
            scaleY: 1, 
            duration: 1.2, 
            ease: "expo.inOut",
            onComplete: () => { window.location.href = url; }
        }, "-=0.2");
    });
});