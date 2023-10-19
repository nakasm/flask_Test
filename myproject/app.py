from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('chat.html')

@socketio.on('message')
def display_message_length(message): # メッセージの文字列長を表示する関数
    try:
        length = len(message)  
        emit('message', f'You sent: {message}')
        emit('message', f'Message Length: {length}')
    except ValueError as e:
        emit('message', f'Error: {e}')

if __name__ == '__main__':
    socketio.run(app, debug=True)