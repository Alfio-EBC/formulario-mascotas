// =====================================
// OBTENER ELEMENTOS DEL HTML
// =====================================

const formulario = document.getElementById("formmascotass");

const codigo = document.getElementById("codigo");
const nombreEmpresa = document.getElementById("nombreEmpresa");
const propietario = document.getElementById("propietario");
const raza = document.getElementById("raza");
const tipoUsuario = document.getElementById("tipoUsuario");
const edad = document.getElementById("edad");
const especie = document.getElementById("especie");
const alimentos = document.getElementById("alimentos");
const vacunas = document.getElementById("vacunas");
const observaciones = document.getElementById("observaciones");

const btnLimpiar = document.getElementById("btnLimpiar");

const listamascotass = document.getElementById("listamascotass");

const mensaje = document.getElementById("mensaje");

// =====================================
// CARGAR mascotasS DEL LOCAL STORAGE
// =====================================

let mascotass = JSON.parse(localStorage.getItem("mascotass")) || [];

// =====================================
// GUARDAR mascotas
// =====================================

formulario.addEventListener("submit", function (event) {
    // Evita que el formulario recargue la página
    event.preventDefault();

    // Crear objeto mascotas
    const mascotas = {
        codigo: codigo.value,
        nombre: nombreEmpresa.value,
        propietario: propietario.value,
        raza: raza.value,
        edad: edad.value,
        especie: especie.value,
        alimentos: alimentos.value,
        vacunas: vacunas.value,
        observaciones: observaciones.value,
    };

    // Agregar mascotas al array
    mascotass.push(mascotas);

    // Guardar array en localStorage
    localStorage.setItem("mascotass", JSON.stringify(mascotass));

    // Mostrar mensaje
    mostrarMensaje("Mascota guardado correctamente");

    // Limpiar formulario
    formulario.reset();

    // Mostrar mascotass
    mostrarmascotass();
});

function eliminarMascota(codigo) {

    const confirmar = confirm("¿Deseas eliminar esta mascota?");

    if (!confirmar) {
        return;
    }

    mascotass = mascotass.filter(function(mascota) {
        return mascota.codigo !== codigo;
    });

    localStorage.setItem("mascotass", JSON.stringify(mascotass));

    mostrarmascotass();

    mostrarMensaje("Mascota eliminada correctamente");
}
// =====================================
// MOSTRAR mascotasS
// =====================================

function mostrarmascotass() {
    // Limpiar contenido anterior
    listamascotass.innerHTML = "";

    // Recorrer mascotass
    mascotass.forEach(function (mascotas) {
        const tarjeta = document.createElement("div");

        tarjeta.classList.add("mascotas");

tarjeta.innerHTML = `
        <table>
        <tr>
            <th>Propietario</th>
            <td>${mascotas.propietario}</td>
        </tr>

        <tr>
            <th>Código</th>
            <td>${mascotas.codigo}</td>
        </tr>

        <tr>
            <th>Raza</th>
            <td>${mascotas.raza}</td>
        </tr>

        <tr>
            <th>Edad</th>
            <td>${mascotas.edad}</td>
        </tr>

        <tr>
            <th>Especie</th>
            <td>${mascotas.especie}</td>
        </tr>

        <tr>
            <th>Alimentos</th>
            <td>${mascotas.alimentos}</td>
        </tr>

        <tr>
            <th>Vacunas</th>
            <td>${mascotas.vacunas}</td>
        </tr>

        <tr>
            <th>Observaciones</th>
            <td>${mascotas.observaciones || "Sin observaciones"}</td>
        </tr>

        <tr>
            <th>Acciones</th>
            <td>
       <button onclick="eliminarMascota('${mascotas.codigo}')">
    Eliminar
</button>
            </td>
        </tr>
    </table>
`;

        listamascotass.appendChild(tarjeta);
    });
}

// =====================================
// MOSTRAR MENSAJE
// =====================================

function mostrarMensaje(texto) {
    mensaje.textContent = texto;

    mensaje.classList.add("exito");

    setTimeout(function () {
        mensaje.classList.remove("exito");
    }, 3000);
}

// =====================================
// LIMPIAR FORMULARIO
// =====================================

btnLimpiar.addEventListener("click", function () {
    formulario.reset();
});

// =====================================
// MOSTRAR DATOS AL CARGAR LA PÁGINA
// =====================================

mostrarmascotass();
