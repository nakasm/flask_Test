from flask import Flask
from flask import render_template

app = Flask(__name__) 

lists=[
    '1',
    '2',
    '3',
    '4',
]

@app.route('/')
def index():
    return render_template("index.html")