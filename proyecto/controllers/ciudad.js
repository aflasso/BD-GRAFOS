const {response, request} =  require('express')
const {Ciudad} = require('../models/ciudad')
const {Pais} = require('../models/pais')

const getAllCiudades = async (req =request, res = response) => {

    try {
        
        const ciudades = await Ciudad.all()

        const ciudades_json = await Promise.all(ciudades.map( async (node) => {

            const node_json = await node.toJson()

            return node_json
        }))

        console.log(ciudades_json);
        return res.status(200).json({status: 'ok', data: ciudades_json})

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({status: 'error', data: error})

    }
}

const getAllCiudadesOfPais = async (req =request, res = response) => {

    try {

        const pais_id = req.params.pais_id

        const pais_seleccionado = await Pais.find(pais_id)

        if (!pais_seleccionado) {
            console.error('El pais no existe');
            return res.status(409).json({status: 'fail', data: 'El pais no existe'})
        }

        const pais_seleccionado_json = await pais_seleccionado.toJson()

        const ciudades = pais_seleccionado_json['ciudades'];
        
        return res.status(200).json({status: 'ok', data: ciudades})

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({status: 'error', data: error})

    }
}


const postCiudad = async (req = request, res = response) => {

    try {
        
        const {pais_id} = req.body

        const ciudad_body = req.body

        const pais_origen = await Pais.find(pais_id)

        if (!pais_origen) {

            console.error('El pais no existe');
            return res.status(409).json({status: 'fail', data: 'El pais no existe, debe ingresar el pais al que pertenece'})

        }

        const ciudad_nueva = await Ciudad.create(ciudad_body)

        const ciudad_nueva_json = await ciudad_nueva.toJson()

        ciudad_nueva.relateTo(pais_origen, 'ciudad_de')

        return res.status(200).json({status: 'ok', data: ciudad_nueva_json})

    } catch (error) {
        console.error(error);
        return res.status(500).json({status: 'error', data: error.toString()})
    }
}

const updateCiudad = async (req = request, res = response) => {


    try {
        const ciudad_id = req.params.id

        const {nombre, estado, poblacion} = req.body
        
        const ciudad_seleccionada = await Ciudad.find(ciudad_id)

        if (!ciudad_seleccionada) {

            console.error('La ciudad no existe');
            return res.status(400).json('La ciudad no existe')

        }

        const nueva_ciudad = await ciudad_seleccionada.update({nombre, estado, poblacion})

        const nueva_ciudad_json = await nueva_ciudad.toJson()

        console.log(nueva_ciudad_json);
        return res.status(200).json({status: 'ok', data: nueva_ciudad_json})


    } catch (error) {
        console.error(error);
        return res.status(500).json({status: 'error', data: error.toString()})
    }
}

const deleteCiudad = async (req = request, res = response) => {

    try {
        
        const ciudad_id = req.params.id
        
        const ciudad_seleccionada = await Ciudad.find(ciudad_id)

        if (!ciudad_seleccionada) {

            console.error('La ciudad no existe');
            return res.status(400).json('La ciudad no existe')

        }

        const deleted_ciudad = await ciudad_seleccionada.delete()

        const deleted_ciudad_json = await deleted_ciudad.toJson()

        console.log(deleted_ciudad_json);
        return res.status(200).json({status: 'ok', data: deleted_ciudad_json})

    } catch (error) {
        console.error(error);
        return res.status(500).json({status: 'error', data: error.toString()})
    }
}

module.exports = {getAllCiudades, getAllCiudadesOfPais,postCiudad, updateCiudad, deleteCiudad}