# Interview Template
Framework where you can practice various types of interview formats, including frontend programming, backend programming,
and leetcode style (data structures & algorithms) programming.

## Purpose
Many interviews these days vary by company. Some companies still conduct leetcode style interviews, while I observed that many companies have started asking candidates to do full-stack programming during interviews.
Using this repo, users can easily practice React framework, frontend API calls, backend API calls, and also data structure & algorithms. 

## Project Structure
```
interview-template/
├── README.md
├── frontend/
    └── src/                        # main folder to add .tsx files
        └── App.tsx
        └── assets/                 # static file, image, etc.
        └── components/             # shareable components
        └── features/               # specific feature to implement
├── backend/
    └── main.py                     # use this empty file for live DSA interviews (if needed)
    └── flask_server.py             # add APIs here for frontend to call backend
    └── api_practice.py             # use this to practice calling REST APIs from backend 
    └── requirements.txt
    └── resources/                  # folder to add static content for backend (e.g. mock API responses)
```

## Setup
    1. cd frontend
    2. npm create vite@latest frontend -- --template react-ts
    3. cd ../backend
    4. python3 -m venv .venv
    5. source .venv/bin/activate
    6. pip install -r requirements.txt

## Running Servers
    1. cd frontend
    2. npm run dev
    3. cd ../backend
    4. source .venv/bin/activate
    5. flask --app flask_server run
    