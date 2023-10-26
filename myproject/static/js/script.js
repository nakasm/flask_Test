//クライアント側のJavaScriptが実行されているブラウザとサーバーとのWebSocket接続を確立
var socket = io.connect('http://' + document.domain + ':' + location.port); 

// 変数定義
var sendBtnElement = document.getElementById("sendbtn")
var sendMsgElement = document.getElementById("sendmsg")
var postMsgElement = document.getElementById("messages")

// ボタンの無効化
sendBtnElement.disabled = true

// sendmsgチェンジイベント
sendMsgElement.addEventListener('change', function(){
    if(sendMsgElement.value === ""){
        sendBtnElement.disabled = true
    }
    else{
        sendBtnElement.disabled = false
    }
})

// sendbtnクリックイベント
sendBtnElement.addEventListener('click', function(){
     // ユーザーが送信ボタンをクリックすると上記のイベントリスナーが呼び出される
     // クライアントからサーバーに "message" イベントが送信される
    socket.emit("message", sendMsgElement.value)
    sendMsgElement.value = ""
    sendBtnElement.disabled =  true
})

// サーバーから受信した "message" に対するクライアント側の処理
// クライアント側のJavaScriptは、socket.on('message', function(message)) 
// を使用し、サーバーからの "message" を待機
socket.on("message", function(message){
    var pMsgElement = document.createElement("p")
    pMsgElement.appendChild(document.createTextNode(message));
    postMsgElement.appendChild(pMsgElement);
})