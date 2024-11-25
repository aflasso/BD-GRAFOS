const {EquipoFutbol} = require('../../models/equipo')
const {Deporte} = require('../../models/deporte')
const {response, request} = require('express')
const { Pais } = require('../../models/pais')

const getAll = async (req = request, res = response) => {

    try {
        const deporte = await Deporte.find('25f556a2-a438-4aaa-8120-c29638f58a2c')

        const equipos = deporte.get('equipos')

        const equipos_format = await Promise.all(equipos.map(async (node) => {

                const node_json = await node.toJson()
            
                return node_json

            })
        )

        console.log(equipos_format);

        return res.json({status: 'ok', data: equipos_format})

    } catch (error) {

        console.error(error);
        return res.json({status: 'error', data: error})
        
    }
    
}

const post = async (req = request, res = response, next) => {

    console.log('entre al post')

    const {pais_id} = req.body

    const {deporte_id} = req.body

    const equipo_body = req.body

    try {

        const deporte = await Deporte.find(deporte_id)

        if (!deporte) {

            return res.json({status: 'fail', data: 'Deporte no existe'})

        }
        
        const pais_origen = await Pais.find(pais_id)

        if (!pais_origen) {

            return res.json({status: 'fail', data: 'El pais no existe'})

        }

        const equipo_nuevo = await EquipoFutbol.create(equipo_body)

        equipo_nuevo.relateTo(pais_origen, 'asignado_a')
        pais_origen.relateTo(equipo_nuevo, 'lugar_de_origen_de')

        equipo_nuevo.relateTo(deporte, "practica")
        deporte.relateTo(equipo_nuevo, 'razon_de')

        const equipo_creado = await equipo_nuevo.toJson()

        return res.status(200).json({status: 'ok', data: equipo_creado})
        
    } catch (error) {

        console.error(error);
        return res.json({status: 'error', data: error})
    }
}

const put = async (req = request, res = response, next) => {

    try {
        const equipo_id = req.params.id

        const {nombre, fundacion, estadio, liga} = req.body

        const equipo_seleccionado = await EquipoFutbol.find(equipo_id)

        if (!equipo_seleccionado) {

            console.error('El equipo no existe')
            return res.status(400).json({status: 'fail', data: 'El equipo no existe'})
        }

        const nuevo_nodo = await equipo_seleccionado.update({nombre, fundacion, estadio, liga})

        const nuevo_nodo_json = await nuevo_nodo.toJson()

        return res.status(200).json({status: 'ok', data: nuevo_nodo_json})

    } catch(error) {

        console.error(error);
        return res.json({status: 'error', data: error})
    }
    

}

const delete_node = async (req = request, res = response, next) => {

    try {
        
        const equipo_id = req.params.id

        const equipo_seleccionado = await EquipoFutbol.find(equipo_id)

        if (!equipo_seleccionado) {

            console.error('El equipo no existe')
            return res.status(400).json({status: 'fail', data: 'El equipo no existe'})
        }

        const equipo_eliminado = await equipo_seleccionado.delete()

        const equipo_eliminado_json = await equipo_eliminado.toJson()

        return res.status(200).json({status: 'ok', data: equipo_eliminado_json})

    } catch (error) {
        
        console.error(error);
        return res.json({status: 'error', data: error})
    }
}

module.exports = {getAll, post, put, delete_node}