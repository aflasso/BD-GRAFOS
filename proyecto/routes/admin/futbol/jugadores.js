const expres = require('express');
const router = expres.Router()

const {deportistaFutbol} = require('../../../models/jugador')

router.get('/',async function(req, res, next) {

    res.render('index', { title: 'Futbol Jugadores' });
    
});

module.exports = router