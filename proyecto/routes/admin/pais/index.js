const expres = require('express')

const router = expres.Router()

const {getAllPaises, postPais, updatePais, deletePais} = require('../../../controllers/pais.js')

router.get('/', getAllPaises)
router.post('/', postPais)
router.put('/:id', updatePais)
router.delete('/:id', deletePais)

module.exports = router