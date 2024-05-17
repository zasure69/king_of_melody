const express = require('express');
const router = express.Router();

const playmultiController = require('../app/controller/playmultiController');

router.get('/:roomid/:round', playmultiController.index);

module.exports = router;