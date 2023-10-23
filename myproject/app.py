from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

# クライアントのブラウザがルートにアクセスするとindex()が呼び出される
@app.route('/')
# chat.htmlテンプレートを読み込み、webページを表示
def index():
    return render_template('chat.html')

# 'message' イベントが発生したときに呼び出される
@socketio.on('message')
def display_message_length(message): # メッセージの文字列長を表示する関数
    try:
        #emit関数でクライアントに応答メッセージを送信
        length = len(message)  
        emit('message', f'You sent: {message}')
        emit('message', f'Message Length: {length}')
    except ValueError as e:
        emit('message', f'Error: {e}')

if __name__ == '__main__':
    #デバッグモードでFlaskアプリケーションを起動
    socketio.run(app, debug=True)