const expres = require('express')

const router = expres.Router()

const {getAllCiudades, getAllCiudadesOfPais,postCiudad, updateCiudad, deleteCiudad} = require('../../../controllers/ciudad')

router.get('/', getAllCiudades)
router.get('/:pais_id', getAllCiudadesOfPais)
router.post('/', postCiudad)
router.put('/:id', updateCiudad)
router.delete('/:id', deleteCiudad)

module.exports = router