$(document).ready(function(){
    
    /*著作権表示を今年に書き換え*/
    var this_year = $("#this_year");
    var fullyear = new Date().getFullYear();
    if(fullyear > 2015) this_year.html(fullyear);
    
    /*Pagetopのアニメーション化*/
    var pagetop = $("#pagetop");
    pagetop.click(function(){
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
});