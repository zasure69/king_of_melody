const express = require('express');
const router = express.Router();
const path = require('path');

const profileController = require('../app/controller/profileController');
const fs = require('fs');
const multer = require('multer');

const tmpDir = path.join(__dirname, 'tmp');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}
fs.chmodSync(tmpDir, '755');
const upload = multer({ dest: '/src/uploads/' });

router.get('/', profileController.index);
router.post('/', upload.single('audioFile'), profileController.update);

module.exports = router;
