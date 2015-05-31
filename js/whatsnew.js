/* 「お知らせ」「業績」を読み込んで表示 */

/* データファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
 */

/* ページ読み込みと同時に実行 */
$(document).ready(function(){
    
    /* パネルの定義 */
    var panelForNew = $("#whatsnew");
    var panelForAchievement = $("#achievement");
    
    /* パネルの初期化 */
    panelForNew.html("");
    panelForAchievement.html("");
    
    /* 最新n件まで */
    $("#max_new").html(maxLinesForNew);
    $("#max_new_achievement").html(maxLinesForAchievement);
    
    /* ファイルと行数を指定してデータを取得し、パネルに表示 */
    getAndShowDataInSummary(filenameForNew, maxLinesForNew, panelForNew);
    getAndShowDataInSummary(filenameForAchievement, maxLinesForAchievement, panelForAchievement);    

}); 
