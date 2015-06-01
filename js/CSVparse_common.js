/* *.csvをパースして表示する処理のうちの共通処理 */

/* データファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
index.htmlの表示がおかしくなります
 */

/* 定数の設定 */

/* 共通 */
var LF = String.fromCharCode(10); //改行コードをLFに指定 

var categories = ["new", "achievement"]; //カテゴリの設定
var categoriesJp = {new:"過去のお知らせ", achievement:"過去の業績"}; //カテゴリの日本語名の設定
var filenameForCategories = {new:"js/new.csv", achievement:"js/achievement.csv"}; //カテゴリごとのファイル名の設定
var maxLines = {new:5, achievement:5}; //index.htmlのカテゴリごとの表示数の設定


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
