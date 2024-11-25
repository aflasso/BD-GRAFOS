const {DeportistaFutbol} = require('../../models/jugador')
const {response, request} = require('express')
const {Pais} = require('../../models/pais')

const getAll = async (req = request, res = response) => {

    try {
        const deportistas = await DeportistaFutbol.all({deporte_asignado: 'futbol'})

        const deportistas_format = await Promise.all(deportistas.map(async (node) => {

                const node_json = await node.toJson()
            
                return node_json

            })
        )

        console.log(deportistas_format);

        return res.json({status: 'ok', data: deportistas_format})

    } catch (error) {

        console.error(error);
        return res.json({status: 'error', data: error})
        
    }
    
}

const post = async (req = request, res = response, next) => {

    console.log('entre al post')

    const {pais_id} = req.body

    const {ciudad_de_nacimiento, fecha_de_nacimiento} = req.body

    const deportista_body = req.body

    try {
        
        const pais_origen = await Pais.find(pais_id)

        if (!pais_origen) {

            return res.json({status: 'fail', data: 'El pais no existe'})

        }

        const deportista_nuevo = await DeportistaFutbol.create(deportista_body)

        deportista_nuevo.relateTo(pais_origen, 'es_de')
        pais_origen.relateTo(deportista_nuevo, 'lugar_de_nacimiento_de', {ciudad_de_nacimiento, fecha_de_nacimiento})

        const deportista_nuevo_json = await deportista_nuevo.toJson()

        return res.status(200).json({status: 'ok', data: deportista_nuevo_json})
        
    } catch (error) {

        console.error(error);
        return res.json({status: 'error', data: error})
    }
}

const put = async (req = request, res = response, next) => {

    try {
        const deportista_id = req.params.id

        const {nombre, posicion, goles, asistencias} = req.body

        const deportista_seleccionado = await DeportistaFutbol.find(deportista_id)

        if (!deportista_seleccionado) {

            console.error('El deportista no existe')
            return res.status(400).json({status: 'fail', data: 'El deportista no existe'})
        }

        const nuevo_nodo = await deportista_seleccionado.update({nombre, posicion, goles, asistencias})

        const nuevo_nodo_json = await nuevo_nodo.toJson()

        return res.status(200).json({status: 'ok', data: nuevo_nodo_json})

    } catch(error) {

        console.error(error);
        return res.json({status: 'error', data: error})
    }
}

const delete_node = async (req = request, res = response, next) => {

    try {
        
        const deportista_id = req.params.id

        const deportista_seleccionado = await DeportistaFutbol.find(deportista_id)

        if (!deportista_seleccionado) {

            console.error('El deportista no existe')
            return res.status(400).json({status: 'fail', data: 'El deportista no existe'})
        }

        const deportista_eliminado = await deportista_seleccionado.delete()

        const deportista_eliminado_json = await deportista_eliminado.toJson()

        return res.status(200).json({status: 'ok', data: deportista_eliminado_json})

    } catch (error) {
        
        console.error(error);
        return res.json({status: 'error', data: error})
    }
}

module.exports = {getAll, post, put, delete_node}