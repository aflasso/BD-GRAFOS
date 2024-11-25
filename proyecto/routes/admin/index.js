const express = require('express')

const router = express.Router()

const futbolRoutes = require('./futbol')
const nflRoutes = require('./nfl')
const paisRouter = require('./pais')
const ciudadRouter = require('./ciudad')
const contratacionRouter = require('./contratacion')

router.use('/futbol', futbolRoutes)
router.use('/nfl', nflRoutes)
router.use('/pais', paisRouter)
router.use('/ciudad', ciudadRouter)
router.use('/contratacion', contratacionRouter)

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Admin' });
  });

module.exports = router