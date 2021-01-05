from flask import Flask, render_template, request, redirect
from datetime import datetime
import pandas as pd
import flashy
import random


app = Flask(__name__)

bgcolor = ["red","blue","silver","green","yellow"]

@app.context_processor
def inject_now():
    return {'now': datetime.utcnow()}

@app.route('/')
def main():
    return render_template("./index.html")

@app.route('/flashy', methods=["POST", "GET"])
def Flashy():
    if request.method == "POST":
        print("POST orj irlee")
        return redirect("/flashy")
    else:
        hello = flashy.Flashcard()
        crand_list = hello.next_card()
        print(crand_list)
        return render_template("./flashcard.html", title = "Japanese" , word = crand_list["Japanese"], ran_color=random.choice(bgcolor), en_word = crand_list["English"], en_title="English")


if __name__ == ("__main__"):
    app.run()