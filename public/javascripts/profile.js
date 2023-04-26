$(function(){
        /* 绑定事件*/
   /*    $(window).on("hashchange" ,function(){
            $('html,body').animate({scrollTop:top}, 1000); 
        });
         $("#uno,#dos,#tres,#cuatro,#cinco").on("click",function(){
            $('html,body').animate({scrollTop:top}, 1000);
        }); */ 
        if(window.location.pathname === '/user/profile') {
            $('[data-spy="affix"]').css("position","static");
        }
    });