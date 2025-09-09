const btn = document.getElementById("toggleInfo");
const extraInfo = document.getElementById("extraInfo");

btn.addEventListener("click", () => {
  extraInfo.classList.toggle("active");

  if (extraInfo.classList.contains("active")) {
    btn.textContent = "Ocultar información";
  } else {
    btn.textContent = "Mostrar más información";
  }
});

// 

const card = document.getElementById('profileCard');
const layers = card.querySelectorAll('.card-layer');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  layers.forEach((layer, i) => {
    const depth = (i + 1) * 5; // cuanto mayor el índice, más se mueve
    layer.style.transform = `translateX(${x * depth}px) translateY(${y * depth}px)`;
  });
});

card.addEventListener('mouseleave', () => {
  layers.forEach(layer => {
    layer.style.transform = 'translateX(0px) translateY(0px)';
  });
});
