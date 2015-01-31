$(document).ready(function(){
    var pagetop = $("#pagetop");
    pagetop.click(function(){
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
});