/* カテゴリごとにアーカイブをcsvから読み込んで全て表示 */

/* カテゴリごとのデータファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
 */


/* ページ読み込みと同時に実行 */
$(document).ready(function(){
    
    console.log(categories.length);
    
    /* パネルの配列 */
    var panelsArrayOfArray = new Array();

    for(var i=0;i<categories.length;i++){
        panelsArrayOfArray[i] = new Array();
    }
    
    /* ${startYear}年から今年まで、年ごとにパネルを作成 */
    for(var i=0;i<categories.length;i++){        
        for(var j=startYear;j<=year;j++){            
            panelsArrayOfArray[i][j] = $("<div>").addClass("panel");            
        }        
    }
    
    /* カテゴリごとにファイルを指定してデータを取得し、画面に表示 */
    for(var i=0;i<categories.length;i++){
        getAndShowData(filenameForCategories[categories[i]], panelsArrayOfArray[i], categories[i]);
    }    

}); 
