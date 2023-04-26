//a moduel pattern sample
var imgBoxAnimate = function(settings) {

    var $items = $(".img-box");

    $items.each(function() {
        $(this).on("click", function(event) {
            window.location.href = $(this).find(".hidden").attr("href");
        });
    });
};

$(function() {
    imgBoxAnimate();
});