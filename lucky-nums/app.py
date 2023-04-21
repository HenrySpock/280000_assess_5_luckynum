import requests
import json 
import re
import hashlib
from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

app.config['ENV'] = 'development'
os.environ['FLASK_ENV'] = 'development'
os.environ['FLASK_DEBUG'] = '1'

@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.route('/api/get-lucky-num', methods=['POST'])
def get_lucky_number():
    data = request.get_json()
    name = data.get('name')
    year = data.get('year')
    email = data.get('email')
    color = data.get('color')

    # Check for required fields
    required_fields = ['email', 'name', 'year', 'color']
    errors = {}
    for field in required_fields:
        if not data.get(field):
            errors[field] = f"{field.capitalize()} is required"

    if errors:  
        return jsonify({'errors': errors}), 400
    
    email_hash = int(hashlib.sha256(email.encode('utf-8')).hexdigest(), 16) % 100
    print(email_hash)
    # Make request to numbersapi.com to get lucky number fact
    try:
        num_resp = requests.get(f'http://numbersapi.com/{str(email_hash)}/')
        num_fact = num_resp.text.strip()
        num = int(re.search(r'\d+', num_resp.url).group())
    except Exception as e:
        print(f"Exception occurred in lucky number request: {e}")
        num_fact = ''
        num = 0

    # Make request to numbersapi.com to get birth year fact
    try:
        year_resp = requests.get(f'http://numbersapi.com/{data["year"]}/year')
        year_fact = year_resp.text.strip()
    except Exception as e:
        print(f"Exception occurred in year fact request: {e}")
        year_fact = ''
    
    response = { 
        'name': name,
        'email': email,
        'year': year,
        'color': color,
        'fact': {
            'num': {
                'fact': num_fact,
                'num': num
            },
            'year': {
                'fact': year_fact,
                'year': year
            }
        }
    }

    return response

