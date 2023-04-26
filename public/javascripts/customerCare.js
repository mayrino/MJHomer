  var sendMsg = function() {
      var form = $("#form-message");
      var showMsg = $("#showMsg");
      var data = {};
      data.name = $(form).find("input#name").val();
      data.email = $(form).find("input#email").val();
      data.subject = $(form).find("input#subject").val();
      data.message = $(form).find("textarea#message").val();

      var showPrompt = function(message) {
             $(showMsg).text(message);
             $(showMsg).css("color", "#91B9F7");
             $(showMsg).fadeOut(5000);
             $(form)[0].reset();
      };

      var _submit = function(url) {
          var options = {};
          options.submitHandler = function() {
              $.post({
                  url: $(form).attr('action') || url,
                  data: data,
                  success: showPrompt,
                  error: showPrompt
              });
          };
          $(form).validator(options);
      };
      _submit();

  };

$(function() {
    sendMsg();
});