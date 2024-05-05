const express = require('express');
const router = express.Router();

const playmultiController = require('../app/controller/playmultiController');

router.get('/', playmultiController.index);


module.exports = router;