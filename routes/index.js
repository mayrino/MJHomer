var express = require('express');
var router = express.Router();
var Subscription = require('../models/subscription');
var Question = require('../models/question');
var FAQ = require('../models/faq');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('site/index');
});

/* GET browse page. */
router.get('/browse', function(req, res, next) {
    res.render('site/browse');
});

/* GET browse page. */
router.get('/about', function(req, res, next) {
    res.render('site/aboutus');
});

/*get baidu map*/
router.get('/mapDemo', function(req, res, next) {
    res.render("site/mapDemo", { layout: false });
});

/*get customer care page*/
router.get('/customerCare', function(req, res, next) {
    var local = req.session['lng'] || 'zh';
    FAQ.find({ local: local }, 'title para', function(err, docs) {
        var faqFirsts = [];
        var faqSeconds = [];
        if(docs.length % 2 === 0 ){
            faqFirsts.push(docs.slice(0, docs.length / 2));
            faqSeconds.push(docs.slice(docs.length / 2, docs.length));
        }else{
            faqFirsts.push(docs.slice(0, docs.length / 2 + 1));
            faqSeconds.push(docs.slice(docs.length / 2 +1 , docs.length));
        }
        res.render('site/customerCare', { firsts: faqFirsts , seconds: faqSeconds});
    });
});

/*get customer care messages*/
router.post('/customerCare', function(req, res, next) {
    var newQuestion = new Question({ email: req.body.email, name: req.body.name, subject: req.body.subject, message: req.body.message });
    newQuestion.save().then(function(care) {
        return res.send(req.t('care.success'));
    }, function(care) {
        return res.send(req.t('care.failure'));
    }).catch(function(err) {
        return res.send(req.t('backError'));
    });
});

/*POST subscription*/
router.post('/subscribe', function(req, res, next) {
    var newSubscribe = new Subscription({ email: req.body.email });
    newSubscribe.save().then(function(subscribe) {
        return res.send(req.t('subscribe.success'));
    }, function(subscribe) {
        return res.send(req.t('subscribe.failure'));
    }).catch(function(err) {
        return res.send(req.t('backError'));
    });

});

module.exports = router;