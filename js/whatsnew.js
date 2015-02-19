/* 「お知らせ」をwhatsnew.csvから読み込んで表示 */

/* データファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
 */

/* 日付の取得 */
var today = new Date();
var year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate();

/* 定数の設定 */
var filename = "whatsnew.csv";/* データファイルの場所 */
var LF = String.fromCharCode(10);/* 改行コードをLFに指定 これでCR+LFでも区切れる */


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
$(function(){
    
    /* お知らせの配列 */
    var ableToSeeInIndex = new Array();/* index.htmlに掲載するもの */
    var archives = new Array();/* 過去のお知らせを年ごとに格納した配列の配列 */
    
    /* 2015年から今年まで、年ごとに配列を作成 */
    for(i=2015;i<=year;i++) archives[i] = new Array();

    /* ファイルを行ごとに分ける */
    var text = getTextFile(filename);
    var line = toLinefromText(text);

    /* データを1行ずつ読みだして文字列へ変換し、時期により配列へ格納 */
    for(var i=0;i<line.length;i++){
        /* データ読み出し */
        var data = toArrayfromLine(line[i]);

        /* 要素作成 */
        //TODO
        var parentDiv = document.createElement("div");
        
        var dateDiv = document.createElement("div");
        dateDiv.addClass("large-2 medium-3 small-5 colums");
        dateDiv.id = "date";
        
        var link = document.createElement("a");
        var str = new String("Date");

        /* 日付用の文字列を作成 */
        str = data[0] + '.' + data[1] + '.' + data[2];

        /* 文字列をaタグの子として追加 */
        link.appendChild(document.createTextNode(str));

        /* 作成したリンクをliタグの要素として登録 */
        item.appendChild(link);

        /* 隔年ごとの配列に格納 */
        archives[data[0]].push(item);
        
    }
    
    /* HTMLの書き換え */
    <a name="2015"></a>  
                <h4>2015年</h4>
                <div class="panel">
                    <div class="row">                        
                        <div class="large-2 medium-3 small-5 columns" id="date">2015.02.xx</div>
                        <div class="large-10 medium-9 small-7 columns" id="content">研究室の統合にあわせてサイトを一新しました。</div>                        
                    </div>
                </div>

}); 
