const express = require('express');
const router = express.Router();

const settingController = require('../app/controller/settingController');

router.get('/:userId', settingController.index);

module.exports = router;