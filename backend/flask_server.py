from flask import Flask, request, jsonify
from flask_cors import CORS

from pathlib import Path
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.before_request
def before_request():
    headers = {'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
               'Access-Control-Allow-Headers': 'Content-Type'}
    if request.method.lower() == 'options':
        return jsonify(headers), 200

@app.route('/health')
def health():
    return 'health'

# TODO: implement function that would accurately fetch current # of data

@app.get('/observations/<int:observation_id>')
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
    
@app.post('/observations')
def create_observation():
    data = request.get_json()
    p = Path('./resources/')
    files = [entry.name for entry in p.iterdir() if entry.is_file() and 'observation' in entry.name]
    new_id = -1
    for file_nm in files:
        new_id = max(new_id, int(file_nm[-6]))
    new_id += 1
    
    output_path = f'./resources/observation_{str(new_id)}.json'
    with open(output_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    return jsonify(data), 200