
const settingRouter = require('./setting');
const homeRouter = require('./home');
const playmultiRouter = require('./playmulti');
const playsingleRouter = require('./playsingle');
const profileRouter = require('./profile');
const startRouter = require('./start');
const loginRouter = require('./login');
const testRouter = require('./test');


function route(app) {
    app.use('/setting', settingRouter);
    
    app.use('/login', loginRouter);

    app.use('/profile', profileRouter);

    app.use('/start', startRouter);

    app.use('/playmulti', playmultiRouter);

    app.use('/playsingle', playsingleRouter);

    app.use('/test', testRouter);

    app.use('/', homeRouter);
    
}

module.exports = route;