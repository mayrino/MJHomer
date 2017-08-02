//a moduel pattern sample
var imgBoxAnimate = function(settings) {

    var $items = $(".img-box");

    var onClick = function(id) {
        window.location.href = $(this).find(".hidden").attr("href");
    };

    $items.each(function() {
        $(this).on("click", onClick);
        $(this).delegate($(this).find(".up-right"), 'click');
        $(this).delegate($(this).find(".down-right"), 'click');
        $(this).delegate($(this).find(".img-box-detail .pull-right"), 'click');
    });
};


$(function() {
    imgBoxAnimate();

    $("#detail-main-img").zoom({ magnify: 1.3 });

    $(".btn-group div").each(function(out_index, out_ele) {
        $(out_ele).click(function() {
            $("#detail-main-img").find("img").attr("src", $(out_ele).find("img").attr("src"));

            if (!$(out_ele).hasClass("active")) {
                $(out_ele).addClass("active");
            }
            $(out_ele).siblings("div").each(function(in_index, in_ele) {
                $(in_ele).removeClass("active");
            });
        });
    });

    $(".color-span").each(function(index, ele) {
        $(ele).on('click', function(event) {
            var color = $(this).find("span").find("span").text();
            $("#lbl_color").text(color);
            $(this).css("border", "1px solid #030303");

            $(this).parent().siblings("div").each(function(in_index, in_ele) {
                $(in_ele).find("span").css("border", "1px solid transparent");
            });
        });
    });

    // detail info page product info and return and refund collapseble

    $("#oneController").click(function() {
        $(this).find("i").toggleClass("fa-minus");
        $(this).find("i").toggleClass("fa-plus");
    });

    $("#twoController").click(function() {
        $(this).find("i").toggleClass("fa-minus");
        $(this).find("i").toggleClass("fa-plus");
    });

});