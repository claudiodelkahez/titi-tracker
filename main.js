import { calcularDistanciaEntreDosCoordenadas } from "./distancia.js"

const mostrarDistanciaEnTazas = (distanciaEnKilometros) => {
    const tamanioTazaFlatWhiteCm = 8.7 // Diámetro de la taza de flat white en centímetros
    const distanciaEnCm = distanciaEnKilometros * 100000 // Convertir a centímetros
    const distanciaEnTazas = distanciaEnCm / tamanioTazaFlatWhiteCm

    // Calcular tiempo estimado a pie (velocidad promedio de caminata: 5 km/h)
    const velocidadCaminataKmPorMinuto = 5 / 60 // Convertir a km por minuto
    const tiempoEnMinutos = distanciaEnKilometros / velocidadCaminataKmPorMinuto

    let tiempoTexto
    if (tiempoEnMinutos >= 60) {
        const tiempoEnHoras = tiempoEnMinutos / 60
        tiempoTexto = `${tiempoEnHoras.toFixed(1)} horas`
    } else {
        tiempoTexto = `${tiempoEnMinutos.toFixed(0)} minutos`
    }

    let distanciaTexto
    if (distanciaEnKilometros < 1) {
        const distanciaEnMetros = distanciaEnKilometros * 1000 // Convertir a metros
        distanciaTexto = `${distanciaEnMetros.toFixed(0)} metros`
    } else {
        distanciaTexto = `${distanciaEnKilometros.toFixed(2)} km`
    }

    const elementoDistancia = document.getElementById("distancia")
    elementoDistancia.innerHTML = `
      Estas a ${distanciaTexto} de Azul Café <br> A ${distanciaEnTazas.toFixed(
        0
    )} flat whites de distancia 🤯<br>
      Tiempo estimado a pata: ${tiempoTexto} 🏃🏻‍♀️
  `
}

const errorHandler = (error) => {
    const elementoDistancia = document.getElementById("distancia")
    switch (error.code) {
        case error.PERMISSION_DENIED:
            elementoDistancia.innerText =
                "El usuario negó el permiso para la Geolocalización."
            break
        case error.POSITION_UNAVAILABLE:
            elementoDistancia.innerText =
                "La información de ubicación no está disponible."
            break
        case error.TIMEOUT:
            elementoDistancia.innerText =
                "La solicitud para obtener la ubicación del usuario ha caducado."
            break
        case error.UNKNOWN_ERROR:
            elementoDistancia.innerText =
                "Se ha producido un error desconocido."
            break
    }
}

const calcularDistancia = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const coordenadasUsuario = {
                latitud: position.coords.latitude,
                longitud: position.coords.longitude,

                //latitud: -34.561515079084124,
                //longitud: -58.44703473758631
            }
            const azulCafe = {
                latitud: -34.583004,
                longitud: -58.429852,
            }
            const distanciaEnKilometros = calcularDistanciaEntreDosCoordenadas(
                coordenadasUsuario.latitud,
                coordenadasUsuario.longitud,
                azulCafe.latitud,
                azulCafe.longitud
            )
            mostrarDistanciaEnTazas(distanciaEnKilometros)
        }, errorHandler)
    } else {
        document.getElementById("distancia").innerText =
            "La geolocalización no es soportada por este navegador."
    }
}

const botonDistancia = document.getElementById("boton-distancia")
botonDistancia.addEventListener("click", () => {
    calcularDistancia()
    document.getElementById("distancia").style.display = "block" // Mostrar el elemento distancia al calcular
})

// Importar el objeto horariosTrabajo desde el archivo horarios.js
import { horariosTrabajo } from "./horarios.js"

const botonCerrarModal = document.getElementById("boton-cerrar")
const botonCerrarModalPedro = document.getElementById("boton-cerrar-pedro")

const iframePedro = document.getElementById("video-pedro")

// Obtener los botones para mostrar el modal pedro
const pedroButton = document.getElementById("pedro")
pedroButton.addEventListener("click", () => {
    document.querySelector(".popup-pedro").style.display = "flex"
    document.querySelector(".popup-pedro").style.opacity = "1"
    document.querySelector(".popup-pedro").style.pointerEvents = "all"
    document.getElementById("video-pedro").src =
        "https://www.youtube.com/embed/3SinWd80yFY?si=7dtt2XMG3t72faSi&autoplay=1&mute=0"
})

