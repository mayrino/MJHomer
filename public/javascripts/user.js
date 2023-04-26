$(function() {
    var options = {};
    options.submitHandler = function(form) {
         form.submit();
    };
    $("#user_form").validator(options);
});