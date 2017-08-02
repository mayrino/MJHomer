var Cart=function(oldCart){
    this.items=oldCart.items || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;
   
    this.add =function(item, id, _qty){
        var storedItem = this.items[id];
        var qty = ( _qty && _qty > 0) ? _qty : 1;
        if(!storedItem){
            storedItem = this.items[id] ={item:item,qty:0,price:0};
        }
        this.totalPrice = (this.totalPrice === 0 ? 0 : (this.totalPrice - storedItem.price));
        storedItem.qty += qty ;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty += qty ;
        this.totalPrice += storedItem.price; 
    };

    this.reduceByOne = function(id){
        this.items[id].qty -- ;
        this.items[id].price -=this.items[id].item.price;
        this.totalQty --;
        this.totalPrice -= this.items[id].item.price;
        if(this.items[id].qty <= 0 ){
            delete this.items[id];
        }
    };

     this.removeItem = function(id){  
        this.totalPrice -= this.items[id].price;
        this.totalQty -= this.items[id].qty; 
        delete this.items[id];
     };


    this.generateArray = function(){
        var arr =[];
        for(var id in this.items){
            if(id){
                arr.push(this.items[id]);
            }          
        }
        return arr;
    };
 
};

module.exports =Cart;