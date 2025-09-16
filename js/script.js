// JS seguro y completo para nahir.html
document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------
     Toggle extraInfo (botón)
     --------------------------- */
  const btn = document.getElementById('toggleInfo');
  const extraInfo = document.getElementById('extraInfo');
  if (btn && extraInfo) {
    btn.addEventListener('click', () => {
      extraInfo.classList.toggle('active');
      btn.textContent = extraInfo.classList.contains('active')
        ? 'Ocultar información'
        : 'Mostrar más información';
    });
  }

  /* ---------------------------
     Efecto 3D SOLO en profileCard
     --------------------------- */
  const profileCard = document.getElementById('profileCard');
  if (profileCard && !profileCard.classList.contains('flip-card')) {
    const layers = profileCard.querySelectorAll('.card-layer');
    if (layers.length) {
      const handleMove = (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        layers.forEach((layer, i) => {
          const depth = (i + 1) * 5;
          layer.style.transform = `translateX(${x * depth}px) translateY(${y * depth}px)`;
        });
      };
      const handleLeave = () => {
        layers.forEach(layer => (layer.style.transform = 'translateX(0px) translateY(0px)'));
      };
      profileCard.addEventListener('mousemove', handleMove);
      profileCard.addEventListener('mouseleave', handleLeave);
    }
  }

  /* ---------------------------
     Limpieza: quitar .flipped si quedó
     --------------------------- */
  document.querySelectorAll('.flip-card.flipped').forEach(c => c.classList.remove('flipped'));

  /* ---------------------------
     Reveal (fade/slide) para flip-cards
     --------------------------- */
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    // Nunca aplicar al profileCard aunque por error tenga la clase
    if (card.id === 'profileCard') return;

    if (!card.classList.contains('no-flip')) card.classList.add('no-flip');
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

    const shouldIgnoreClick = (e) => !!e.target.closest('a, button');

    const toggleReveal = (e) => {
      if (shouldIgnoreClick(e)) return;
      card.classList.toggle('revealed');
    };

    card.addEventListener('click', toggleReveal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleReveal(e);
      }
    });
  });
});




//rodrigo//
function cambiarColores() {
  const colores = ["#ffeb3b", "#4caf50", "#2196f3", "#f44336", "#ff9800"];
  const bloques = document.querySelectorAll(".block");
  bloques.forEach(b => {
    const randomColor = colores[Math.floor(Math.random() * colores.length)];
    b.style.background = randomColor;
  });
}
//rodrigo//
document.querySelectorAll(".block").forEach(bloque => {
  bloque.addEventListener("mouseenter", () => {
    console.log("¡Encastraste un bloque LEGO!");
  });
});


//Carlos//
document.addEventListener('DOMContentLoaded', () => {
            const modelViewer = document.querySelector('#orbit-demo');
            const sections = document.querySelectorAll('.section');
            const scrollIndicator = document.querySelector('.scroll-indicator');
            
            // Ocultar indicador de scroll después de comenzar a desplazarse
            let scrollStarted = false;
            
            // Definir las posiciones orbitales para cada sección
            const orbitPositions = [
                '-40deg 100deg 0m',    // Perfil
                '60deg 80deg 0m',     // Contacto
                '120deg 60deg 0m',    // Habilidades
                '180deg 80deg 0m',    // Descripción 2
                '240deg 100deg 0m',   // Descripción 3
                '-40deg 100deg 0m',    // Descripción 4
            ];
            
            // Configurar GSAP ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);
            
            // Animación de aparición para las secciones
            sections.forEach((section, index) => {
                gsap.to(section, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                        onEnter: () => {
                            section.classList.add('active');
                            
                            // Cambiar la órbita de la cámara según la sección
                            if (index < orbitPositions.length) {
                                gsap.to(modelViewer, {
                                    duration: 2,
                                    ease: "power2.inOut",
                                    onUpdate: function() {
                                        modelViewer.cameraOrbit = orbitPositions[index];
                                    }
                                });
                            }
                        },
                        onLeave: () => {
                            section.classList.remove('active');
                        },
                        onEnterBack: () => {
                            section.classList.add('active');
                            
                            // Cambiar la órbita de la cámara al volver
                            if (index < orbitPositions.length) {
                                gsap.to(modelViewer, {
                                    duration: 2,
                                    ease: "power2.inOut",
                                    onUpdate: function() {
                                        modelViewer.cameraOrbit = orbitPositions[index];
                                    }
                                });
                            }
                        },
                        onLeaveBack: () => {
                            section.classList.remove('active');
                        }
                    }
                });
            });
            
            // Ocultar indicador de scroll después de comenzar a desplazarse
            window.addEventListener('scroll', () => {
                if (!scrollStarted) {
                    scrollStarted = true;
                    gsap.to(scrollIndicator, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            scrollIndicator.style.display = 'none';
                        }
                    });
                }
            });
            ;   
        });