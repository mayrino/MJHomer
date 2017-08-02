var express = require('express');
var router = express.Router();
var Subscription = require('../models/subscription');
var Cart = require('../models/cart');
var Product = require('../models/product');
var paginate = require('express-paginate');
var Join = require("bluebird").join;


// keep this before all routes that will use pagination
router.use(paginate.middleware(6, 50));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('site/index');
});

/* GET product detail page. */
router.get('/detail/:id', function(req, res, next) {
    var productId = req.params.id;
    var current, nextPro, prevPro;
    Join(Product.findById(productId), Product.findOne({ _id: { $lt: productId } }).sort({ _id: -1 }), Product.findOne({ _id: { $gt: productId } }).sort({ _id: 1 }), function(currDoc, prevDoc, nextDoc) {
        current = currDoc;
        prevPro = prevDoc ? prevDoc._id : prevDoc;
        nextPro = nextDoc ? nextDoc._id : nextDoc;
        res.render('shop/detail', { product: current, next: nextPro, prev: prevPro });
    });
});

/* GET shopping cart  page. */

router.get('/shop/cart', function(req, res, next) {
    console.log("mini" + req.xhr);
    var isMini = req.xhr ? true :false;
    if (!req.session.cart) {       
        if (isMini) {
            return res.render('shop/miniCart',{ articles: null,layout:false });
        }
        return res.render('shop/cart',  { articles: null });
    }
    var cart = new Cart(req.session.cart);
    if (isMini) {
       return res.render('shop/miniCart', { articles: cart.generateArray(), totalPrice: cart.totalPrice ,layout:false });
    }
    return res.render('shop/cart', { articles: cart.generateArray(), totalPrice: cart.totalPrice  });
});


/* GET home page. */
router.get('/shop/garment', function(req, res, next) {

    Product.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, docs) {

        if (err) return next(err);
        var products = docs.docs;
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < products.length; i += chunkSize) {
            productChunks.push(products.slice(i, i + chunkSize));
        }
        res.format({
            html: function() {
                res.render('shop/garment', {
                    products: productChunks,
                    pageCount: docs.pages,
                    itemCount: docs.total,
                    pages: paginate.getArrayPages(req)(2, docs.pages, req.query.page),
                    hasNext: paginate.hasNext(req, docs.pages),
                    prevUrl: paginate.linkUrl(req, true),
                    nextUrl: paginate.linkUrl(req)
                });
            }
        });
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


/*add to cart*/

router.get('/shop/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId).
    then(function(product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        console.info(req.session.cart);
        res.redirect('/shop/garment');

    }, function(err) {
        return next(err);
    });
});

module.exports = router;