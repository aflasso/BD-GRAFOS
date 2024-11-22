const {instance} = require('../db')

const DeportistaFutbol = instance.model('Deportista', {

    jugador_id: {
        primary: true,
        type: 'uuid',
        primary: true,
        required: true
    },

    nombre: {
        type: 'string',
        required: true,
        unique: true
    },
    deporte_asignado: {
        type: 'string',
        default: 'futbol',
        required: false
    },

    sexo: {
        type: 'string',
        valid: ['Hombre', 'Mujer', 'Otro']
    },
    posicion: {
        type: 'string',
        valid: ['Delantero', 'Defensa', 'Mediocampista', 'Portero']
    },
    goles: {
        type: 'int',
        default: 0
    },
    asistencias: {
        type: 'int',
        default: 0
    },
    juega_en: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'JUEGA_EN',
        direction: 'out',
        eager: true
    },
    equipo: {
        type: 'node',
        target: 'Equipo',
        relationship: 'JUEGA_EN',
        direction: 'out',
        eager: true
    },
    es_de: {
        type: 'relationship',
        target: 'Pais',
        relationship: 'ES_DE',
        direction: 'out',
        eager: true
    },
    pais: {
        type: 'node',
        target: 'Pais',
        relationship: 'ES_DE',
        direction: 'out',
        eager: true
    }
})

const DeportistaNFL = instance.model('Deportista', {

    jugador_id: {
        primary: true,
        type: 'uuid',
        required: true
    },

    deporte_asignado: {
        type: 'string',
        default: 'nfl',
        required: false
    },

    nombre: {
        type: 'string',
        required: true
    },    
    sexo: {
        type: 'string',
        valid: ['Hombre', 'Mujer', 'Otro']
    },
    posicion: {
        type: 'string',
        required: true,
        valid: ['Quarterback', 'Wide Receiver', 'Running Back', 'Tight End', 'Kicker']
    },
    touchdowns: {
        type: 'int',
        default: 0 // Valor predeterminado
    },
    yardas: {
        type: 'int',
        default: 0 // Valor predeterminado
    },
    juega_en: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'JUEGA_EN',
        direction: 'out',
        eager: true
    },
    equipo: {
        type: 'node',
        target: 'Equipo',
        relationship: 'JUEGA_EN',
        direction: 'out',
        eager: true
    },
    es_de: {
        type: 'relationship',
        target: 'Pais',
        relationship: 'ES_DE',
        direction: 'out',
        eager: true
    },
    pais: {
        type: 'node',
        target: 'Pais',
        relationship: 'ES_DE',
        direction: 'out',
        eager: true
    }

})

module.exports = {DeportistaFutbol, DeportistaNFL}