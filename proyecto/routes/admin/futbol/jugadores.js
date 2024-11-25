const expres = require('express');
const router = expres.Router()

const {getAll, post, put, delete_node} = require('../../../controllers/futbol/jugadores')

router.get('/', getAll);
router.post('/', post)
router.put('/:id', put)
router.delete('/:id', delete_node)

module.exports = router