const express = require('express');
const router = express.Router();

const resetpasswordController = require('../app/controller/resetpasswordController');

router.post('/process', resetpasswordController.process);
router.post('/change/:userId/:resetString' , resetpasswordController.change);
router.get('/change/:userId/:resetString', resetpasswordController.changeView);
router.get('/', resetpasswordController.index);

module.exports = router;