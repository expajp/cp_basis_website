/* 「お知らせ」「業績」を読み込んで表示 */

/* データファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
 */

/* 文字列の配列を1行ずつ読みだして、最大n行パネルに格納して返す */
function addDataToPanel(line, panel, n){
    
    for(var i=0;i<n;i++){

        /* データ読み出し */
        var dataSet = toArrayfromLine(line[i]);

        /* 要素作成 */
        var rowDiv = createRow(dataSet);

        /* パネルに追加 */
        panel.append(rowDiv);

        /* 次の要素が存在するかチェック */
        if(line[i+1] == null || line[i+1] == "") break;

    }
    
}


/* ファイルを指定してデータを取得し、画面に表示 for index.html */
function getAndShowDataInSummary(filename, maxLines, panel){
    
    /* データを取得し、成功したらその後の処理を行う */
    $.get(filename, function(data, status, xhr){
        if(status == "success"){
            text = data;
            
            /* 取得データを文字列の配列に変換 */
            var line = toLinefromText(text);
            
            /* 文字列の配列を1行ずつ読みだしてパネルに格納 */
            addDataToPanel(line, panel, maxLines);            
        }
    });
    
}

/* ページ読み込みと同時に実行 */
$(document).ready(function(){
    
    /* カテゴリごとに処理 */
    for(var i=0;i<categories.length;i++){
        
        /* カテゴリ名取得 */
        var ct = categories[i];
        
        /* パネルの取得 */
        var panel = $("#"+ct);
        
        /* パネルの初期化 */
        panel.html("");
        
        /* 「最新n件まで」を画面表示 */
        $("#max_"+ct).html(maxLines[ct]);
        
        /* ファイルと行数を指定してデータを取得し、パネルに追加 */
        getAndShowDataInSummary(filenameForCategories[ct], maxLines[ct], panel)
        
    }

}); 
