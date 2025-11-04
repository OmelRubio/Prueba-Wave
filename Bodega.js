document.addEventListener("DOMContentLoaded", () => {

fetch('/Proyecto-2/php/BodegaConsulta.php')
    .then(Response => Response.json())
    .then(data => {
        const tabla = document.getElementById("tabla-bodega").getElementsByTagName("tbody")[0];

        data.forEach(bodega => {
            const fila = tabla.insertRow();

            const celdaId = fila.insertCell(0);
            const celdaNombre = fila.insertCell(1);
            const celdaDescripcion = fila.insertCell(2);
            const celdaAcciones = fila.insertCell(3);

            celdaId.textContent = bodega.ID;
            celdaNombre.textContent = bodega.nombre;
            celdaDescripcion.textContent = bodega.descripcion;
            celdaAcciones.id = "acciones";
            celdaAcciones.innerHTML = `
            <button type="button" class="btn-editar modificar"><i class="fa-regular fa-pen-to-square"></i></button>
            <button type="button" class="btn-eliminar eliminar"><i class="fa-solid fa-trash"></i></button>
            `;

        });
    })


const tabla = document.getElementById("tabla-bodega");

tabla.addEventListener("click", e =>{
    if (e.target.classList.contains('eliminar')){
        const fila = e.target.closest("tr");

        const id = fila.querySelector("td").textContent.trim();

        const confirmar = confirm(`¿Esta seguro que desea eliminar la bodega`);
        if(confirmar){
        eliminarFila(id, fila);
        } else {
            alert('No se elimino la bodega');
        }


    }
});

function eliminarFila(id, fila){
    fetch('/Proyecto-2/php/BodegaEliminar.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'id=' + encodeURIComponent(id)
    })
    .then(res => res.text())
    .then(respuesta => {
        if (respuesta === 'ok'){
            fila.remove();
        } else {
            alert('No se pudo eliminar la bodega');
        }
    })
    .catch(err => console.error('Error: ', err));;
}

const form = document.getElementById("Form-bodega");
const labelId = document.getElementById("labelId");
const inputId = document.getElementById("bodegaId");
const botonGuardar = document.getElementById("botonCrear");
const TituloForm = document.getElementsByClassName("tituloForm")[0];

tabla.addEventListener("click", function(e){
    if(e.target.closest(".modificar")){
    const filaSelect = e.target.closest("tr");
    const celdas = filaSelect.querySelectorAll("td");
    const id = celdas[0].textContent.trim();
    const nombre = celdas[1].textContent.trim();
    const descripcion = celdas[2].textContent.trim();
    if(form){
    modal.style.display = "flex";
    modal.offsetHeight;
    modal.classList.add("active");
    filtro.style.display = "block";
    labelId.style.display = "block";
    inputId.readOnly = true;
    filtro.style.display = "block";   
    inputId.value = id;
    inputId.style.display = "block";
    inputNom.value = nombre;
    inputdesc.textContent = descripcion;
    botonGuardar.textContent = "Guardar Cambios";
    TituloForm.textContent = "Modificar Bodega";
    form.action = "/Proyecto-2/php/BodegaModificar.php";
    } else {
        alert("No se encontro formulario");
    }
    }
});


const modal = document.getElementById("modalBodega");
const btnCrear = document.getElementById("btnCrear");
const cancelar = document.getElementById("cancelar");
const filtro = document.getElementById("Filtro");

btnCrear.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.offsetHeight;
    modal.classList.add("active");
    filtro.style.display = "block";
    form.action = "/Proyecto-2/php/Bodega.php";
    labelId.style.display = "none";
    inputId.style.display = "none";
    inputNom.value = "";
    inputdesc.textContent = "";
});

cancelar.addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
        modal.style.display = "none";
        filtro.style.display = "none";
    }, 300);
});

window.addEventListener("click", (e) => {
if (e.target === modal) modal.style.display = "none", filtro.style.display = "none";
});

const botonCrear = document.getElementById("botonCrear");
const inputNom = document.getElementById("nombre");
const inputdesc = document.getElementById("descripcion");
botonCrear.addEventListener("click", () =>{
if(inputNom.value === "" && inputdesc.value === ""){
alert("Ingrese valores en ambos campos");
}else if(inputNom.value === ""){
alert("Ingrese valor en campo nombre");
} else if(inputdesc.value === ""){
alert("Ingrese valor en campo descripcion");
}
});
});

