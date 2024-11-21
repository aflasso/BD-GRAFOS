const expres = require('express');
const router = expres.Router()

router.get('/', function(req, res, next) {
    res.render('index', { title: 'NFL' });
});

module.exports = router