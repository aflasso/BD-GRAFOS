const {Contratacion} = require('../models/contratacion')
const {instance} = require('../db')
const {response, request} =  require('express')
const {DeportistaFutbol, DeportistaNFL} = require('../models/jugador')
const {EquipoFutbol, EquipoNFL} = require('../models/equipo')

const getContrataciones = async (req = request, res = response) => {

}

const get_contrataciones_by_equipo = async (req = request, res = response) => {
  
}

const get_contrataciones_by_jugador = async (req = request, res = response) => {
  
}

const post_contratacion = async (req = request, res = response) => {
  
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
  

  res.send('ok')

}

const update_contratacion = async (req = request, res = response) => {
  
}
const finish_contratacion = async (req = request, res = response) => {
  
}

module.exports = {getContrataciones, get_contrataciones_by_equipo, get_contrataciones_by_jugador, post_contratacion , update_contratacion, finish_contratacion}