const express = require('express');
const router = express.Router();

const homeController = require('../app/controller/homeController');

router.get('/:userId', homeController.index);
router.put('/:userId', homeController.update);
router.post('/logout', homeController.del);

module.exports = router;
