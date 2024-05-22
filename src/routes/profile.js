const express = require('express');
const router = express.Router();
const path = require('path');

const profileController = require('../app/controller/profileController');

const multer = require('multer');


const upload = multer({ dest: 'uploads/' });

router.get('/', profileController.index);
router.post('/', upload.single('audioFile'), profileController.update);

module.exports = router;
