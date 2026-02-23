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

@app.get('/observations')
def fetch_all_observations():
    try:
        with open('resources/cnt.txt', 'r') as file:
            content = file.read()
            cnt = int(content[0])
        res = []
        for observation_id in range(1, cnt + 1):
            file_name = 'observation_' + str(observation_id) + '.json'
            
            with open(f'resources/{file_name}', 'r') as file:
                data = json.load(file)
                res.append(data)
        return res, 200
    except Exception as e:
        print(f'error opening file from observations api: {e}')

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
    with open('resources/cnt.txt', 'r') as file:
        context = file.read()
        cnt = int(context)
    cnt += 1
    
    output_path = f'./resources/observation_{str(cnt)}.json'
    with open(output_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    # increment after write is successful
    with open('resources/cnt.txt', 'w') as file:
        context = str(cnt)
        file.write(context)
    return jsonify(data), 200