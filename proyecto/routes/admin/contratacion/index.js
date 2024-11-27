const expres = require('express')

const router = expres.Router()

const {getContrataciones, get_contrataciones_by_equipo, get_contrataciones_by_jugador, post_contratacion , update_contratacion, finish_contratacion} = require('../../../controllers/contratacion.js')

router.get('/', getContrataciones)
router.get('/equipo/:equipo_id', get_contrataciones_by_equipo)
router.get('/jugador/:jugador_id', get_contrataciones_by_jugador)
router.post('/', post_contratacion)
router.put('/:id', update_contratacion)
router.delete('/', finish_contratacion)

module.exports = router