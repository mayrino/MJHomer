var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// get or set  store quatity field for just integer only 
function storeQty(v) {
    return Math.round(v);
}

var productSchema = new Schema({
    imagePath: [{ type: String,  require: true }],
    storeQty: { type: Number, min: 1, require: true, get: storeQty, set: storeQty },
    title: { type: String, require: true },
    price: { type: Number, require: true },
    priceDiscount: { type: Number, alias: 'discount' },
    size: [{ type: String,  require: true,  uppercase: true }],
    color: [{ type: String, require: true,  uppercase: true }],
    description: { type: String, require: true },
    detail: { type: String, require: true },
    refundPolicy: { type: String, require: true },
    type: { type: String, require: true },
    number:{type:String, require:true}
}/*, { bufferCommands: false }*/);

productSchema.plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Product', productSchema);
