var Hashids = require('hashids');

var Cart = function(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.noteText = oldCart.noteText || '';

    this.add = function(item, _id, _qty, _color, _size ) {
        var alpha  = _color + _size;
        var alphabet ='abcdefghijklmnopqrstuvwxyz'; 
        var hashids = new Hashids( alpha , 0, alphabet); 
        var id =hashids.encodeHex(_id);
        var storedItem = this.items[id];
        var qty = (_qty && _qty > 0) ? _qty : 1;
        if (!storedItem) {
            storedItem = this.items[id] = { id:id, item: item, qty: 0 , price: 0, size:_size, color: _color, priceToStr: '' };
        }
        this.totalPrice = (this.totalPrice === 0 ? 0 : (this.totalPrice - storedItem.price));
        storedItem.qty += qty;
        storedItem.price = storedItem.item.priceDiscount * storedItem.qty;
        storedItem.priceToStr = Number(storedItem.price).toFixed(2);
        this.totalQty += qty;
        this.totalPrice += storedItem.price;
    };


    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.priceDiscount;
        this.items[id].priceToStr = Number(this.items[id].price).toFixed(2);
        this.totalQty--;
        this.totalPrice -= this.items[id].item.priceDiscount;
        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
        if( this.totalQty === 0 ){
            this.noteText = '';
        }
    };

     this.addByOne = function(id) {
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.priceDiscount;
        this.items[id].priceToStr = Number(this.items[id].price).toFixed(2);
        this.totalQty++;
        this.totalPrice += this.items[id].item.priceDiscount;
    };

    this.removeItem = function(id) {
        if (this.items[id]) {
            this.totalPrice -= this.items[id].price;
            this.totalQty -= this.items[id].qty;
            delete this.items[id];
        }
        
        if( this.totalQty === 0 ){
            this.noteText = '';
        }
    };

    this.changeQty = function(id, qty) {
        this.totalPrice -= this.items[id].price;
        this.totalQty -= this.items[id].qty;
        this.items[id].qty = parseInt(qty);
        this.items[id].price = this.items[id].item.priceDiscount * qty;
        this.items[id].priceToStr = Number(this.items[id].price).toFixed(2);
        this.totalQty += parseInt(qty);
        this.totalPrice += this.items[id].price;
    };

    this.saveNote = function(text){
        this.noteText = text;
    };

    this.trashNote = function(){
        this.noteText = '';
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            if (id) {
                arr.push(this.items[id]);
            }
        }
        return arr;
    };

};

module.exports = Cart;