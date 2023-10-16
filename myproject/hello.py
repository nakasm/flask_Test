from flask import Flask
from flask import render_template

app = Flask(__name__)
lists=[
    '1',
    '2',
    '3',
    '4',
    '5',
]

@app.route('/')
def hello_world():
    return render_template("hello.html",lists=lists)