//クライアント側のJavaScriptが実行されているブラウザとサーバーとのWebSocket接続を確立
var socket = io.connect('http://' + document.domain + ':' + location.port); 

// 変数定義
var sendBtnElement = document.getElementById("sendbtn")
var sendMsgElement = document.getElementById("sendmsg")
var postMsgElement = document.getElementById("messages")

// sendbtnクリックイベント
sendBtnElement.addEventListener('click', function(){
    // クライアントからサーバに送信
    socket.emit("message", sendMsgElement.value)
    sendMsgElement.value = ""
})

// サーバからクライアントに送信
socket.on("message", function(message){
    var listMsgElement = document.createElement("p")
    listMsgElement.appendChild(document.createTextNode(message));
    postMsgElement.appendChild(listMsgElement);
})