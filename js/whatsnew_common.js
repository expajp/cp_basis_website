/* 「お知らせ」をwhatsnew.csvから読み込んで表示 */

/* データファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
 */

/* 定数の設定 */

/* 共通 */
var LF = String.fromCharCode(10); //改行コードをLFに指定 
var startYear = 2015; //データの存在する最初の年
var filenameForNew = "js/whatsnew.csv"; //「お知らせ」データファイル
var filenameForAchievement = "js/achievement.csv"; //「業績」データファイル

/* index.html */
var maxLinesForNew = 5; //「お知らせ」の表示数
var maxLinesForAchievement = 5; //「業績」の表示数

/* archives.html */
var categories = ["new", "achievement"]; //カテゴリの設定
var categoriesJp = {new:"過去のお知らせ", achievement:"過去の業績"}; //カテゴリの日本語名の設定
var filenameForCategories = {new:filenameForNew, achievement:filenameForAchievement};



// コードここから

/* 日付の取得 */
var today = new Date();
var year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate();


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

/* 配列に格納されたデータをjQueryオブジェクトに整形する */
function createRow(data){
    
    /* 親要素作成 */
    var parentDiv = $("<div>").addClass("row");
                
    /* 日付とコンテンツを格納する要素の作成 */
    var dateDiv = $("<div>").addClass("large-2 medium-3 small-12 columns small-only-text-left")
                            .attr("id", "date");

    var contentDiv = $("<div>").addClass("large-10 medium-9 small-12 columns text-left")
                               .attr("id", "content");

    /* 日付用の文字列を作成し、dateDivの子として追加 */
    var str = data[0] + '.' + data[1] + '.' + data[2];
    dateDiv.html(str);

    /* 詳細をcontentDivの子として追加 */
    contentDiv.html(data[3]);

    /* dateDivとcontentDivをparentDivの子として追加 */
    parentDiv.append(dateDiv);
    parentDiv.append(contentDiv);
    
    return parentDiv;
    
}

/* ファイルを指定してデータを取得し、画面に表示 for index.html */
function getAndShowDataInSummary(filename, maxLines, panel){
    
    /* データを取得し、成功したらその後の処理を行う */
    $.get(filename, function(data, status, xhr){
        if(status == "success"){
            text = data;            
            var line = toLinefromText(text);
            
            /* データを1行ずつ読みだして文字列へ変換し、時期により配列へ格納 */
            for(var i=0;i<maxLines;i++){

                /* データ読み出し */
                var data = toArrayfromLine(line[i]);

                /* 要素作成 */
                var rowDiv = createRow(data);
                
                /* パネルに追加 */
                panel.append(rowDiv);
                
                /* 次の要素が存在するかチェック */
                if(line[i+1] == null || line[i+1] == "") break;

            }
            
        }
    });
    
}

/* カテゴリごとにファイルを指定してデータを取得し、画面に表示 for archives.html */
function getAndShowData(filename, panelsArray, categoryName){
    
    console.log(categoryName);
    
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
                var rowDiv = createRow(data);

                /* 年ごとのパネルに子要素として格納 */
                var yearInt = parseInt(data[0], 10);
                panelsArray[yearInt].append(rowDiv);
                
                /* 次の要素が存在するかチェック */
                if(line[i+1] == null || line[i+1] == "") break;

            }

            /* HTMLの書き換え */
            createArchive(categoryName, panelsArray);            
            
        }
    });
    
}

/* 作成済みの年ごとのパネルからhtmlを書き換え for archives.html */
function createArchive(categoryName, panelsArray){
    
/// 定義    
    
    /* メイン領域用のブロックを定義 */
    var mainDiv = $("<div>");
    
    /* メイン領域のタイトルを定義 */
    var mainTitle = $("<h4>");
    mainTitle.text(categoriesJp[categoryName]);
    
    /* 年ごとの情報を格納するdivを定義 */
    var contentDiv = $("<div>");
    contentDiv.attr("id", "archives_"+categoryName);
    
    /* インデックス用リストを定義 */
    var ul = $("<ul>");
    ul.addClass("disc");
    ul.attr("id", "categoryName");
    
    /* インデックス用リストのタイトルを定義 */
    var titleOfUl = $("<h5>");
    titleOfUl.text(categoriesJp[categoryName]);


/// データ追加
    
    /* 年ごとの処理 */
    for(i=year;i>=startYear;i--){

        /* 各年ごとの見出しを作成 */
        var eachYearMilestone = $("<a>").attr("name", i);
        var eachYearHeadline = $("<h5>").text(i+"年");

        /* 作成した見出しと作成済みのパネルを本文に追加 */
        contentDiv.append(eachYearMilestone);
        contentDiv.append(eachYearHeadline);
        contentDiv.append(panelsArray[i]);        
        
        /* インデックスに各年へのページ内リンクを作成 */
        var index = $("<li>");
        var link = $("<a>").attr("href", '#'+i).text(i);

        /* スクロールにアニメーションをつける*/
        link.click(animateScroll);

        /* リンクをインデックスに追加し、本文に反映 */
        index.append(link);
        
        ul.append(index);
        
    }
    
/// 画面表示
    
    /* メイン領域のブロックに内容を追加 */
    mainDiv.append(mainTitle);
    mainDiv.append(contentDiv);
    
    /* 作ったカテゴリのdivを画面に表示 */
    $("#archives").append(mainDiv);
    
    /* インデックスに内容を追加 */
    $("#archives_index").append(titleOfUl);
    $("#archives_index").append(ul);
    $("#archives_index_small").append(titleOfUl.clone());
    $("#archives_index_small").append(ul.clone());    
    
    
}

