from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import base64

app = Flask(__name__)
CORS(app) #Enable CORS for all routes

# Store submissions in case need to refer back to one
submitted_data = []

# Encode Alloy token and secret for Basic auth
TOKEN = "REPLACE_W_TOKEN"
SECRET = "REPLACE_W_SECRET"
token_secret = TOKEN + ":" + SECRET
base64_token_secret = base64.b64encode(token_secret.encode('utf-8')).decode('utf-8')

#Receive form data from frontend and return response to frontend
@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.json
    print(data)  # Log received data to the terminal
    submitted_data.append(data)  # Store the data

    # Alloy API endpoint
    url = "https://sandbox.alloy.co/v1/evaluations"

    headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Basic " + base64_token_secret
    }

    # Sending POST request to Alloy API with form data as payload
    try:
        response = requests.post(url, json=data, headers=headers)
        if response.status_code == 200: # We require fields on front end so that this state should never be reached
            external_data = response.json()
            print("External API Response:", external_data) # Log response to the terminal
            return jsonify({"message": "Data received but evaluation missing required inputs!", "external_data": external_data}), 200
        elif response.status_code == 201:
            external_data = response.json()
            print("External API Response:", external_data) # Log response to the terminal
            return jsonify({"message": "Data received successfully!", "external_data": external_data}), 201 
        else: # Would ultimately add additional handling for further error responses. Validation on front end should handle entirely though
            external_data = response.json()
            print("External API Error:", response.status_code)
            print("External API Response:", external_data)
            return jsonify({"message": "Data received but external API call failed.", "status_code": response.status_code}), 500
    except Exception as e:
        print("Error during external API call:", str(e))
        return jsonify({"message": "Error during external API call."}), 500

@app.route('/', methods=['GET'])
def display_data():
    return jsonify(submitted_data)  # Display logged form data as JSON at http://localhost:5000/

if __name__ == '__main__':
    app.run(debug=True)