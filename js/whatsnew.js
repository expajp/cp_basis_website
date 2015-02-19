/* 「お知らせ」をwhatsnew.csvから読み込んで表示 */

/* データファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
 */

/* 日付の取得 */
var today = new Date();
var year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate();

/* 定数の設定 */
var filename = "js/whatsnew.txt";/* データファイルの場所 */
var LF = String.fromCharCode(10);/* 改行コードをLFに指定 これでLF+LFでも区切れる */
var startYear = 2015;/*データの存在する最初の年*/


// 関数定義ここから

/* テキストの読み込み */
function getTextFile(fname) {

    /* 変数の定義 */
    var text = null; /* 読み込むテキスト */
    var ajax = new XMLHttpRequest();/* ajaxを使うためのオブジェクト */

    with (ajax) {
        /* テキストが読み込まれてからメソッドを実行 */
        onload = function () { readyState == 4 && status == 200 && (text = responseText); };

        /* ファイル読み込み、ファイルの読み込みの成否にかかわらず次を実行 */
        open('GET', fname, false);

        /* 何も送信しない。いわゆるおまじない */
        send(null);
    };

    return text;
}

/* テキストを行ごとに配列へ格納 */
function toLinefromText(text){

    /* 行データの取得 */
    var line = new Array();
    line = text.split(LF);

    return line;
}

/* 各行のデータを 年/月/日/詳細 として配列に格納して返す */
function toArrayfromLine(line){

    /* 行データを配列へ */
    var data = new Array();
    data = line.split(",");

    return data;
}

// 関数定義ここまで


/* ページ読み込みと同時に実行 */
$(document).ready(function(){
    
    /* お知らせの配列 */
    var ableToSeeInIndex = $("#whatsnew");/* index.htmlの更新情報のパネル */
    var panels = new Array();/* 年ごとのパネルを格納した配列 */
    
    /* 2015年から今年まで、年ごとにパネルを作成 */
    for(i=startYear;i<=year;i++){
        panels[i] = $("<div>").addClass("panel");
    }

    /* ファイルを行ごとに分ける */
    var text = getTextFile(filename);
    var line = toLinefromText(text);

    /* データを1行ずつ読みだして文字列へ変換し、時期により配列へ格納 */
    for(var i=0;i<line.length;i++){
        
        /* データ読み出し */
        var data = toArrayfromLine(line[i]);

        /* 要素作成 */
        var parentDiv = $("<div>").addClass("row");
        
        var dateDiv = $("<div>").addClass("large-2 medium-3 small-5 columns")
                                .attr("id", "date");
        
        var contentDiv = $("<div>").addClass("large-10 medium-9 small-7 columns")
                                   .attr("id", "content");
        
        /* 日付用の文字列を作成し、dateDivの子として追加 */
        var str = data[0] + '.' + data[1] + '.' + data[2];
        dateDiv.append(str);
        
        /* 詳細をcontentDivの子として追加 */
        contentDiv.append(data[3]);

        /* dateDivとcontentDivをparentDivの子として追加 */
        parentDiv.append(dateDiv).append(contentDiv);

        /* 年ごとのパネルに子要素として格納 */
        panels[data[0]].append(parentDiv);
        
        /* 最新の3件はindex.htmlからでも見られるようにする */
        if(i<3) ableToSeeInIndex.append(parentDiv);
        
    }
    
    /* HTMLの書き換え */
    for(i=startYear;i<=year;i++){
        /*各年ごとの見出しを作成して追加*/
        var eachYearMilestone = document.createElement("a");
        eachYearMilestone.setAttribute("name", i);
        
        var eachYearHeadline = document.createElement("h4");
        eachYearHeadline.appendChild(document.createTextNode(i+"年"));
        
        $("#archive_content").append(eachYearMilestone);
        $("#archive_content").append(eachYearHeadline);
        $("#archive_content").append(panels[i]);
        
        /*インデックスに各年へのページ内リンクを作成*/
        var index = document.createElement("li");
        var link = document.createElement("a");
        link.setAttribute("href", '#'+i);
        index.appendChild(link);
        
        $("#archives_index").append(index);
    }    


}); 