// Función para cerrar el modal
botonCerrarModal.addEventListener("click", () => {
    document.querySelector(".popup").style.display = "none"
    document.querySelector(".popup").style.opacity = "0"
})
// Función para cerrar el modal pedropedro
botonCerrarModalPedro.addEventListener("click", () => {
    document.querySelector(".popup-pedro").style.display = "none"
    document.querySelector(".popup-pedro").style.opacity = "0"
    document.getElementById("video-pedro").src =
        "https://www.youtube.com/embed/3SinWd80yFY?si=7dtt2XMG3t72faSi"
})

// Función para mostrar el modal
function mostrarModal() {
    setTimeout(() => {
        document.querySelector(".popup").style.display = "flex"
        document.querySelector(".popup").style.opacity = "1"
        document.querySelector(".popup").style.pointerEvents = "all"
        document.querySelector(".popup").style.transition =
            "opacity 0.5s ease-in-out"
    }, 1000)
}
// Variable para controlar el cambio de horario
let cambioDeHorario = false

// Controlar el cambio de horario
if (cambioDeHorario == true) {
    mostrarModal()
}
// Obtener el día de la semana actual
const hoy = new Date()
const diaSemanaActual = hoy.getDay() // Domingo es 0, Lunes es 1, ..., Sábado es 6
const mesActual = hoy.getMonth() + 1 // Los meses en JavaScript van de 0 a 11
const diaActual = hoy.getDate()

// Array con los nombres de los días de la semana
const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
]

// Acceder al horario para el día actual
const mesActualNombre = Object.keys(horariosTrabajo)[mesActual - 1]
let horarioDelDia

if (mesActualNombre && horariosTrabajo[mesActualNombre]) {
    horarioDelDia = horariosTrabajo[mesActualNombre][diaActual]

    if (horarioDelDia) {
        if (horarioDelDia.trabajo) {
            document.getElementById(
                "titi-trabaja-hoy"
            ).textContent = `Titi trabaja turno ${horarioDelDia.turno}.`
        } else {
            document.getElementById(
                "titi-trabaja-hoy"
            ).textContent = `Hoy titi no trabaja.🥳`
            partyHard()
        }
    } else {
        console.log(
            `No se encontró información del horario para el día ${diaActual} de ${mesActualNombre}.`
        )
    }
} else {
    console.log("No se encontró información del horario para el mes actual.")
}

document.getElementById(
    "diaActual"
).textContent = `Hoy es ${diasSemana[diaSemanaActual]}, ${diaActual} de ${mesActualNombre}.`

// Función para generar el mensaje de los próximos días
function generarMensajeProximosDias() {
    let mensaje = "" // Inicializamos el mensaje vacío
    const hoy = new Date() // Obtenemos la fecha de hoy
    const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ] // Array con los nombres de los días de la semana

    for (let i = 1; i <= 7; i++) {
        const fecha = new Date(hoy.getTime())
        fecha.setDate(fecha.getDate() + i) // Ajustar para que los días comiencen desde mañana

        const numeroDia = fecha.getDate() // Obtener el número del día
        const diaSemana = fecha.getDay() // Obtener el día de la semana para los próximos 7 días
        const mes = fecha.getMonth() + 1 // Los meses en JavaScript van de 0 a 11
        const mesNombre = Object.keys(horariosTrabajo)[mes - 1] // Obtener el nombre del mes
        const horario =
            horariosTrabajo[mesNombre] && horariosTrabajo[mesNombre][numeroDia]
                ? horariosTrabajo[mesNombre][numeroDia]
                : null
        const dia = diasSemana[diaSemana] // Obtener el nombre del día de la semana
        const fechaFormato = `${
            dia.charAt(0).toUpperCase() + dia.slice(1)
        } ${numeroDia}` // Formato deseado: "Lunes, 27"

        if (horario && horario.trabajo) {
            mensaje += `<p>${fechaFormato}: Trabaja a la ${horario.turno}.☕️</p>`
        } else {
            mensaje += `<p>${fechaFormato}: No trabaja! 🥳🥳🥳</p>`
        }
    }
    return mensaje
}

const proximosDiasElemento = document.getElementById("proximos-dias")

// Mostrar mensaje de los próximos días
proximosDiasElemento.innerHTML = generarMensajeProximosDias()

function partyHard() {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
    }

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 30,
            scalar: 1.2,
            shapes: ["circle", "square"],
            colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        })

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
        })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
    setTimeout(shoot, 400)
    setTimeout(shoot, 800)
}
