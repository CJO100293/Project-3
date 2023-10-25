# Importing dependencies
import os
from flask import Flask, jsonify, render_template
from pymongo import MongoClient

# Setting Prefix
PREFIX = '/api/'

# Flask Setup
app = Flask(__name__)

# MongoDB Configuration
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client['AltFuels']

# Homepage List of Routes
@app.route("/")
def homepage():
# Displaying available routes
    return (
        "Available Routes:<br/>"
        "/map<br/>"
        "/api/endpoints<br/>"
    )

# Setting Up API Endpoints
@app.route(PREFIX + 'endpoints', methods=['GET'])
def endpoints():
    paths = [
        'ETL_E85_CA', 'ETL_E85_NY', 
        'ETL_E85_TX', 'ETL_ELEC_CA', 
        'ETL_ELEC_NY', 'ETL_ELEC_TX', 
        'ETL_LPG_CA', 'ETL_LPG_NY', 
        'ETL_LPG_TX', 'ETL_top3_alt_fuels', 
        'ETL_top3_alt_fuels_CA', 'ETL_top3_alt_fuels_NY', 
        'ETL_top3_alt_fuels_TX'
    ]
    endpoints = [PREFIX + p for p in paths]
    return jsonify(endpoints)

# Setting up API routes for each dataset in the database using the above endpoints
@app.route(PREFIX + 'ETL_E85_CA', methods=['GET'])
def etl_e85_ca():
    data = list(db['ETL_E85_CA'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_E85_NY', methods=['GET'])
def etl_e85_ny():
    data = list(db['ETL_E85_NY'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_E85_TX', methods=['GET'])
def etl_e85_tx():
    data = list(db['ETL_E85_TX'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_ELEC_CA', methods=['GET'])
def etl_elec_ca():
    data = list(db['ETL_ELEC_CA'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_ELEC_NY', methods=['GET'])
def etl_elec_ny():
    data = list(db['ETL_ELEC_NY'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_ELEC_TX', methods=['GET'])
def etl_elec_tx():
    data = list(db['ETL_ELEC_TX'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_LPG_CA', methods=['GET'])
def etl_lpg_ca():
    data = list(db['ETL_LPG_CA'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_LPG_NY', methods=['GET'])
def etl_lpg_ny():
    data = list(db['ETL_LPG_NY'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_LPG_TX', methods=['GET'])
def etl_lpg_tx():
    data = list(db['ETL_LPG_TX'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_top3_alt_fuels', methods=['GET'])
def etl_top3_alt_fuels():
    data = list(db['ETL_top3_alt_fuels'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_top3_alt_fuels_CA', methods=['GET'])
def etl_top3_alt_fuels_ca():
    data = list(db['ETL_top3_alt_fuels_CA'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_top3_alt_fuels_NY', methods=['GET'])
def etl_top3_alt_fuels_ny():
    data = list(db['ETL_top3_alt_fuels_NY'].find({}, {'_id': 0}))
    return jsonify(data)

@app.route(PREFIX + 'ETL_top3_alt_fuels_TX', methods=['GET'])
def etl_top3_alt_fuels_tx():
    data = list(db['ETL_top3_alt_fuels_TX'].find({}, {'_id': 0}))
    return jsonify(data)

# Serve the index.html file
@app.route('/map')
def index():
    return render_template('index.html')

# Allowing execution of code as script
if __name__ == '__main__':
    app.run(debug=True)