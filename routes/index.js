var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('NNPTUD-C5 API is running');
});

module.exports = router;
