window.addEventListener('load', () => {
    const tl = gsap.timeline();

    // 1. Animazione Barra di Caricamento
    tl.to("#loader-progress", {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
            const p = Math.round(this.progress() * 100);
            document.getElementById('loader-status').innerText = `Booting: ${p}%`;
        }
    });

    // 2. Sparizione Loader e Apparsa Content
    tl.to("#loader", {
        opacity: 0,
        duration: 0.8,
        display: "none"
    });

    tl.to(".gateway-wrapper", {
        opacity: 1,
        duration: 1
    }, "-=0.5");

    // 3. Animazione Archi (Ingresso)
    tl.from(".arch", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "expo.out"
    }, "-=0.8");
});

window.addEventListener('load', () => {
    const hoverSnd = document.getElementById('snd-hover');
    const clickSnd = document.getElementById('snd-click');
    const warp = document.getElementById('warp-effect');

    // Animazione ingresso
    gsap.from(".portal-gate", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "expo.out"
    });

    document.querySelectorAll('.portal-gate').forEach(gate => {
        // Suono Hover
        gate.addEventListener('mouseenter', () => {
            hoverSnd.currentTime = 0;
            hoverSnd.volume = 0.2;
            hoverSnd.play();
        });

        // Click e Transizione Warp
        gate.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            const themeColor = getComputedStyle(this).getPropertyValue('--theme-color');

            clickSnd.play();
            warp.style.background = themeColor;

            // Esplosione Warp
            gsap.to(warp, {
                scale: 6000,
                duration: 1.2,
                ease: "power4.in",
                onComplete: () => {
                    window.location.href = url;
                }
            });
        });
    });
});

// Usiamo una variabile per tracciare il caricamento effettivo
let isLoaded = false;
window.addEventListener('load', () => { isLoaded = true; });

const startBootSequence = () => {
    const tl = gsap.timeline();
    const progressEl = document.getElementById('loader-progress');
    const statusEl = document.getElementById('loader-status');

    // Animazione della barra: si muove in base a quanto tempo passa, 
    // ma aspetta il segnale "isLoaded" per finire.
    tl.to(progressEl, {
        width: "100%",
        duration: 3, // Tempo massimo stimato
        ease: "power1.out",
        onUpdate: function() {
            const p = Math.round(this.progress() * 90); // Arriva al 90% "sperando"
            statusEl.innerText = `Booting: ${p}%`;
            
            // Se la pagina è caricata davvero, saltiamo alla fine
            if (isLoaded && this.progress() > 0.5) {
                this.duration(this.time() + 0.2); // Accelera la chiusura
            }
        },
        onComplete: () => {
            statusEl.innerText = `System Online: 100%`;
            revealPage();
        }
    });
};

const revealPage = () => {
    const tl = gsap.timeline();
    
    tl.to("#loader", {
        opacity: 0,
        duration: 0.8,
        display: "none",
        delay: 0.5 // Diamo il tempo di leggere "100%"
    });

    tl.to(".gateway-wrapper", {
        opacity: 1,
        duration: 1
    }, "-=0.4");

    tl.from(".arch", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "expo.out"
    }, "-=0.7");
};

// Avvia la sequenza al caricamento del DOM
document.addEventListener('DOMContentLoaded', startBootSequence);