import pandas as pd
import random

class Flashcard:
    def __init__(self):
        try:
            self.data = pd.read_csv("./data/words_to_learn.csv")
        except FileNotFoundError:
            self.original_data = pd.read_csv("./data/japanese_words.csv")
            self.to_learn = self.original_data.to_dict(orient="records")
        else:
            self.to_learn = self.data.to_dict(orient="records") 
    
    current_card = {}

    def next_card(self):
        self.current_card = random.choice(self.to_learn)
        return self.current_card
