import {
    calcularDistanciaEntreDosCoordenadas,
    gradosARadianes,
} from "./distancia.js"

// Coordenadas de Azul Café (fijas)
const AZUL_CAFE_LAT = -34.583004
const AZUL_CAFE_LON = -58.429852

// Función para simular la obtención de coordenadas del usuario
function simularCoordenadaUsuario(distanciaAproximadaEnMetros) {
    // Calculamos un desplazamiento aproximado en grados
    // 1 grado de latitud ≈ 111 km
    const desplazamientoLat =
        (Math.random() * 2 - 1) * (distanciaAproximadaEnMetros / 111000)
    const desplazamientoLon =
        (Math.random() * 2 - 1) *
        (distanciaAproximadaEnMetros /
            (111000 * Math.cos(gradosARadianes(AZUL_CAFE_LAT))))

    return {
        lat: AZUL_CAFE_LAT + desplazamientoLat,
        lon: AZUL_CAFE_LON + desplazamientoLon,
    }
}

function probarDistancia(distanciaAproximadaEnMetros) {
    const coordUsuario = simularCoordenadaUsuario(distanciaAproximadaEnMetros)

    console.log(
        `Prueba para distancia aproximada de ${distanciaAproximadaEnMetros} metros:`
    )
    console.log(`Coordenadas de Azul Café: ${AZUL_CAFE_LAT}, ${AZUL_CAFE_LON}`)
    console.log(
        `Coordenadas simuladas del usuario: ${coordUsuario.lat}, ${coordUsuario.lon}`
    )

    const distanciaCalculada = calcularDistanciaEntreDosCoordenadas(
        AZUL_CAFE_LAT,
        AZUL_CAFE_LON,
        coordUsuario.lat,
        coordUsuario.lon
    )

    console.log(`Distancia calculada: ${distanciaCalculada.toFixed(6)} km`)
    console.log(
        `Distancia calculada en metros: ${(distanciaCalculada * 1000).toFixed(
            2
        )} m`
    )
    console.log(
        `Diferencia con distancia esperada: ${Math.abs(
            distanciaCalculada * 1000 - distanciaAproximadaEnMetros
        ).toFixed(2)} m`
    )
    console.log("---")
}

// Probar con diferentes distancias
probarDistancia(0) // Mismo punto
probarDistancia(10) // Muy cerca
probarDistancia(100) // Cerca
probarDistancia(500) // Media distancia
probarDistancia(2000) // Lejos
