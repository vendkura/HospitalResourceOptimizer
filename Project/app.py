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

if __name__ == "__main__":
    app.run(debug=True)