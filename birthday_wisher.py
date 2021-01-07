import pandas as pd
import random 
import datetime as dt
import smtplib

today = dt.datetime.now()
my_email = "fortecter@gmail.com"
my_password = "Quantum123#"

data = pd.read_csv("./static/data/birthdays.csv")
exact_month = data[data["month"] == today.month]
exact_day = exact_month[exact_month["day"] == today.day]

for index, row in exact_day.iterrows():
    to_mail = row["email"]
    to_name = row["name"]
    with open(f"./static/letter_templates/letter_{random.randint(1, 3)}.txt", mode="r") as file:
        line = file.read()
        replaced = line.replace("[NAME]", str(to_name))
        with smtplib.SMTP("smtp.gmail.com",port=587) as connection:
            connection.starttls()
            connection.login(my_email,my_password)
            connection.sendmail(to_addrs=to_mail, from_addr=my_email, msg="Subject:Happy Birthday\n\n"+replaced)