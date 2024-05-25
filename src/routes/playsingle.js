const express = require('express');
const router = express.Router();

const playsingleController = require('../app/controller/playsingleController');

router.get('/', playsingleController.index);

module.exports = router;