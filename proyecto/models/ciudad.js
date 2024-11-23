const {instance} = require('../db')
const {v4: uuidv4} = require('uuid')

const Contratacion = instance.model('Contratacion', {

    ciudad_id: {
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

    estado: {
        type: 'string',
        required: false
    },

    poblacion: {
        type: 'int',
        required: false
    },

    ciudad_de: {
        type: 'relationship',
        target: 'Pais',
        relationship: 'CIUDAD_DE',
        direction: 'out',
        eager: true
    },

    lugar_origen_de: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'LUGAR_ORIGEN_DE',
        direction: 'out',
        eager: true
    },

    pais: {
        type: 'node',
        target: 'Pais',
        relationship: 'CIUDAD_DE',
        direction: 'out',
        eager: true
    },

    equipo: {
        type: 'nodes',
        target: 'Equipo',
        relationship: 'LUGAR_ORIGEN_DE',
        direction: 'out',
        eager: true
    }
    
})