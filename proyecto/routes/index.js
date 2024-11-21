var express = require('express');
var router = express.Router();

const driver = require('../db')

/* GET home page. */
router.get('/',async function(req, res, next) {

  const session = driver.session()

  try {
    
    const result = await session.run('MATCH (n) RETURN n LIMIT 10')

    result.records.forEach(record => {
      console.log(record)
    })

  } catch (error) {
    console.log(error)
  }finally {
    await session.close()
  }

  res.render('index', { title: 'Express' });

});

module.exports = router;
