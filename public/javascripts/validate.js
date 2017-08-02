$.fn.validator = function(options) {
    var _ops = {
        debug: true,
        errorClass: "invalid",
        submitHandler: function() {
            console.log("submitted!");
        }
    };

    if (options) {
        $.extend(_ops, options);
    }

    $.validator.setDefaults(_ops);

    this.validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password:{
                required: true
            }
        },

        showErrors: function(errorMap, errorList) {
            $.each(this.successList, function(index, value) {
                return $(value).popover("destroy");
            });
            return $.each(errorList, function(index, value) {
                var _popover;
                _popover = $(value.element).popover({
                    trigger: "manual",
                    placement: "top",
                    content: value.message,
                    template: "<div class='popover'><div class='arrow'></div><div class='popover-inner'><div class='popover-content errorMeg'></div></div></div>"
                });

                (_popover).on("shown.bs.popover", function() {
                    setTimeout(function() {
                        (_popover).popover('hide');
                    }, 10000);
                });
                // Bootstrap 3.x :      
                _popover.data("bs.popover").options.content = value.message;
                // Bootstrap 2.x :
                //_popover.data("popover").options.content = value.message;
                return $(value.element).popover("show");
            });
        }
    });
};
