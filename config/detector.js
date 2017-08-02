'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj; } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.options={
    // order and from where user language should be detected
        order: [ /*'path',  'cookie', 'header','session'*/ 'querystring', 'myDetector'],
        // keys or params to lookup language from
        lookupQuerystring: 'lng',
        //lookupCookie: 'i18next',
        //lookupSession: 'lng',
       // lookupPath: 'lng',
        lookupFromPathIndex: 0,
        lookupMyDetector:'lng',
        // cache user language
        caches: ['myDetector'],
        // optional expire and domain for set cookie
        //cookieExpirationDate: new Date(),
        //cookieDomain: 'localhost'
};

exports.default = {
    
    name: 'myDetector',

    lookup: function lookup(req, res, options) {
        var found = void 0;

        if (options.lookupMyDetector !== undefined && (typeof req === 'undefined' ? 'undefined' : _typeof(req)) && req.session) {
            found = req.session[options.lookupMyDetector];
        }

        return found;
    },
    cacheUserLanguage: function cacheUserLanguage(req, res, lng) {
        var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
        if (options.lookupMyDetector && req && req.session && req.query.lng) {
            req.session[options.lookupMyDetector] = lng !== req.query.lng ? req.query.lng : lng;
        }
    }
};
