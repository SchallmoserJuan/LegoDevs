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
