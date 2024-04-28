const express = require('express');
const router = express.Router();

const loginController = require('../app/controller/loginController');

router.get('/', loginController.index);

module.exports = router;