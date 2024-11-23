const {instance} = require('../db')
const {v4: uuidv4} = require('uuid')

const Contratacion = instance.model('Contratacion', {

    contratacion_id: {
        primary: true,
        type: 'uuid',
        primary: true,
        required: false,
        default: () => uuidv4()
    },

    fecha_inicio: {
        type: 'date',
        required: true
    },
    fecha_finalizacion: {
        type: 'date',
        required: true
    },
    valor: {
        type: 'int',
        required: true
    },
    pertenece_a_deportista: {
        type: 'relationship',
        target: 'Deportista',
        relationship: 'PERTENECE_A',
        direction: 'out',
        eager: true
    },
    pertenece_a_equipo: {
        type: 'relationship',
        target: 'Equipo',
        relationship: 'PERTENECE_A',
        direction: 'out',
        eager: true
    },
    deportista: {
        type: 'node',
        target: 'Deportista',
        relationship: 'PERTENECE_A',
        direction: 'out',
        eager: true
    },
    equipo: {
        type: 'node',
        target: 'Equipo',
        relationship: 'PERTENECE_A',
        direction: 'out',
        eager: true
    },
    

})