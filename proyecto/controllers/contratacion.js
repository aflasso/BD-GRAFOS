const instance = require('../models/contratacion')
async function createContratacion(data) {
    try {
      const newContratacion = await instance.create('Contratacion', data);
      console.log('Contratación creada:', newContratacion.toJson());
      return newContratacion;
    } catch (err) {
      console.error('Error al crear la contratación:', err);
    }
  }

async function getContratacionById(id) {
    try {
      const contratacion = await instance.find('Contratacion', id);
      if (!contratacion) {
        console.log('Contratación no encontrada');
        return null;
      }
      console.log('Contratación encontrada:', contratacion.toJson());
      return contratacion.toJson();
    } catch (err) {
      console.error('Error al leer la contratación:', err);
    }
  }
  
  async function updateContratacion(id, data) {
    try {
      const contratacion = await instance.find('Contratacion', id);
      if (!contratacion) {
        console.log('Contratación no encontrada');
        return null;
      }
      await contratacion.update(data);
      console.log('Contratación actualizada:', contratacion.toJson());
      return contratacion.toJson();
    } catch (err) {
      console.error('Error al actualizar la contratación:', err);
    }
  }
  
  async function deleteContratacion(id) {
    try {
      const contratacion = await instance.find('Contratacion', id);
      if (!contratacion) {
        console.log('Contratación no encontrada');
        return null;
      }
      await contratacion.delete();
      console.log('Contratación eliminada');
    } catch (err) {
      console.error('Error al eliminar la contratación:', err);
    }
  }
  