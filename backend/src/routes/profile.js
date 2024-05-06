const express = require('express');
const router = express.Router();

const profileController = require('../app/controller/profileController');

router.get('/:userId', profileController.index);

module.exports = router;