// PANEL DE MISIONES CON PILOTOS REALES

// Cargar pilotos desde localStorage (sección 2)
let listaPilotos = JSON.parse(localStorage.getItem("pilotos")) || [];

// Cargar misiones desde localStorage
let misiones = JSON.parse(localStorage.getItem("misiones")) || [];


const selectPiloto = document.getElementById("piloto");
const addBtn = document.getElementById("addBtn");
const filtroDificultad = document.getElementById("filtroDificultad");

const pendienteDiv = document.getElementById("pendiente");
const cursoDiv = document.getElementById("curso");
const completadaDiv = document.getElementById("completada");


// CARGAR PILOTOS ACTIVOS
function cargarPilotosActivos() {

    selectPiloto.innerHTML = '<option value="">Selecciona piloto</option>';

    for (let i = 0; i < listaPilotos.length; i++) {

        if (listaPilotos[i].estado === "Activo") {

            let option = document.createElement("option");
            option.value = listaPilotos[i].nombre;
            option.textContent = listaPilotos[i].nombre;

            selectPiloto.appendChild(option);
        }
    }
}


// GUARDAR MISIONES
function guardarMisiones() {
    localStorage.setItem("misiones", JSON.stringify(misiones));
}



// MOSTRAR MISIONES

function pintarMisiones() {

    pendienteDiv.innerHTML = "";
    cursoDiv.innerHTML = "";
    completadaDiv.innerHTML = "";

    let filtro = filtroDificultad.value;

    let contadorPendiente = 0;
    let contadorCurso = 0;
    let contadorCompletada = 0;

    for (let i = 0; i < misiones.length; i++) {

        let mision = misiones[i];

        // filtro dificultad
        if (filtro !== "todos" && mision.dificultad !== filtro) {
            continue;
        }

        let card = `
            <div class="card">
                <h3>${mision.nombre}</h3>
                <p>${mision.descripcion}</p>
                <p>Piloto: ${mision.piloto}</p>
                <p>Dificultad: ${mision.dificultad}</p>
                <p>Fecha: ${mision.fecha}</p>

                <button onclick="moverMision(${i})">➡️ Mover</button>
                <button onclick="eliminarMision(${i})">❌ Eliminar</button>
            </div>
        `;

        if (mision.estado === "pendiente") {
            pendienteDiv.innerHTML += card;
            contadorPendiente++;
        }

        else if (mision.estado === "curso") {
            cursoDiv.innerHTML += card;
            contadorCurso++;
        }

        else if (mision.estado === "completada") {
            completadaDiv.innerHTML += card;
            contadorCompletada++;
        }
    }

    document.getElementById("Pendiente").textContent = contadorPendiente;
    document.getElementById("Curso").textContent = contadorCurso;
    document.getElementById("Completada").textContent = contadorCompletada;

    guardarMisiones();
}


// AÑADIR MISIÓN
addBtn.addEventListener("click", function () {

    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let piloto = document.getElementById("piloto").value;
    let dificultad = document.getElementById("dificultad").value;

    if (nombre === "" || descripcion === "" || piloto === "") {
        alert("Completa todos los campos");
        return;
    }

    let nuevaMision = {
        nombre: nombre,
        descripcion: descripcion,
        piloto: piloto,
        dificultad: dificultad,
        fecha: new Date().toLocaleDateString(),
        estado: "pendiente"
    };

    misiones.push(nuevaMision);

    pintarMisiones();

    // limpiar formulario
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("piloto").value = "";
});


// MOVER MISIÓN
function moverMision(i) {

    if (misiones[i].estado === "pendiente") {
        misiones[i].estado = "curso";
    }

    else if (misiones[i].estado === "curso") {
        misiones[i].estado = "completada";
    }

    pintarMisiones();
}


// ELIMINAR MISIÓN
function eliminarMision(i) {

    let confirmar = confirm("¿Eliminar misión?");

    if (confirmar) {
        misiones.splice(i, 1);
        pintarMisiones();
    }
}


// FILTRO DIFICULTAD
filtroDificultad.addEventListener("change", pintarMisiones);


// INICIO
cargarPilotosActivos();
pintarMisiones();