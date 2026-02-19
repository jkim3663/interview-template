from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/health')
def health():
    return 'health'

@app.get('/observation/<int:observation_id>')
def fetch_observation(observation_id):
    try:
        file_name = 'observation_' + str(observation_id) + '.json'
        with open(f'resources/{file_name}', 'r') as file:
            data = json.load(file)
        return data, 200
    except FileNotFoundError as err:
        print(f'file not found with observation id: {observation_id}, exception: {err}')
        data = {
        'message': 'Resource not found',
        'status': 'BAD REQUEST'
        }
        return jsonify(data), 400
    except json.JSONDecodeError as err:
        print(f'error reading json file for observation id: {observation_id}, exception: {err}')
        data = {
        'message': 'JSON Decode Error',
        'status': 'INTERNAL SERVER ERROR'
        }
        return jsonify(data), 500