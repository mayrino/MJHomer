var chooseColor = function(event) {
    var color = $(this).find("span").find("span").text();
    $("#lbl_color").text(color);
    $(this).css("border", "1px solid #030303");

    $(this).parent().siblings("div").each(function(in_index, in_ele) {
        $(in_ele).find("span").css("border", "1px solid transparent");
    });
    $("[name='color']").val($(this).attr("data-color"));
};

var chooseSize = function(event) {
    var size = $(this).val();
    $("#lbl_size").text(size);
};

var changeQuantity = function(event) {
    var qty = $(this).val();
    $("#lbl_qty").text(qty);
};

$(function() {

    $("#detail-main-img").zoom({ magnify: 1.5 });

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

    //radio buttons for choose size
    $('[name="size"]').each(function(index, ele) {
        $(ele).on('click', chooseSize);
    });
    
    $('[name="size"]').first().trigger("click");

    //buttons for choose  color 
    $(".color-span").each(function(index, ele) {
        $(ele).on('click', chooseColor);
    });

    $("input[name='quantity']").TouchSpin({
        buttondown_class: "btn btn-link",
        buttonup_class: "btn btn-link",
        min: 1,
        max: 999999,
        initval: "1",
        verticalbuttons: true
    });
    //initial qty value
    $("#lbl_qty").text(1);
    $("input[name='quantity']").on("input propertychange change", changeQuantity);
    $(".color-span").first().trigger("click");
    // detail info page product info and return and refund collapseble
    $("#oneController").click(function() {
        $(this).find("i").toggleClass("fa-minus");
        $(this).find("i").toggleClass("fa-plus");
    });

    $("#twoController").click(function() {
        $(this).find("i").toggleClass("fa-minus");
        $(this).find("i").toggleClass("fa-plus");
    });

      $("#detail-to-cart").on("click", function(event){
        event.stopPropagation();
        var url = "/shop/detail-to-cart?" + $( "#detail-form" ).serialize();    
        $('#show_cart').trigger("click", url);             
    });

      $("button[data-btn='checkout']").each(function(idx, ele ){
         $(ele).on("click", function(event){
             window.location.assign("/shop/checkout");
         });
      });
});