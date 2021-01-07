from flask import Flask, render_template, request, redirect
from datetime import datetime
import pandas as pd
import random
import platform
import constant

system = platform.system()

zam = ""

if system == "Linux":
    zam = constant.Constant["pathUnix"]
elif system == "Windows":
    zam =constant.Constant["relativePath"]
else: 
    print("zam oldsongui")

class Flashcard:
    def __init__(self):
        try:
            self.data = pd.read_csv(f"{zam}/data/words_to_learn.csv")
        except FileNotFoundError:
            self.original_data = pd.read_csv(f"{zam}/data/japanese_words.csv")
            self.to_learn = self.original_data.to_dict(orient="records")
        else:
            self.to_learn = self.data.to_dict(orient="records") 
    
    current_card = {}

    def next_card(self):
        self.current_card = random.choice(self.to_learn)
        return self.current_card


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
        # print("POST orj irlee")
        return redirect("/flashy")
    else:
        hello = Flashcard()
        crand_list = hello.next_card()
        # print(crand_list)
        return render_template("./flashcard.html", title = "Japanese" , word = crand_list["Japanese"], ran_color=random.choice(bgcolor), en_word = crand_list["English"], en_title="English")


if __name__ == ("__main__"):
    app.run()