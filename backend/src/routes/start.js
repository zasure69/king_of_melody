const express = require('express');
const router = express.Router();

const startController = require('../app/controller/startController');

router.get('/', startController.index);

module.exports = router;