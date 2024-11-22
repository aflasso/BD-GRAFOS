const {DeportistaNFL} = require('../../models/jugador')
const {response, request} = require('express')

const getAll = async (req = request, res = response) => {

    try {
        const deportista = await DeportistaNFL.all({deporte_asignado: 'nfl'})
        
        deportista.forEach(element => {
            console.log(element.get('nombre'));
            
        })

        res.render('index', { title: `NFL EQUIPOS GET ${deportista}` });
    } catch (error) {
        console.error(error);
        
    }
    
}

const post = async (req, res, next) => {

    console.log('entre al post')
    const deportista = req.body

    try {
        
        const jugadorNuevo = await DeportistaNFL.create(deportista)

    } catch (error) {
        console.error(error);
        
    }
    res.render('index', { title: `NFL EQUIPOS POST ${deportista}` });
}

module.exports = {getAll, post}