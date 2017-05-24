'use strict';

require('/daemons/mqtt-brain');
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
  console.log('hola');
});

module.exports = router;
