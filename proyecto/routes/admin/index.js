const express = require('express')

const router = express.Router()

const futbolRoutes = require('./futbol')
const nflRoutes = require('./nfl')

router.use('/futbol', futbolRoutes)
router.use('/nfl', nflRoutes)

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Admin' });
  });

module.exports = router