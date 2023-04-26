//a object literal
var backLink = {
    init: function(settings) {
        backLink.config = {
            items: $(".second-back a:first , .first-back a:first")
        };
        //Allow ovrriding the default setting
        $.extend(backLink.config, settings);
        backLink.setup();
    },
    setup: function() {
        backLink.config.items.each(backLink.hover);
    },
    hover: function() {
        var $item = $(this);
        $item.hover(backLink.in, backLink.out);
    },
    in : function() {
        var $item = $(this);
        $item.stop(true).animate({
            opacity: 0.5
        }, 500);
    },
    out: function() {
        var $item = $(this);
        $item.stop(true).animate({
            opacity: 1
        }, 500);
    }
};
//a moduel pattern sample
var newArriveAnimate = function(settings) {
    var options = $.extend({ width: 50, height: 28 }, settings);
    var $items = $('.gutter5px');

    var mouseOut = function() {
        var zoom = $(this).find(options.imgZoom);
        var prompt = $(this).find(options.prompt);
        $(zoom).find('img').stop(true).animate({
            width: $(zoom).width() + 10,
            height: $(zoom).height(),
            left: 0,
            top: 0
        }, 500);

        $(prompt).stop(true).animate({
            height: 'hide',
        }, 500);

    };

    var mouseIn = function() {
        var zoom = $(this).find(options.imgZoom);
        var prompt = $(this).find(options.prompt);
        $(zoom).find("img").stop(true).animate({
            width: $(zoom).width() + options.width,
            height: $(zoom).height() + options.height,
            left: -options.width / 2,
            top: -options.height / 2
        }, 500);

        $(prompt).stop(true).animate({
            height: 'show',
        }, 500);
    };

    $items.each(function() {
        $(this).hover(mouseIn, mouseOut);
    });

};

var subscribe = function() {
    var form = $("#focus_form");
    var selector = $(form).find('#email');

    var showPrompt = function(message) {
        var _popover = $(selector).data("bs.popover") && $(selector).popover('destroy') || $(selector).popover({
            content: message,
            placement: "top",
            trigger: "manual",
            template: "<div class='popover'><div class='arrow'></div><div class='popover-inner'><div class='popover-content errorMeg'></div></div></div>"
        });
        _popover.data("bs.popover").options.content = message;
        _popover.on("shown.bs.popover", function() {
            setTimeout(function() {
                ($(selector)).popover('destroy');
            }, 5000);
        });

        $(selector).popover("show");
    };

    var _submit = function(url) {
        var options = {};
        options.submitHandler = function() {
            $.post({
                url: $(form).attr('action')||url,
                data: {email:$(selector).val()},
                success: showPrompt,
                error: showPrompt
            });
        };
        $(form).validator(options);
    };

    _submit();
    
};

$(function() {

    backLink.init();
    newArriveAnimate({
        width: 80,
        height: 36,
        imgZoom: ".box-new-arrive",
        prompt: ".prompt-detail"
    });
    subscribe();
    // initialize all tooltips   and all popover
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // define affix navigator width same as normal layout 
    $("[data-spy='affix']").on("affixed.bs.affix",function(){
        $(this).width($(document.body).outerWidth(true));
    });
    
      
});
