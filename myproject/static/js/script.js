document.addEventListener('DOMContentLoaded', function () { 

    var socket = io.connect('http://' + document.domain + ':' + location.port); //クライアント側のJavaScriptが実行されているブラウザとサーバーとのWebSocket接続を確立
    
    document.querySelector('#sendbtn').onclick = function () {   // 送信ボタンがクリックされたときの処理
        var message = document.querySelector('#sendmsg').value;
        socket.emit('message', message);
        document.querySelector('#sendmsg').value = '';
    };

    socket.on('message', function (message) {  // サーバーから送信されたメッセージを受信、ブラウザへの表示を行う
        var ul = document.getElementById('messages');  
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(message));
        ul.appendChild(li);
    });
});
