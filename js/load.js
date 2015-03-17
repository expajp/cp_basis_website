window.onload = function(){
            
    $(".breadcrumbs").css("display", "block"); /* パンくずリスト */
    $("#main div").css("display", "block"); /* コンテンツ要素 */

    $("#main").css("height", "auto"); /* コンテンツ表示領域の高さを元に戻す */
    
    /* 著作権表示を今年に書き換え */
    var this_year = $("#this_year");
    var fullyear = new Date().getFullYear();
    if(fullyear > 2015) this_year.html(fullyear);
    
    /* Pagetopのアニメーション化 */
    var pagetop = $("#pagetop");
    pagetop.click(function(){
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
    
	/* jQuery Sticky-Kit */
	$("#index").stick_in_parent({
		offset_top: 60 
	});
	$("#archives_index").stick_in_parent({
		offset_top: 60 
	});
    
    /* ページ内リンクのアニメーション化 */
    $("#main a[href^=#]:not(a[href=#])").click(function() {
        var speed = 500;
        var href= $(this).attr("href");
        
        var parts = href.split("#");
        var target = parts[1];
        
        var position = Math.max($('a[name='+target+']').offset().top-45, 0);

        /* スクロール */
        $('body, html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
    
}