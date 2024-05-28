
const settingRouter = require('./setting');
const homeRouter = require('./home');
const playmultiRouter = require('./playmulti');
const playsingleRouter = require('./playsingle');
const profileRouter = require('./profile');
const startRouter = require('./start');
const loginRouter = require('./login');
const verifyRouter = require('./verify');
const restPasswordRouter = require('./resetpassword');

function route(app) {


    app.use('/setting', settingRouter);
    
    app.use('/login', loginRouter);

    app.use('/profile', profileRouter);

    app.use('/', startRouter);

    app.use('/playmulti', playmultiRouter);

    app.use('/playsingle', playsingleRouter);

    app.use('/verify', verifyRouter);

    app.use('/resetpassword', restPasswordRouter);

    app.use('/home', homeRouter);
    
}

module.exports = route;