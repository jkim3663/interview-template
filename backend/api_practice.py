'''
This is practice class for calling other APIs from backend.
'''
import requests

class TestClass:

    def __init__(self):
        self.url = 'http://127.0.0.1:5000/observation/'
    
    def call_get_api(self, id):
        url = self.url + str(id)
        response = requests.get(url)
        print(url)
        if response.ok:
            data = response.json()
            print(f'api call data: {data}')
        else:
            data = response.json()
            print(f'unexpected response: {data}')

test_class = TestClass()
test_class.call_get_api(1)