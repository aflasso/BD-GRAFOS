const {instance} = require('../db')
const {v4: uuidv4} = require('uuid')

const DeportistaFutbol = instance.model('Deportista', {

    jugador_id: {
        primary: true,
        type: 'uuid',
        primary: true,
        required: false,
        default: () => uuidv4()
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
        eager: true,
        properties: {
            contratacion_id: {type: 'string', required: true},
            fecha_vinculacion: {type: 'date', required: true}
        }

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
    },
    sujeto_a_una: {
        type: 'relationship',
        target: 'Contratacion',
        relationship: 'SUJETO_A_UNA',
        direction: 'out',
        eager: true
    },
    contratos: {
        type: 'nodes',
        target: 'Contratacion',
        relationship: 'SUJETO_A_UNA',
        direction: 'out',
        eager: true
    }
})

const DeportistaNFL = instance.model('Deportista', {

    jugador_id: {
        primary: true,
        type: 'uuid',
        required: false,
        default: () => uuidv4()
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
        valid: ['Hombre', 'Mujer', 'Otro'],
        required: true
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
    sujeto_a_una: {
        type: 'relationship',
        target: 'Contratacion',
        relationship: 'SUJETO_A_UNA',
        direction: 'out',
        eager: true
    },
    juega_en: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'JUEGA_EN',
        direction: 'out',
        eager: true,
        properties: {
            contratacion_id: {type: 'string', required: true},
            fecha_vinculacion: {type: 'date', required: true}
        }
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
    },
    contratos: {
        type: 'nodes',
        target: 'Contratacion',
        relationship: 'SUJETO_A_UNA',
        direction: 'out',
        eager: true
    }

})

module.exports = {DeportistaFutbol, DeportistaNFL}