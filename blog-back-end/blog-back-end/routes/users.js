var express = require('express');
var router = express.Router();
const messageHandler = require('../config/db')
;

/* GET users listing. */
router.get('/',async function(req, res, next) {
  const data = await messageHandler();
  console.log(data.recordset);
  res.send(data.recordset);

});

module.exports = router;
