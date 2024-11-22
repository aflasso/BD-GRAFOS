const {instance} = require('../db')

const Contratacion = instance.model('Contratacion', {

    contratacion_id: {
        primary: true,
        type: 'uuid',
        primary: true,
        required: true
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
    }

})