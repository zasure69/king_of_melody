const express = require('express');
const router = express.Router();

const homeController = require('../app/controller/homeController');

router.get('/:userId', homeController.index);
router.post('/logout', homeController.del);
router.put('/', homeController.update);

module.exports = router;