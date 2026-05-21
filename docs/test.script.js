
// const canvas = document.getElementById('particle-canvas');
// const ctx = canvas.getContext('2d');
// const cards = document.querySelectorAll('.portal-card');
// const startBtn = document.getElementById('start-btn');
// const progressBar = document.getElementById('progress-bar');
// const cursor = document.getElementById('custom-cursor');

// let blobs = [];
// let isWarping = false;

//  function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// window.addEventListener('resize', resize);
// resize();

//  class MeshBlob {
//     constructor() {
//         this.reset();
//         this.initFloating();
//     }

//     reset() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 500 + 300;

//         const palette = [
//             'rgba(0, 210, 255, 0.15)', 
//             'rgba(255, 0, 85, 0.12)',   
//             'rgba(100, 50, 255, 0.1)',  
//             'rgba(255, 255, 255, 0.05)' 
//         ];
//         this.color = palette[Math.floor(Math.random() * palette.length)];
//     }

//      initFloating() {
//         gsap.to(this, {
//             x: `+=${Math.random() * 300 - 150}`,
//             y: `+=${Math.random() * 300 - 150}`,
//             duration: Math.random() * 15 + 15,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut"
//         });

//         gsap.to(this, {
//             size: this.size * 1.3,
//             duration: Math.random() * 8 + 8,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut"
//         });
//     }

//     draw() {
//         const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
//         grad.addColorStop(0, this.color);
//         grad.addColorStop(1, 'transparent');

//         ctx.fillStyle = grad;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//     }
// }


// for (let i = 0; i < 8; i++) blobs.push(new MeshBlob());

// function animate() {
//      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     blobs.forEach(blob => {
//          if (isWarping) {
//             blob.size += 20;
//             blob.x += (blob.x - canvas.width / 2) * 0.1;
//             blob.y += (blob.y - canvas.height / 2) * 0.1;
//         }
//         blob.draw();
//     });
//     requestAnimationFrame(animate);
// }
// animate();

// if (window.innerWidth > 768) {
//     cards.forEach(card => {
//         card.addEventListener('mousemove', (e) => {
//             const rect = card.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
//             const centerX = rect.width / 2;
//             const centerY = rect.height / 2;
//             const rotateX = (y - centerY) / 15;
//             const rotateY = (centerX - x) / 15;

//             // Tilt fluido con GSAP
//             gsap.to(card, {
//                 rotateX: rotateX,
//                 rotateY: rotateY,
//                 y: -10,
//                 duration: 0.6,
//                 ease: "power2.out",
//                 overwrite: true
//             });
//         });

//         card.addEventListener('mouseenter', () => {
//             cursor.classList.add('active');
//             cursor.innerText = "EXPLORE";

//              const isImmersive = card.querySelector('.portal-name').innerText.includes('Immersive');
//             if (isImmersive) {
//                 gsap.to(canvas, { filter: "blur(40px) brightness(0.7) saturate(1.8)", duration: 1 });
//             } else {
//                 gsap.to(canvas, { filter: "blur(80px) brightness(1.3) grayscale(0.6)", duration: 1 });
//             }
//         });

//         card.addEventListener('mouseleave', () => {
//             cursor.classList.remove('active');
//             cursor.innerText = "";

//              gsap.to(canvas, { filter: "blur(60px) brightness(1) saturate(1)", duration: 1 });

//             gsap.to(card, {
//                 rotateX: 0,
//                 rotateY: 0,
//                 y: 0,
//                 duration: 1.2,
//                 ease: "elastic.out(1, 0.3)"
//             });
//         });
//     });
// }

//  window.addEventListener('mousemove', (e) => {
//     gsap.to(cursor, {
//         x: e.clientX,
//         y: e.clientY,
//         duration: 0.4,
//         ease: "power3.out"
//     });
// });

//  let progress = 0;
// const loaderInterval = setInterval(() => {
//     progress += Math.random() * 15;
//     if (progress >= 100) {
//         progress = 100;
//         clearInterval(loaderInterval);
//         gsap.to(startBtn, { display: 'block', opacity: 1, duration: 0.8 });
//     }
//     progressBar.style.width = progress + '%';
// }, 100);

// startBtn.addEventListener('click', () => {
//     const tl = gsap.timeline();
//     tl.to("#loader", { y: "-100%", duration: 1.2, ease: "expo.inOut" })
//         .to("#main-content", {
//             visibility: "visible",
//             opacity: 1,
//             duration: 1.5,
//             onComplete: () => { document.body.style.overflowY = "auto"; }
//         }, "-=0.4")
//         .from(".portal-card", { y: 100, opacity: 0, stagger: 0.2, duration: 1.2, ease: "power4.out" }, "-=1");
// });

//  cards.forEach(card => {
//     card.addEventListener('click', function (e) {
//         e.preventDefault();
//         const url = this.getAttribute('href');
//         const accentColor = getComputedStyle(this).getPropertyValue('--clr');

//         isWarping = true;

//         const tl = gsap.timeline();
//         tl.to(canvas, { filter: "brightness(4) blur(0px)", duration: 1.2, ease: "power2.in" })
//             .to("#main-content", { opacity: 0, scale: 0.8, duration: 0.8 }, 0)
//             .to("#warp-veil", {
//                 backgroundColor: accentColor,
//                 scaleY: 1,
//                 duration: 1,
//                 ease: "expo.inOut",
//                 onComplete: () => { window.location.href = url; }
//             }, "-=0.4");
//     });
// });
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

    // Animazione GSAP
    document.querySelectorAll('.char-wrapper').forEach(char => {
        char.addEventListener('mouseenter', () => {
            gsap.to(char.querySelector('.char-inner'), {
                x: "-120%", // Scivola verso l'alto per mostrare il clone
                duration: 0.5,
                ease: "power4.out"
            });
        });

        char.addEventListener('mouseleave', () => {
            gsap.to(char.querySelector('.char-inner'), {
                x: "0%", // Ritorna alla posizione originale
                duration: 0.5,
                ease: "power4.out"
            });
        });
    });
});

const displayBox = document.querySelector('.display-box');
const triggers = document.querySelectorAll('.nav-link');

triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
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
            y: 10,
            duration: 0.4
        });
    });
});

