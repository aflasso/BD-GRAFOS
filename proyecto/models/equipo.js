const {instance} =  require('../db')
const {v4: uuidv4} = require('uuid')

const EquipoFutbol = instance.model('Equipo', {

    equipo_id: {
        primary: true,
        type: 'uuid',
        required: false,
        unique: true,
        default: () => uuidv4()
    },
    nombre: {
        type: 'string',
        required: true // El nombre es obligatorio
    },
    fundacion: {
        type: 'int',
        required: false // Año de fundación del equipo
    },
    estadio: {
        type: 'string',
        required: false // Nombre del estadio del equipo
    },
    liga: {
        type: 'string',
        required: true // Liga a la que pertenece el equipo (ejemplo: "La Liga", "Premier League")
    },
    ficha_a: {
        type: "relationship",
        target: 'Deportista',
        relationship: 'FICHA_A',
        direction: 'out',
        eager: true

    },
    asignado_a: {

        type: 'relationship',
        target: 'Pais',
        relationship: 'ASIGNADO_A',
        direction: 'out',
        eager: true

    },
    practica: {

        type: 'relationship',
        target: 'Deporte',
        relationship: 'PRACTICA',
        direction: 'out',
        eager: true

    },
    jugadores: {
        type: 'nodes',
        target: 'Deportista',
        relationship: 'FICHA_A',
        direction: 'out',
        eager: true
    },
    pais: {
        type: 'node',
        target: 'Pais',
        relationship: 'ASIGNADO_A',
        direction: 'out',
        eager: true
    },
    deporte: {
        type: 'node',
        target: 'Deporte',
        relationship: 'PRACTICA',
        direction: 'out',
        eager: true
    }
})

const EquipoNFL = instance.model('Equipo', {

    equipo_id: {
        type: 'uuid',
        primary: true,
        required: false,
        unique: true,
        default: () => uuidv4()
    },
    nombre: {
        type: 'string',
        required: true
    },
    fundacion: {
        type: 'int',
        required: false
    },
    estadio: {
        type: 'string',
        required: false  // Nombre del estadio donde juega el equipo (opcional)
    },
    division: {
        type: 'string',
        required: true  // División a la que pertenece el equipo (ejemplo: AFC East, NFC West)
    },
    ficha_a: {
        type: "relationship",
        target: 'Deportista',
        relationship: 'FICHA_A',
        direction: 'out',
        eager: true

    },
    asignado_a: {

        type: 'relationship',
        target: 'Ciudad',
        relationship: 'ASIGNADO_A',
        direction: 'out',
        eager: true

    },
    practica: {

        type: 'relationship',
        target: 'Deporte',
        relationship: 'PRACTICA',
        direction: 'out',
        eager: true

    },
    jugadores: {
        type: 'nodes',
        target: 'Deportista',
        relationship: 'FICHA_A',
        direction: 'out',
        eager: true
    },
    ciudad: {

        type: 'node',
        target: 'Ciudad',
        relationship: 'ASIGNADO_A',
        direction: 'out',
        eager: true

    },
    deporte: {
        type: 'node',
        target: 'Deporte',
        relationship: 'PRACTICA',
        direction: 'out',
        eager: true
    }
})


module.exports = {EquipoFutbol, EquipoNFL}