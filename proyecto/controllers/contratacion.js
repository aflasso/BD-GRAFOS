const {Contratacion} = require('../models/contratacion')
const {instance} = require('../db')
const {response, request} =  require('express')
const {DeportistaFutbol, DeportistaNFL} = require('../models/jugador')
const {EquipoFutbol, EquipoNFL} = require('../models/equipo')

const getContrataciones = async (req = request, res = response) => {

  try {
    
    const contrataciones = await Contratacion.all()

    const contrataciones_json = await contrataciones.toJson()
  
    console.log(contrataciones_json);

    res.status(200).json({status: 'ok', data: contrataciones_json})

  } catch (error) {
    console.error('Ocurrio un error inesperado:', error.toString());
    res.status(500).json({status: 'error', data: error.toString()})

  }

}

const get_contrataciones_by_equipo = async (req = request, res = response) => {
  
  try {

    const equipo_id = req.params.equipo_id

    const equipo = await instance.find('Equipo', equipo_id)

    if (!equipo) {
      console.error('El equipo no existe');
      return res.status(409).json({status: 'fail', data: 'El equipo no existe'})
    }

    const equipo_json = await equipo.toJson()

    const contrataciones_equipo = equipo_json['contratos']

    console.log(contrataciones_equipo);
  
    return res.status(200).json({status: 'ok', data: contrataciones_equipo})
    
  } catch (error) {
    
    console.error('Ocurrio un error inesperado:', error.toString());
    return res.status(500).json({status: 'error', data: error.toString()})
  }

}

const get_contrataciones_by_jugador = async (req = request, res = response) => {
  
  try {

    const jugador_id = req.params.jugador_id

    const jugador = await instance.find('Deportista', jugador_id)

    if (!jugador) {
      console.error('El equipo no existe');
      return res.status(409).json({status: 'fail', data: 'El equipo no existe'})
    }

    const jugador_json = await jugador.toJson()
    
    const contrataciones_jugador = jugador_json['contratos']

    console.log(contrataciones_jugador);
  
    return res.status(200).json({status: 'ok', data: contrataciones_jugador})
    
  } catch (error) {
    
    console.error('Ocurrio un error inesperado:', error.toString());
    return res.status(500).json({status: 'error', data: error.toString()})
  }
}

const post_contratacion = async (req = request, res = response) => {
  
  try {
    
    const {equipo_id} = req.body
    const {jugador_id} = req.body
    const {fecha_vinculacion} = req.body
    const {fecha_inicio, fecha_finalizacion, valor} = req.body
  
  
    const equipo_seleccionado = await instance.find('Equipo', equipo_id)
    const jugador_seleccionado = await instance.find('Deportista', jugador_id)
  
    if (!equipo_seleccionado || !jugador_seleccionado) {
  
      console.error('El jugador o equipo no existe');
      return res.status(400).json({status: 'fail', data: 'El jugador o equipo no existe'})
  
    }
  
    const equipo_seleccionado_json = await equipo_seleccionado.toJson()
    const jugador_seleccionado_json =  await jugador_seleccionado.toJson()
  
    if (jugador_seleccionado_json['equipo'] != undefined) {
      console.error('El jugador tiene un contrato activo');
      return res.status(400).json({status: 'fail', data: 'El jugador tiene un contrato activo'})
    }
    
    if (equipo_seleccionado_json['deporte']['nombre'] != jugador_seleccionado_json['deporte_asignado']) {
      
      console.error('El jugador no practica el deporte de ese equipo');
      return res.status(409).json({status: 'fail', data: 'El jugador no practica el deporte de ese equipo'})
  
    }
  
    const contratacion = await Contratacion.create({fecha_inicio, fecha_finalizacion, valor})
  
    const contratacion_json = await contratacion.toJson()
  
    const contratacion_id = contratacion_json['contratacion_id']
  
    console.log(jugador_seleccionado)
    console.log(equipo_seleccionado);
  
    await jugador_seleccionado.relateTo(equipo_seleccionado, 'juega_en', {contratacion_id: contratacion_id,fecha_vinculacion})
    await equipo_seleccionado.relateTo(jugador_seleccionado, 'ficha_a', {contratacion_id: contratacion_id,fecha_vinculacion})
  
    await contratacion.relateTo(jugador_seleccionado, 'pertenece_a_deportista')
    await jugador_seleccionado.relateTo(contratacion, 'sujeto_a_una')
  
    await contratacion.relateTo(equipo_seleccionado, 'pertenece_a_equipo')
    await equipo_seleccionado.relateTo(contratacion, 'genera_contrato')
    
  
    return res.status(200).json({status: 'ok', data: contratacion_json})

  } catch (error) {
    
    console.error('Ocurrio un error inesperado:', error.toString());
    return res.status(500).json({status: 'error', data: error.toString()})

  }


}

const update_contratacion = async (req = request, res = response) => {
  
  try {
    
    const contratacion_id = req.params.id
    const {fecha_inicio, fecha_finalizacion, valor} = req.body

    const contratacion = await Contratacion.find(contratacion_id)

    if (!contratacion) {

      console.error('La contratacion no existe');
      return res.status(409).json({status: 'fail', data: 'La contratacion no existe'})

    }

    const contratacion_nueva = await contratacion.update({fecha_inicio, fecha_finalizacion, valor})

    const contratacion_nueva_json = await contratacion_nueva.toJson()

    return res.status(200).json({status: 'ok', data: contratacion_nueva_json})

  } catch (error) {
    
    console.error('Ocurrio un error inesperado:', error.toString());
    return res.status(500).json({status: 'error', data: error.toString()})
  }
}
const finish_contratacion = async (req = request, res = response) => {
  
  
  const {equipo_id} = req.body
  const {jugador_id} = req.body

  const equipo_seleccionado = await instance.find('Equipo', equipo_id)
  const jugador_seleccionado = await instance.find('Deportista', jugador_id)

  if (!equipo_seleccionado || !jugador_seleccionado) {

    console.error('El jugador o equipo no existe');
    return res.status(400).json({status: 'fail', data: 'El jugador o equipo no existe'})

  }

  if (jugador_seleccionado.get('equipo').get('equipo_id') != equipo_seleccionado.get('equipo_id')) {

    console.error(`El jugador ${jugador_seleccionado.get('nombre')} no juega en ${equipo_seleccionado.get('nombre')}`);
    return res.status(409).json({status: 'fail', data: `El jugador ${jugador_seleccionado.get('nombre')} no juega en ${equipo_seleccionado.get('nombre')}`})

  }

  await jugador_seleccionado.detachFrom(equipo_seleccionado)
  await equipo_seleccionado.detachFrom(jugador_seleccionado)

  return res.send('ok')

}

module.exports = {getContrataciones, get_contrataciones_by_equipo, get_contrataciones_by_jugador, post_contratacion , update_contratacion, finish_contratacion}