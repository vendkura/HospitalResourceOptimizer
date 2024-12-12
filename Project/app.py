from flask import Flask, request, jsonify, render_template

import joblib
import pandas as pd


app = Flask(__name__, template_folder='templates', static_folder='static')
# Initialisation de l'application Flask
# app = Flask(__name__)

# Charger le modele enregistrer 
model = joblib.load("Project/models/linear_regression_model.pkl")
 
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame(data)
    prediction = model.predict(df)
    return jsonify({'predictions': prediction.tolist()})

@app.route('/historical', methods=['GET'])
def historical():
    # Load the dataset
    data = pd.read_csv("Project/cleaned_dataset_for_modeling.csv")

    # Group data by Admission Month and calculate average stay duration
    historical_data = data.groupby('ADMISSION_MONTH')['STAY_DURATION'].mean().reset_index()

    # Convert to JSON
    return jsonify(historical_data.to_dict(orient='records'))


if __name__ == "__main__":
    app.run(debug=True)