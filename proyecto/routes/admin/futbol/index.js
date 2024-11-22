const expres = require('express');
const router = expres.Router()

const {deportistaFutbol} = require('../../../models/jugador')

const routerEquipos = require('./equipos')
const routerJugadores = require('./jugadores')

router.use('/equipos', routerEquipos)
router.use('/jugadores', routerJugadores)

router.get('/',async function(req, res, next) {

    res.render('index', { title: 'Futbol' });
});

module.exports = router