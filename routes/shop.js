var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var paginate = require('express-paginate');
var Join = require("bluebird").join;
var Order = require('../models/Order');

// keep this before all routes that will use pagination
router.use(paginate.middleware(6, 50));

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

router.get('/cart', function(req, res, next) {
    var isMini = req.xhr ? true : false;
    if (!req.session.cart) {
        if (isMini) {
            return res.render('shop/miniCart', { articles: null, layout: false });
        }
        return res.render('shop/cart', { articles: null });
    }
    var cart = new Cart(req.session.cart);
    if (isMini) {
        return res.render('shop/miniCart', { articles: cart.generateArray(), totalPrice: Number(cart.totalPrice).toFixed(2), layout: false });
    }
    return res.render('shop/cart', { articles: cart.generateArray(), totalPrice: Number(cart.totalPrice).toFixed(2), noteText: cart.noteText });
});


/* GET home page. */
router.get('/garment', function(req, res, next) {

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




router.get('/reduce/:id', function(req, res, next) {
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(itemId);
    req.session.cart = cart;
    res.render('partials/cartContent', { articles: cart.generateArray(), totalPrice: Number(cart.totalPrice).toFixed(2), layout: false });

});

/*item increace one to cart*/
router.get('/add-to-cart/:id', function(req, res, next) {
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.addByOne(itemId);
    req.session.cart = cart;
    if (req.xhr) {
        return res.render('partials/cartContent', { articles: cart.generateArray(), totalPrice: Number(cart.totalPrice).toFixed(2), layout: false });
    }
    res.redirect('/shop/cart');
});

router.get('/removeItem/:id', function(req, res, next) {
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(itemId);
    req.session.cart = cart;
    if (req.xhr) {
        return res.render('partials/cartContent', { articles: cart.generateArray(), totalPrice: Number(cart.totalPrice).toFixed(2), layout: false });
    }
    res.redirect('/shop/cart');
});

/*change cart item qty*/
router.get('/changeQty', function(req, res, next) {
    var itemId = req.query.id;
    var qty = req.query.qty;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.changeQty(itemId, qty);
    req.session.cart = cart;
    res.json({ totalQty: cart.totalQty });
});

/* add item to cart*/
router.get('/detail-to-cart', function(req, res, next) {
    var productId = req.query.id;
    var qty = req.query.quantity;
    var color = req.query.color;
    var size = req.query.size;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId).
    then(function(product) {
        cart.add(product, product.id, parseInt(qty, 10), color, size);
        req.session.cart = cart;
        console.info(req.session.cart);
        res.redirect('/shop/cart');
    }, function(err) {
        return next(err);
    });
});
/* shopping note text have been trashed*/
router.get('/noteTrash', function(req, res, next) {
    var cart = new Cart(req.session.cart);
    cart.trashNote();
    req.session.cart = cart;
    res.json({ noteTxt: cart.noteText });
});

/* shopping note text have been inserted or modified*/
router.get('/noteSave', function(req, res, next) {
    var noteTxt = req.query.noteTxt;
    console.log(noteTxt);
    var cart = new Cart(req.session.cart);
    cart.saveNote(noteTxt);
    req.session.cart = cart;
    res.json({ noteTxt: cart.noteText });
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shop/cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];    
    res.render('shop/checkout' , { total: Number(cart.totalPrice).toFixed(2), note: cart.noteText, errMsg:errMsg, noErrors:!errMsg} );
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shop/cart');
    }
    var cart = new Cart(req.session.cart);
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_pbszeNXzM2KalArTHNYB0IJR");

    // Token is created using Stripe.js or Checkout!
    // Get the payment token submitted by the form:
    var token = req.body.stripeToken; // Using Express

    // Charge the user's card:
    var charge = stripe.charges.create({
        amount: parseInt(cart.totalPrice * 100, 10),
        currency: "usd",
        description: "Example charge",
        source: token,
    }, function(err, charge) {        
        if(err){
          req.flash('error', err.message);
          return res.redirect('/shop/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            name: req.body.name,
            postCode: req.body.postCode,
            phone: req.body.phone,
            payment: charge.id  
        });
        order.save(function(err, result){
            if(err){
                req.flash('error', err.message);
                return res.redirect('/shop/checkout');
            }
            req.flash('success', 'Successful bought product');
            req.session.cart=null;
            res.redirect('/user/profile');
        }); 
    });
});


module.exports = router;

function isLoggedIn(req, res, next){     
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl = req.originalUrl;
    return res.redirect('/user/signin');
}