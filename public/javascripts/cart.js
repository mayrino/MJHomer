( function() {
            // 设置只能输入正整数
            $("[type='text']").keyup(function(event) {

                if ($(this).val().length === 1) {
                    $(this).val($(this).val().replace(/[^1-9.]/g, ''));
                } else {
                    $(this).val($(this).val().replace(/[^0-9.]/g, ''));
                }

            }).bind("paste", function() { //CTR+V事件处理    
                if ($(this).val().length === 1) {
                    $(this).val($(this).val().replace(/[^1-9.]/g, ''));
                } else {
                    $(this).val($(this).val().replace(/[^0-9.]/g, ''));
                }
            }).css("ime-mode", "disabled"); //CSS设置输入法不可用

            $("[type='text']").on("input propertychange", function() {

                if ($(this).val().length === 1) {
                    $(this).val($(this).val().replace(/[^1-9.]/g, ''));
                } else {
                    $(this).val($(this).val().replace(/[^0-9.]/g, ''));
                }

                var origSubtotal = $(this).parent().next().find("span").text().replace(/\$|\￥/ig, '');
                var price = $(this).next().val().replace(/\$|\￥/ig, '');

                var quatity = $(this).val();
                if (Number(quatity).NaN || Number(quatity) === 0 || quatity === "")
                    quatity = 1;

                var subtotal = Number(price) * Number(quatity);

                $(this).parent().next().find("span").text(function(i, orig) {
                    var currency = orig.substring(0, 1);
                    return currency + subtotal.toFixed(2);
                });

                $("#amount").text(function(i, orig) {
                    var currency = orig.substring(0, 1);
                    var result = 0;

                    $("span.subtotal").each(function() {
                        result += Number($(this).text().replace(/\$|\￥/ig, ''));
                    });
                    return currency + result.toFixed(2);
                    /* var result = Number(orig.replace(/\$|\￥/ig, '')) - Number(origSubtotal) + subtotal;
                     return currency + result.toFixed(2);*/
                });
                $(".item-count").text(function(i, orig) {
                    var count = 0;

                    $("[type='text']").each(function() {
                        if (isNaN($(this).val()) || $(this).val() === "") {
                            count += 1;
                        } else {
                            count += parseInt($(this).val());
                        }
                    });
                    return count;
                });
            });


            $("span.glyphicon-minus").click(function() {
                $(this).siblings().eq(0).val(function(i, orig) {
                    --orig;
                    if (orig < 1)
                        return 1;
                    return orig;
                });
                $("[type='text']").trigger("input");
            });

            $("span.glyphicon-plus").click(function() {
                $(this).siblings().eq(1).val(function(i, orig) {
                    return ++orig;
                });
                $(this).siblings().eq(1).trigger("input");
            });


            $("#nodeShowPanel").hide();
            $("#node").hide();
            $("#nodeLink").show();

            $("#nodeLink").click(
                function() {
                    //alert("node-link");
                    $(this).hide();
                    $("#node").show();
                });
            $("#cancleNodeBtn").click(
                function() {
                    if ($("#nodeShow").text() !== "" || $("#nodeShow").text() !== "") {
                        $("#nodeShowPanel").show();
                        $("#nodeLink").hide();
                        $("#node").hide();
                    } else {
                        $("#nodeEdit").val("");
                        $("#nodeLink").show();
                        $("#node").hide();
                        $("#nodeShowPanel").hide();
                    }
                }
            );

            $("#doneNodeBtn").click(function() {
                if ($("#nodeEdit").val() !== "" || $("#nodeEdit").val() !== "") {
                    $("#nodeShow").text(function(i, origText) {
                        return $("#nodeEdit").val();
                    });
                    $("#nodeShowPanel").show();
                    $("#node").hide();
                    $("#nodeLink").hide();
                } else {
                    $("#nodeEdit").val("");
                    $("#nodeLink").show();
                    $("#node").hide();
                    $("#nodeShowPanel").hide();
                }
            });

            $("#nodeTrashBtn").click(function() {
                $("#nodeShow").text("");
                $("#nodeEdit").val("");
                $("#nodeLink").show();
                $("#node").hide();
                $("#nodeShowPanel").hide();
            });

            $("#nodeEditBtn").click(function() {
                $("#nodeEdit").val($("#nodeShow").text());
                $("#nodeLink").hide();
                $("#nodeShowPanel").hide();
                $("#node").show();
            });

            // remove an item 

            $(".item-remove").on("click", function() {
                $(this).parentsUntil("div.panel").remove();
                $("[type='text']").trigger("input");

               $("#cartView").trigger("load");

            });

            // reload text 
            $("#cartView").on("load",function(){                 
               if ($("[type='text']").length===0) {
                $("#amount").text("￥0.00");
                $(".item-count").text("0");
                $(".pull-right,#nodeLink").attr("disabled", "disabled");
                $(".panel").find(".row").eq(1).after("<div class='row cart-view-row'><div class='col-md-12 col-xs-12'><p class='text-center' style='margin:50px 100px;' >你的购物车为空!</p></div></div>");
               }
            });
        })();


 

$('#show_cart').on('click', function (event) {

  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var setting ={url:"/shop/cart",dataType:"html"};
  $.get(setting).done(function(data){
   // alert(data);
     $("body").append(data);
     $('#shopping_cart').modal('show');

     $('#shopping_cart').on('click',"#btn-view-cart", function(){
            window.location.assign('/shop/cart');
     });

     $("#shopping_cart").on('hidden.bs.modal',function(event){
        var modal = $(this);
        $(modal).remove();
     });
       
  });

});






  
    