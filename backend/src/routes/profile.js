const express = require('express');
const router = express.Router();

const profileController = require('../app/controller/profileController');

router.get('/', profileController.index);

module.exports = router;