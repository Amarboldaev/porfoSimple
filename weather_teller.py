import requests
import pprint
from twilio.rest import Client
from twilio.http.http_client import TwilioHttpClient
import os



# account_sid = os.environ['TWILIO_ACCOUNT_SID']
# auth_token = os.environ['TWILIO_AUTH_TOKEN']
account_sid = os.environ.get("account_sid")
auth_token = os.environ.get("auth_token")

HOUR = 12
LATITUDE = 47.886398
LONGITUDE = 106.905746
API_KEY = os.environ.get("API_KEY")
URL = 'https://api.openweathermap.org/data/2.5/onecall'
# https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
# https://api.openweathermap.org/data/2.5/onecall?lat=47.886398&lon=106.905746&appid=9964a280622f3b53374b028916985d94
parameters = {
    'lat': LATITUDE,
    'lon': LONGITUDE,
    'appid': API_KEY
}
response = requests.get(f'{URL}', params=parameters)
response.raise_for_status()
weather_data = response.json()
weather_slice = weather_data['hourly'][:12]


# learn list slice [:12] [start:stop:step]
will_rain = False

for hour_data in weather_slice:
    condition_code = hour_data['weather'][0]['id']
    if condition_code < 700:
        # print('Bring an Umbrella')
        will_rain = True
        
if will_rain:
    proxy_client = TwilioHttpClient()
    proxy_client.session.proxies = {'https': os.environ['https_proxy']}
    client = Client(account_sid, auth_token, http_client=proxy_client) #, http_client=proxy_client
    message = client.messages \
                .create(
                     body="It's going to rain today. Remember to bring an ☂️",
                     from_='+12054195948',
                     to='+97699969419'
                 )
    print(message.status)
