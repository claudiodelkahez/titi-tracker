// Importar el objeto horariosTrabajo desde el archivo horarios.js
import { horariosTrabajo } from "./horarios.js";

const botonCerrarModal = document.getElementById("boton-cerrar");

// Función para cerrar el modal
botonCerrarModal.addEventListener("click", () => {
  document.querySelector(".popup").style.display = "none";
});

// Función para mostrar el modal
function mostrarModal() {
  setTimeout(() => {
    document.querySelector(".popup").style.display = "flex";
    document.querySelector(".popup").style.opacity = "1";
    document.querySelector(".popup").style.pointerEvents = "all";
    document.querySelector(".popup").style.transition =
      "opacity 0.5s ease-in-out";
  }, 1000);
}
// Variable para controlar el cambio de horario
let cambioDeHorario = false;

// Controlar el cambio de horario
if (cambioDeHorario == true) {
  mostrarModal();
}
// Obtener el día de la semana actual
const hoy = new Date();
const diaSemanaActual = hoy.getDay(); // Domingo es 0, Lunes es 1, ..., Sábado es 6
const mesActual = hoy.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
const diaActual = hoy.getDate();

// Array con los nombres de los días de la semana
const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

// Acceder al horario para el día actual
const mesActualNombre = Object.keys(horariosTrabajo)[mesActual - 1];
let horarioDelDia;

if (mesActualNombre && horariosTrabajo[mesActualNombre]) {
  horarioDelDia = horariosTrabajo[mesActualNombre][diaActual];

  if (horarioDelDia) {
    if (horarioDelDia.trabajo) {
      document.getElementById(
        "titi-trabaja-hoy"
      ).textContent = `Titi trabaja turno ${horarioDelDia.turno}.`;
    } else {
      document.getElementById(
        "titi-trabaja-hoy"
      ).textContent = `Hoy titi no trabaja.🥳`;
      partyHard();
    }
  } else {
    console.log(
      `No se encontró información del horario para el día ${diaActual} de ${mesActualNombre}.`
    );
  }
} else {
  console.log("No se encontró información del horario para el mes actual.");
}

document.getElementById(
  "diaActual"
).textContent = `Hoy es ${diasSemana[diaSemanaActual]}, ${diaActual} de ${mesActualNombre}.`;

// Función para generar el mensaje de los próximos días
function generarMensajeProximosDias() {
  let mensaje = ""; // Inicializamos el mensaje vacío
  const hoy = new Date(); // Obtenemos la fecha de hoy
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ]; // Array con los nombres de los días de la semana

  for (let i = 1; i <= 7; i++) {
    const fecha = new Date(hoy.getTime());
    fecha.setDate(fecha.getDate() + i); // Ajustar para que los días comiencen desde mañana

    const numeroDia = fecha.getDate(); // Obtener el número del día
    const diaSemana = fecha.getDay(); // Obtener el día de la semana para los próximos 7 días
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const mesNombre = Object.keys(horariosTrabajo)[mes - 1]; // Obtener el nombre del mes
    const horario =
      horariosTrabajo[mesNombre] && horariosTrabajo[mesNombre][numeroDia]
        ? horariosTrabajo[mesNombre][numeroDia]
        : null;
    const dia = diasSemana[diaSemana]; // Obtener el nombre del día de la semana
    const fechaFormato = `${
      dia.charAt(0).toUpperCase() + dia.slice(1)
    } ${numeroDia}`; // Formato deseado: "Lunes, 27"

    if (horario && horario.trabajo) {
      mensaje += `<p>${fechaFormato}: Trabaja a la ${horario.turno}.☕️</p>`;
    } else {
      mensaje += `<p>${fechaFormato}: No trabaja! 🥳🥳🥳</p>`;
    }
  }
  return mensaje;
}

const proximosDiasElemento = document.getElementById("proximos-dias");

// Mostrar mensaje de los próximos días
proximosDiasElemento.innerHTML = generarMensajeProximosDias();

function partyHard() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      shapes: ["circle", "square"],
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 2,
      shapes: ["emoji"],
      shapeOptions: {
        emoji: {
          value: ["☕️"],
        },
      },
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
  setTimeout(shoot, 400);
  setTimeout(shoot, 800);
}
