const expres = require('express');
const router = expres.Router()

const {deportistaNFL} = require('../../../models/jugador')

router.get('/', async function(req, res, next) {

    try {
        const jugador = await deportistaNFL.create({

            nombre: 'Martin',
            posicion: 'Quarterback',

        })
        console.log('Jugador creado: ', jugador)

    } catch (error) {
        console.error('Error al crear ', error);
    }

    res.render('index', { title: 'NFL' });
});

module.exports = router