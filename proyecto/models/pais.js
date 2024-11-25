const {instance} = require('../db')
const {v4: uuidv4} = require('uuid')


const Pais = instance.model('Pais', {

    pais_id: {
        primary: true,
        type: 'uuid',
        required: false,
        unique: true,
        default: () => uuidv4()
    },

    nombre: {
        type: 'string',
        required: true,
        unique: true
    },
    lugar_de_nacimiento_de: {
        type: 'relationship',
        target: 'Deportista',
        relationship: 'LUGAR_DE_NACIMEINTO_DE',
        direction: 'out',
        properties: {
            ciudad_de_nacimiento: {type: 'string', required:true},
            fecha_de_nacimiento: {type: 'date', required: true}
        },
        eager: true
    },
    lugar_de_origen_de: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'LUGAR_DE_ORIGEN_DE',
        direction: 'out',
        eager: true,
    },
    pais_de: {

        type: 'relationship',
        target: 'Ciudad',
        relationship: 'PAIS_DE',
        direction: 'out',
        eager: true

    },
    jugadores: {
        type: 'nodes',
        target: 'Deportista',
        relationship: 'LUGAR_DE_NACIMEINTO_DE',
        direction: 'out',
        eager: true
    },
    equipos: {

        type: 'nodes',
        target: 'Equipo',
        relationship: 'LUGAR_DE_ORIGEN_DE',
        direction: 'out',
        eager: true

    },
    ciudades: {

        type: 'nodes',
        target: 'Ciudades',
        relationship: 'PAIS_DE',
        direction: 'out',
        eager: true

    }

})

module.exports = {Pais}