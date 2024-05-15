const express = require('express');
const router = express.Router();

const homeController = require('../app/controller/homeController');


router.post('/logout', homeController.del);
router.get('/', homeController.index);
router.put('/', homeController.update);

module.exports = router;