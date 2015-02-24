/* 「お知らせ」をwhatsnew.csvから読み込んで表示 */

/* データファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
 */

/* 日付の取得 */
var today = new Date();
var year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate();

/* 定数の設定 */
var filename = "js/whatsnew.csv";/* データファイルの場所 */
var LF = String.fromCharCode(10);/* 改行コードをLFに指定 */
var startYear = 2015;/* データの存在する最初の年 */
var maxLinesInIndex = 5;/* index.htmlに表示するお知らせの数 */


// 関数定義ここから

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

/* ページ内リンクをアニメーションにする */
function animateScroll(){
    var speed = 500;
    var href= $(this).attr("href");

    var parts = href.split("#");
    var target = parts[1];

    var position = Math.max($('a[name='+target+']').offset().top-45, 0);

    /*スクロール*/
    $('body, html').animate({scrollTop:position}, speed, 'swing');
    return false;
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
    
    /* index.htmlの表示領域の初期化 */
    ableToSeeInIndex.html("");
    
    /* 最新のn件だけindex.htmlに表示していることをお知らせ */
    $("#max_new").html(maxLinesInIndex);
    
    /* データを取得し、成功したらその後の処理を行う */
    $.get(filename, function(data, status, xhr){
        if(status == "success"){
            text = data;            
            var line = toLinefromText(text);
            
            /* データを1行ずつ読みだして文字列へ変換し、時期により配列へ格納 */
            for(var i=0;i<line.length-1;i++){

                /* データ読み出し */
                var data = toArrayfromLine(line[i]);

                /* 要素作成 */
                var parentDiv = $("<div>").addClass("row");

                var dateDiv = $("<div>").addClass("large-2 medium-2 small-3 columns")
                                        .attr("id", "date");

                var contentDiv = $("<div>").addClass("large-10 medium-10 small-9 columns")
                                           .attr("id", "content");

                /* 日付用の文字列を作成し、dateDivの子として追加 */
                var str = data[0] + '.' + data[1] + '.' + data[2];
                dateDiv.html(str);

                /* 詳細をcontentDivの子として追加 */
                contentDiv.html(data[3]);

                /* dateDivとcontentDivをparentDivの子として追加 */
                parentDiv.append(dateDiv);
                parentDiv.append(contentDiv);

                /* 年ごとのパネルに子要素として格納 */
                var yearInt = parseInt(data[0], 10);
                panels[yearInt].append(parentDiv);

                /* 最新の{maxLinesInIndex}件はindex.htmlからでも見られるようにする */
                if(i < maxLinesInIndex) ableToSeeInIndex.append(parentDiv);
                
                /* 次の要素が存在するかチェック */
                if(line[i+1] == null) break;

            }

            /* HTMLの書き換え */
            
            /* 書き換え領域の初期化 */
            $("#archive_content").html("");
            $("#archives_index ul.disc").html("");
            $("#archives_index_small ul.disc").html("");
            
            for(i=year;i>=startYear;i--){
                
                /* 各年ごとの見出しを作成 */
                var eachYearMilestone = $("<a>").attr("name", i);
                var eachYearHeadline = $("<h4>").text(i+"年");

                /* 作成した見出しと作成済みのパネルを本文に追加 */
                $("#archive_content").append(eachYearMilestone);
                $("#archive_content").append(eachYearHeadline);
                $("#archive_content").append(panels[i]);

                /* インデックスに各年へのページ内リンクを作成 */
                var index = $("<li>");
                var index_clone = index.clone();
                var link = $("<a>").attr("href", '#'+i).text(i);
                var link_clone = link.clone();
                
                /* スクロールにアニメーションをつける*/
                link.click(animateScroll);
                link_clone.click(animateScroll);
                
                /* リンクをインデックスに追加し、本文に反映 */
                index.append(link);
                index_clone.append(link_clone);
                
                $("#archives_index ul").append(index);
                $("#archives_index_small ul").append(index_clone);
            }
            
        }
    });
    

}); 
