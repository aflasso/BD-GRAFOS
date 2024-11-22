const expres = require('express');
const router = expres.Router()

const {DeportistaFutbol} = require('../../../models/jugador')
const {EquipoFutbol} = require('../../../models/equipo')

router.get('/',async function(req, res, next) {

    try {

        const equipo = await EquipoFutbol.create({
     // UUID único
            nombre: 'Silvestre FC',
            fundacion: 2000,
            estadio: 'Estadio Silvestre',
            liga: 'La Liga'
        });

        // const equipo_1 = await EquipoFutbol.first({nombre: 'Silvestre FC'})

        // equipo_1.get('jugadores').forEach(element => {
            
        //     console.log(element.get('nombre'));
            
        // });
        
        
        
    } catch (error) {
        console.error(error);
        
    }

    res.render('index', { title: 'Futbol Equipos' });
    
});

module.exports = router