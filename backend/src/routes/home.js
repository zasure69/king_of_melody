const express = require('express');
const router = express.Router();

const homeController = require('../app/controller/homeController');


router.put('/:userId', homeController.update);
router.post('/logout', homeController.del);
router.post('/roomcreate/:roomID', homeController.create);
router.post('/search', homeController.searchroom);
router.post('/playnow', homeController.playnow);
router.get('/', homeController.index);

router.put('/', homeController.update);

module.exports = router;
