from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

# チャットボットの関数
def chat_bot_response(message):
    try:
        int_message = int(message)
        response = f'"{message}" は整数型'
    except ValueError:
        try:
            float_message = float(message)
            response = f'"{message}" は浮動小数点数型'
        except ValueError:
            response = f'"{message}" は文字列型'
    return response

# クライアントのブラウザがルートにアクセスするとindex()が呼び出される
@app.route('/')
# chat.htmlテンプレートを読み込み、webページを表示
def index():
    return render_template('chat.html')

# 'message' イベントが発生したときに呼び出される 
@socketio.on('message')
def handle_message(message):
    #emit関数でクライアントに応答メッセージを送信
    response = chat_bot_response(message)
    emit('message', response)

if __name__ == '__main__':
    #デバッグモードでFlaskアプリケーションを起動
    socketio.run(app, debug=True)