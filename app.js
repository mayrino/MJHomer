var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var i18next = require('i18next');
var i18nextMiddleware = require('i18next-express-middleware');
var Backend = require('i18next-node-fs-backend');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);

var lngDetection = require('./config/detector');
var hbsHelper = require('./config/hbsHelper');

var routes = require('./routes/index');
var userRoutes = require('./routes/user');
var shopRoutes = require('./routes/shop');
var app = express();

//use thirdparty Promise bluebird
mongoose.Promise = require('bluebird');
//connecnt with mongodb  for later used 
mongoose.connect('mongodb://localhost:27017/mjhomer');
require('./config/passport');

var lngDetector = new i18nextMiddleware.LanguageDetector();
lngDetector.addDetector(lngDetection.default);

//initial i18next middleware
i18next
    .use(Backend)
    .use(lngDetector)
    .init({
        backend: {
            // path where resources get loaded from 
            loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
            // path to post missing resources 
            addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json',
            // jsonIndent to use when storing json files 
            jsonIndent: 3
        },
        detection:lngDetection.options,
        fallbackLng: 'zh',
        preload: ['zh', 'en'],
        saveMissing: true,
        ns: ['translation'],
        defaultNS: 'translation',
        /*jshint -W104 */
        function() {
            i18nextMiddleware.addRoute(i18next, '/:lng/key-to-translate', ['zh', 'en'], app, 'get');
        }
    }, function(err, t) {
        if (err) return console.log('something went wrong loading', err);
    });

//set favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// view engine setup
app.engine('hbs', expressHbs({helpers: hbsHelper ,'defaultLayout': 'layout', 'extname': '.hbs' }));

app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({ mongooseConnection:mongoose.connection }),
    cookie:{ maxAge:180*60*1000 }
}));

//use connect-flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//set for i18 localization 
app.use(i18nextMiddleware.handle(i18next));

app.use(function(req,res,next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.lng = req.session['lng'];
    next();
});
app.use('/shop', shopRoutes);
app.use('/user', userRoutes);
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
