/* カテゴリごとにアーカイブをcsvから読み込んで全て表示 */

/* カテゴリごとのデータファイルについて
上に行くほど新しい「お知らせ」になっているようにしてください。
ソートさせてもいいけどめんどくさいので
 */

/* 初期設定はCSVparse_common.jsにて */

/* yearに指定された年のパネルを作成 */
function getPanelForYear(rowDivArray){
    var returnPanel = $("<div>").addClass("panel");
    
    for(var i=0;i<rowDivArray.length;i++){
        returnPanel.prepend(rowDivArray[i]);
    }
    
    return returnPanel;
}

/* ctに指定されたカテゴリのデータを取得し、フォーマットしてobjに格納する */
function getFormatData(ct, obj){
    
    var defer = $.Deferred();
    
    /* 通信で取得したテキストを格納する */
    var text;
    
    /* オブジェクトの名前を指定 */
    obj["name"] = ct;
        
    $.get(filenameForCategories[ct], function(data, status, xhr){
        if(status == "success"){
            text = data;

            /* 取得データを文字列の配列に変換 */
            var line = toLinefromText(text);

            /* データを1行ずつ読みだして文字列へ変換し、時期により配列へ格納 */
            for(var i=0;i<line.length;i++){

                /* データ読み出し */
                var data = toArrayfromLine(line[i]);

                /* その年のメンバが存在するか調べてデータを追加 */
                if(obj.hasOwnProperty(data[0])){ //既に存在するならば先頭にデータをrowDivに整形して追加

                    obj[data[0]].unshift(createRow(data));

                }else{ //まだ存在しないならば初期化

                    obj[data[0]] = [createRow(data)];
                }

                /* 次の要素が存在するかチェック */
                if(line[i+1] == null || line[i+1] == "") break;

            }
            
            defer.resolve();
            
        }
    });
    
    return defer.promise();

}

/* フォーマットされたデータをfuncで整形して渡されたjQueryオブジェクトに格納して返す */
function insertDataToJQObj(formatData, returnJQObj, formatFunc){

   /* オブジェクトの各メンバに対して見出しとパネルを作成してreturnDivに格納 */
    var keys = Object.keys(formatData); //formatDataのkeyを配列として取得

    keys.sort(function(a, b){//降順ソート
        return (b-a);
    });

    for(var i=0;i<keys.length;i++){//各キー（年）について見出しとパネルを格納
        if(keys[i] == "name") continue; //nameキーは例外
        
        formatFunc(formatData, returnJQObj, keys, i); //funcでオブジェクトを整形

    }
    
    return returnJQObj;
    
}

/* main用データ整形関数 */
function formatContentDiv(formatData, returnJQObj, keys, index){
    
    /* 見出し */
    var milestone = $("<a>").attr("name", formatData["name"]+'_'+keys[index]);
    var headline = $("<h5>").text(keys[index]+"年");

    /* パネル */
    var panel = getPanelForYear(formatData[keys[index]]);

    /* 見出しとパネルを追加 */
    returnJQObj.append(milestone)
               .append(headline)
               .append(panel);
    
}

/* インデックス用データ整形関数 */
function formatUl(formatData, returnJQObj, keys, index){
    
    /* li要素とa要素を定義 */
    var li = $("<li>");
    var a = $("<a>").attr("href", '#'+formatData["name"]+'_'+keys[index]).text(keys[index]);

    /* スクロールにアニメーションをつける*/
    a.click(animateScroll);

    /* リンクをインデックスに追加し、本文に反映 */
    li.append(a);        
    returnJQObj.append(li);
    
}

/* divを初期化 ct:カテゴリ, headlineSize:hタグ */
function initializeDiv(ct, headlineSize){
    var returnDiv = $("<div>");
    
    /* タイトルの設定 */
    var headline = $(headlineSize).text(categoriesJp[ct]);
    returnDiv.append(headline);
    
    return returnDiv;
    
}

/* ページ読み込みと同時に実行 */
$(document).ready(function(){

    //DOM要素の指定
    /* main部分 */
    var archives = $("#archives");
    
    /* インデックス部分 */
    var index = $("#archives_index");
    var indexSmall = $("#archives_index_small");
    
    //各種変数定義
    /* カテゴリごとのDiv */
    var ctDiv = new Array();
    
    /* 通信同期用 */
    var promise = new Array();
    
    /* フォーマットされたデータの格納用 */
    var formatData = new Array();
    
    /* インデックス用div */
    var ulDiv = new Array();
    

    /* カテゴリごとに初期化 */
    for(var i=0;i<categories.length;i++){
        
        //main部分
        /* カテゴリ名を取得 */
        var ct = categories[i];
        
        /* 初期化されたカテゴリごとのDivを取得 */
        ctDiv[i] = initializeDiv(ct, "<h4>");
        
        /* フォーマットしたデータを格納するオブジェクト */
        formatData[i] = new Object();
        
        /* 通信する関数をpromiseにセット */
        promise[i] = getFormatData(ct, formatData[i]);
        
        //インデックス
        ulDiv[i] = initializeDiv(ct, "<h5>");
        
    }
    
    
    /* 全てのファイルの通信が終わったら以下を実行 */
    $.when.apply(null, promise).then(function(){
        
        for(var i=0;i<categories.length;i++){
            //main部分
            /* 内容を格納するdivを生成 */
            var contentDiv = $("<div>");
            insertDataToJQObj(formatData[i], contentDiv, formatContentDiv);

            /* 内容のdivをカテゴリごとのdivに追加 */
            ctDiv[i].append(contentDiv);

            /* mainに追加 */
            archives.append(ctDiv[i]);
            

            //インデックス
            /* リストを生成 */
            var ul = $("<ul>").addClass("disc").attr("id", "categoryName");
            insertDataToJQObj(formatData[i], ul, formatUl);
            
            /* リストをulDivに追加 */
            ulDiv[i].append(ul);
            
            /* ulDivをインデックスに追加 */
            index.append(ulDiv[i]);
            indexSmall.append(ulDiv[i].clone());
            
        }
        
    });
    
}); 
