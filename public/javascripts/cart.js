var MiniCart = {

    //mini cart increase and decrease one also remove an item
    regulate: function(arr) {
        $.each(arr, function(key, value) {
            $(value).on("click", function(event) {
                event.preventDefault();
                $("#mini-cart .modal-content").load($(this).attr("data-herf"), function(res, status, xhr) {
                    MiniCart.regulate($('[target="mini-add"]'));
                    MiniCart.regulate($('[target="mini-reduce"]'));
                    MiniCart.regulate($('[target="mini-remove"]'));
                    $("#show_cart span").text($(".modal-body").attr("data-total-qty"));
                });
            });
        });
    },

    showMiniCart: function(url) {
        var setting = { url: url, dataType: "html" };
        /*alert(url);*/
        $.get(setting).done(function(data) {
            $("body").append(data);
            $('#mini-cart').modal('show');

            $('#mini-cart').on('shown.bs.modal', function(event) {

                MiniCart.regulate($('[target="mini-reduce"]'));

                MiniCart.regulate($('[target="mini-add"]'));

                MiniCart.regulate($('[target="mini-remove"]'));

            });

            $('#mini-cart').on('click', "#btn-view-cart", function() {
                window.location.assign('/shop/cart');
            });
            //display total quantity on shopping-cart button
            $("#show_cart span").text($(".modal-body").attr("data-total-qty"));

            $("#mini-cart").on('hidden.bs.modal', function(event) {
                var modal = $(this);
                $(modal).remove();
            });
        });
    }
};


var Cart = function() {
    var textInputs = $(".cart-view-row [type='text']");
    var subtotalTexts = $("i.subtotal");
    var minuses = $('i.fa-minus');
    var pluses = $('i.fa-plus');
    // 设置只能输入正整数
    var justNumber = function(event) {
        var val = $(this).val();
        var length = $(this).val().length;
        if (length === 1) {
            $(this).val(val.replace(/[^1-9]/g, ''));
        } else {
            $(this).val(val.replace(/[^0-9]/g, ''));
        }
        if (Number(val).NaN || Number(val) === 0 || val === "" || val === "undefined")
            $(this).val(1);
    };

    var calcSubtotal = function() {
        var price = $(this).next().val();
        var qty = $(this).val();
        $(this).parent().next().find("i").text(function(i, orig) {
            return (Number(price) * Number(qty)).toFixed(2);
        });
    };
    var calcAmount = function() {
        $("#amount").text(function(i, orig) {
            var amt = 0;
            $(subtotalTexts).each(function() {
                amt += Number($(this).text());
            });
            return amt.toFixed(2);
        });
    };
    var calcCount = function() {
        $(".item-count").text(function(i, orig) {
            var count = 0;
            $(textInputs).each(function() {
                count += parseInt($(this).val());
            });
            return count;
        });
    };

    var clickMinus = function() {

        $(this).siblings().eq(0).val(function(i, orig) {
            --orig;
            return orig < 1 ? 1 : orig;
        });
        $(this).siblings().eq(0).trigger("input");
    };

    var clickPlus = function() {
        $(this).siblings().eq(1).val(function(i, orig) {
            return ++orig;
        });
        $(this).siblings().eq(1).trigger("input");
    };

    var changeQty = function() {
        var $that = $(this);
        var itemId = $(this).attr("data-item-id");
        var qty = $(this).val();
        var setting = { url: "/shop/changeQty", data: { id: itemId, qty: qty } };
        $.get(setting)
            .done(function(data) {
                calcSubtotal.call($that);
                calcAmount.call($that);
                calcCount.call($that);

                $("#show_cart span").text(data.totalQty);
            });
    };

    var showCart = function(event, _url ) {
        event.stopPropagation();

        var url = _url ? _url: "/shop/cart";
        var mql = window.matchMedia("(max-width: 700px)");
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        if (mql.matches || window.location.pathname === url || window.location.pathname ===  "/shop/checkout") {
            window.location.assign(url);
        } else {
            MiniCart.showMiniCart(url);
        }
    };

    var init = function() {
        $(textInputs).each(function(i, ele) {

            $(ele).on("keyup paste input propertychange", justNumber);
            /* $(ele).on("input propertychange", calcSubtotal);
             $(ele).on("input propertychange", calcAmount);
             $(ele).on("input propertychange", calcCount);*/
            $(ele).on("input propertychange", changeQty);
            //CSS设置输入法不可用
            $(ele).css('ime-mode', 'disabled');
        });

        $(minuses).each(function(i, ele) {
            $(ele).on('click', clickMinus);
        });

        $(pluses).each(function(i, ele) {
            $(ele).on('click', clickPlus);
        });

        $('#show_cart').on('click', showCart);
    };

    init();
};



(function() {
     Cart();

     if ($("#noteShow").text() !== "" ) {
        $("#noteShowPanel").show();
        $("#note").hide();
        $("#noteLink").hide();
     }else{
        $("#noteShowPanel").hide();
        $("#note").hide();
        $("#noteLink").show();
     }


    $("#noteLink").click(
        function() {
            $(this).hide();
            $("#note").show();
        });
    $("#cancleNoteBtn").click(
        function() {
            if ($("#noteShow").text() !== "") {
                $("#noteShowPanel").show();
                $("#noteLink").hide();
                $("#note").hide();
            } else {
                $("#noteEdit").val("");
                $("#noteLink").show();
                $("#note").hide();
                $("#noteShowPanel").hide();
            }
        }
    );

    $("#doneNoteBtn").click(function() {
        if ($("#noteEdit").val() !== "" || $("#noteEdit").val() !== "") {
            $.get({url:"/shop/noteSave",data:{ noteTxt: $("#noteEdit").val() }})
                .done(function(res) {
                    $("#noteShow").text(res.noteTxt);
                    $("#noteShowPanel").show();
                    $("#note").hide();
                    $("#noteLink").hide();
                });

        } else {
            $("#noteEdit").val("");
            $("#noteShow").text("");
            $("#noteLink").show();
            $("#note").hide();
            $("#noteShowPanel").hide();
        }
    });

    $("#noteTrashBtn").click(function() {
        $.get("/shop/noteTrash").done(function(res) {
            $("#noteShow").text(res.noteTxt);
            $("#noteEdit").val(res.noteTxt);
            $("#noteLink").show();
            $("#note").hide();
            $("#noteShowPanel").hide();
        });
    });

    $("#noteEditBtn").click(function() {
        $("#noteEdit").val($("#noteShow").text());
        $("#noteLink").hide();
        $("#noteShowPanel").hide();
        $("#note").show();
    });
})();