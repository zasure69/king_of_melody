const express = require('express');
const router = express.Router();

const verifyController = require('../app/controller/verifyController');

router.get('/:userId/:uniqueString', verifyController.index);

module.exports = router;