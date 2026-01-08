  window.addEventListener('load', () => {
            const progress = document.getElementById('loader-progress');
            const loader = document.getElementById('loader');
            const main = document.getElementById('main-content');

            const tl = gsap.timeline();

            // Sincronizzazione caricamento
            tl.to(progress, {
                width: "100%",
                duration: 1.2,
                ease: "power1.inOut"
            })
            .to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                }
            })
            .set(main, { visibility: "visible" }) // Forza la visibilità
            .to(main, {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            }, "-=0.2");
        });

        // Gestione Click e transizione
        document.querySelectorAll('.portal-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const url = this.getAttribute('href');
                const color = getComputedStyle(this).getPropertyValue('--color');
                const veil = document.getElementById('warp-veil');

                veil.style.background = color;
                gsap.to(veil, {
                    scaleY: 1,
                    duration: 0.7,
                    ease: "expo.inOut",
                    onComplete: () => window.location.href = url
                });
            });
        });