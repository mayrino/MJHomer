
//Asynchronous cache  if you want to request js in asynchronous
/*var cachedScriptPromises = {};
$.cachedGetScript = function(url, callback) {
    if (!cachedScriptPromises[url]) {
        cachedScriptPromises[url] = $.Deferred(function(defer) {
            $.getScript(url).then(defer.resovle, defer.reject);
        }).promose();
    }
    return cachedScriptPromises[url].done(callback);
};*/

//Generic Asynchronous cache
$.createCache = function(requestFunction){
    var cache = {};
    return function( key , callback ){
        if(!cache[key]){
            cache[key] = $.Deferred(function(defer){
                requestFunction( defer, key);
            }).promise();
        }
        return cache[key].done(callback);
    };
};
//Now that the request logic is abstracted away, $.cachedGetScript() can be rewritten as follows:
/*
$.cachedGetScript = $.createCache(function( defer, url ) {
    $.getScript( url ).then( defer.resolve, defer.reject );
});
*/
//This will work because every call to $.createCache() will create a new cache repository and return a new cache-retrieval function.

$.loadImage = $.createCache(function( defer, url ) {
    var image = new Image();
    function cleanUp() {
        image.onload = image.onerror = null;
    }
    defer.then( cleanUp, cleanUp );
    image.onload = function() {
        defer.resolve( url );
    };
    image.onerror = defer.reject;
    image.src = url;
});


