const { int } = require('neo4j-driver')
const {instance} = require('../db')

const Deporte = instance.model('Deporte', {

    deporte_id: {
        primary: true,
        type: 'uuid',
        primary: true,
        required: true
    },

    nombre: {
        type: 'string',
        required: true
    },
    descripcion: {
        type: 'string',
        required: false
    },
    duracion_partido_minutos: {
        type: 'string',
        required: true
    },
    numero_jugadores: {

        type: 'int',
        required: true

    },
    pais_origen: {
        type: 'string',
        required: false,
    },
    rankink_popularidad: {
        type: 'int',
        required: false
    },
    razon_de: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'RAZON_DE',
        direction: 'out',
        eager: true
    },
    equipos: {

        type: 'nodes',
        target: 'Equipo',
        relationship: 'RAZON_DE',
        direction: 'out',
        eager: true

    }
})