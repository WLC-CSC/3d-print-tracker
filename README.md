# 3d-print-tracker
Application to track user prints and costs. 

## Running the backend
### First Run
- Verify python is installed
- Navigate inside the backend folder
- Run `pip install -r requirements.txt` in the terminal
### Every Run
- Navigate inside the backend folder
- Run `bash run.sh`
- To ensure that the api is running, make a get request to http://127.0.0.1:5000/
    - If the api is running, it will return "Hello World"