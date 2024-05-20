const express = require('express');
const router = express.Router();

const profileController = require('../app/controller/profileController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/:userId', profileController.index);
router.post('/:userId', upload.single('audioFile'), profileController.update);

module.exports = router;
