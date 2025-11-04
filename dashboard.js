document.documentElement.style.visibility = "hidden";
document.addEventListener("DOMContentLoaded", () => {
const body = document.body;
const toggle = document.getElementById("toggle-dark-mode");
const estado = localStorage.getItem("modoOscuro");
const ConmodoOscuro = document.getElementsByClassName("modo-oscuro")[0];
const Conspan = document.getElementById("Con-texto");
const Palanca = document.getElementsByClassName("switch")[0];
const IconOscuro = document.getElementById("icon-oscuro");

if (estado === "true") {
    body.classList.add("dark-mode");
    toggle.checked = true;
}

document.documentElement.style.visibility = "visible";

toggle.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("modoOscuro", body.classList.contains("dark-mode"));
});

const sidebar = document.querySelector(".sidebar");
const logo = document.getElementById("toggle-sidebar");

logo.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    ConmodoOscuro.classList.toggle("collapsed");
    Palanca.classList.toggle("volteado");
    if(ConmodoOscuro.classList.contains("collapsed")){
    Conspan.style.display = "none";
    IconOscuro.style.transform = "translateY(-15px)";
    } else {
    Conspan.style.display = "inline";
    IconOscuro.style.transform = "translateY(0)";
    }
});
});
