const expres = require('express');
const router = expres.Router()

const routerEquipos = require('./equipos')
const routerJugadores = require('./jugadores')

router.use('/equipos', routerEquipos)
router.use('/jugadores', routerJugadores)

router.get('/', async function(req, res, next) {

    res.render('index', { title: 'NFL' });
});

module.exports = router