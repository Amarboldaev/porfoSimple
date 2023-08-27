import requests

# Define the URL you want to send the POST request to
url = "https://bodyguard.avast.com/v1/web/email/one-time-check"

# Data to send with the POST request (in this case, a JSON payload)
data = {"email": "amarbold.ar@gmail.com"}

# Send a POST request with JSON data
response = requests.post(url, json=data)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    print("POST request was successful!")
    print("Response content:")
    print(response.text)
else:
    print(f"POST request failed with status code {response.status_code}")
