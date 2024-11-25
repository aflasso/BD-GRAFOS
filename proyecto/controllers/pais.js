const {response, request} =  require('express')
const {Pais} = require('../models/pais')

const getAllPaises = async (req =request, res = response) => {

    try {
        
        const paises = await Pais.all()

        const paises_json = await Promise.all(paises.map( async (node) => {

            const node_json = await node.toJson()

            return node_json
        }))

        console.log(paises_json);
        return res.status(200).json({status: 'ok', data: paises_json})

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({status: 'error', data: error})

    }

}

const postPais = async (req = request, res = response) => {

    try {
        
        const pais_body = req.body

        const pais_nuevo = await Pais.create(pais_body)

        const pais_nuevo_json = await pais_nuevo.toJson()

        console.log(pais_nuevo_json);
        return res.status(200).json({status: 'ok', data: pais_nuevo_json})

    } catch (error) {
        console.error(error);
        return res.status(500).json({status: 'error', data: error.toString()})
    }

}

const updatePais = async (req = request, res = response) => {


    try {
        const pais_id = req.params.id

        const {nombre} = req.body
        
        const pais_seleccionado = await Pais.find(pais_id)

        if (!pais_seleccionado) {

            console.error('El pais no existe');
            return res.status(409).json({status: 'fail', data: 'El pais no existe'})

        }

        const nuevo_pais = await pais_seleccionado.update({nombre})

        const nuevo_pais_json = await nuevo_pais.toJson()

        console.log(nuevo_pais_json);
        return res.status(200).json({status: 'ok', data: nuevo_pais_json})

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({status: 'error', data: error.toString()})
    }
}

const deletePais = async (req = request, res = response) => {

    
    try {
        
        const pais_id = req.params.id
        
        const pais_seleccionado = await Pais.find(pais_id)

        if (!pais_seleccionado) {

            console.error('El pais no existe');
            return res.status(409).json({status: 'fail', data: 'El pais no existe'})

        }

        const delete_pais = await pais_seleccionado.delete()

        const delete_pais_json = await delete_pais.toJson()

        console.log(delete_pais_json);
        return res.status(200).json({status: 'ok', data: delete_pais_json})

    } catch (error) {
        console.error(error);
        return res.status(500).json({status: 'error', data: error.toString()})
    }
}

module.exports = {getAllPaises, postPais, updatePais, deletePais}