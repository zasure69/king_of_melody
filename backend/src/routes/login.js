const express = require('express');
const router = express.Router();
const passport = require('passport')


const loginController = require('../app/controller/loginController');

router.post('/processSignin', loginController.processSignin);
router.post('/processSignUp', loginController.processSignup);
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/login' }), loginController.processGoogleSiginCallback);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/', loginController.index);


module.exports = router;