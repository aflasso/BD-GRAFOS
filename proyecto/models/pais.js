const {instance} = require('../db')

const Pais = instance.model('Pais', {

    pais_id: {
        primary: true,
        type: 'uuid',
        required: true,
        unique: true
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
        eager: true
    },
    lugar_de_orignen_de: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'LUGAR_DE_ORIGEN_DE',
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

    }

})