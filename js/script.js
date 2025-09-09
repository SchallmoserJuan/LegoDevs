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

