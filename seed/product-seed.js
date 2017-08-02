var Product = require('../models/product');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost:27017/mjhomer');

var products = [
    new Product({
        imagePath: [path.join('\\', 'product_images', 'garments', 'img1.jpg'), path.join('\\', 'product_images', 'garments', 'img2.jpg')],
        storeQty: 100,
        title: 'T-ERTEshirt',
        price: 19.9,
        type:'shop.garment',
        discount: 16.9,
        size: ['s', 'm', 'l', 'xl', '2xl', '3xl'],
        color: ['black', 'red', 'blue'],
        description: "I'm a product description. I’m a great place to include more information about your product. Buyers like to know what they’re getting before they purchase.",
        detail: "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty.",
        refundPolicy: "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence. "
    }),
    new Product({
        imagePath: [path.join('\\', 'product_images', 'garments', 'img3.jpg'), path.join('\\', 'product_images', 'garments', 'img4.jpg')],
        storeQty: 100,
        title: 'T-ABDshirt',
        price: 19.9,
        type:'shop.garment',
        discount: 16.9,
        size: ['s', 'm', 'l', 'xl', '2xl', '3xl'],
        color: ['grey', 'green', 'gold'],
        description: "I'm a product description. I’m a great place to include more information about your product. Buyers like to know what they’re getting before they purchase.",
        detail: "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty.",
        refundPolicy: "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence. "
    }),
    new Product({
        imagePath: [path.join('\\', 'product_images', 'garments', 'img5.jpg'), path.join('\\', 'product_images', 'garments', 'img7.jpg')],
        storeQty: 100,
        title: 'T-WOENTNshirt',
        price: 19.9,
        type:'shop.garment',
        discount: 16.9,
        size: ['s', 'm', 'l', 'xl', '2xl', '3xl'],
        color: ['grey', 'green', 'gold'],
        description: "I'm a product description. I’m a great place to include more information about your product. Buyers like to know what they’re getting before they purchase.",
        detail: "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty.",
        refundPolicy: "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence. "
    }),
    new Product({
        imagePath: [path.join('\\', 'product_images', 'garments', 'img7.jpg'), path.join('\\', 'product_images', 'garments', 'img8.jpg')],
        storeQty: 100,
        title: 'T-MANDshirt',
        price: 34.9,
        type:'shop.garment',
        discount: 28.9,
        size: ['s', 'm', 'l', 'xl', '2xl', '3xl'],
        color: ['grey', 'green', 'gold'],
        description: "I'm a product description. I’m a great place to include more information about your product. Buyers like to know what they’re getting before they purchase.",
        detail: "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty.",
        refundPolicy: "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence. "
    })
];


var done = 0;

for (var i = 0; i < products.length; i++) {

    products[i].save(saveDone());
}

function saveDone(err, result) {
    done++;
    if (done === products.length) {
        exit();
    }
}

function exit() {
    mongoose.disconnect();
}
