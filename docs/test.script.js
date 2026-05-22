document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector('.hero-name');
    const words = title.innerText.split(' ');

    // Crea la struttura: Parola > Lettera > (Originale + Clone)
    title.innerHTML = words.map(word => `
        <span class="word">
            ${word.split('').map(char => `
                <div class="char-wrapper">
                    <div class="char-inner">
                        <span class="original">${char}</span>
                        <span class="clone">${char}</span>
                    </div>
                </div>
            `).join('')}
        </span>
    `).join('');

    // Animazione GSAP - Scivola verticalmente per mostrare il clone
    document.querySelectorAll('.char-wrapper').forEach(char => {
        char.addEventListener('mouseenter', () => {
            gsap.to(char.querySelector('.char-inner'), {
                yPercent: -50, // Scivola verso l'alto del 50% della sua altezza totale (2em -> 1em) per mostrare il clone
                duration: 0.4,
                ease: "power3.out"
            });
        });

        char.addEventListener('mouseleave', () => {
            gsap.to(char.querySelector('.char-inner'), {
                yPercent: 0, // Ritorna alla posizione originale
                duration: 0.4,
                ease: "power3.out"
            });
        });
    });
});

const displayBox = document.querySelector('.display-box');
const activeMedia = document.getElementById('active-media');
const triggers = document.querySelectorAll('.nav-link');

// Mappa delle immagini corrispondenti ai trigger
const mediaMap = {
    'trigger-visual': 'assets/imgs/room.png',
    'trigger-designer': 'assets/imgs/portfolio.png'
};

triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        const id = trigger.id;
        if (mediaMap[id]) {
            activeMedia.src = mediaMap[id];
            activeMedia.alt = trigger.textContent.trim();
        }
        gsap.to(displayBox, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power4.out"
        });
    });

    trigger.addEventListener('mouseleave', () => {
        gsap.to(displayBox, {
            opacity: 0,
            y: 15,
            duration: 0.4
        });
    });
});


// Simulazione progresso o tracking reale
let progress = 0;
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

function updateLoader() {
    progress += Math.random() * 10; // Incremento casuale
    if (progress > 100) progress = 100;

    progressBar.style.width = progress + "%";
    progressText.innerText = Math.floor(progress) + "%";

    if (progress < 100) {
        requestAnimationFrame(updateLoader);
    } else {
        finishLoader();
    }
}

function finishLoader() {
    gsap.to("#loader-wrapper", {
        y: "-100%", // La transizione verso l'alto
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
            document.getElementById('loader-wrapper').style.display = 'none';
            // Qui parte l'animazione della Hero Section
            animateHero();
        }
    });
}

function animateHero() {
    // Animazione di ingresso della tua Hero
    gsap.from(".hero-name", { opacity: 0, y: 50, duration: 1 });
}

updateLoader();