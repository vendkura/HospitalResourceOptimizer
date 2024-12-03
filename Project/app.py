from flask import Flask, jsonify, request
import joblib
import pandas as pd

# Initialisation de l'application Flask
app = Flask(__name__)

# Charger le modele enregistrer 
model = joblib.load("Project/models/linear_regression_model.pkl")

# @app.route('/')
# def home():
#     return("Yoh my first Flask app")
# Definir une route pour la prediction des donnees a partir du modele charger plus haut
@app.route('/predict',methods=['POST'])

# Fonction pour la prediction
def prediction():
    try:
        # Recevoir les donnees sous forme de JSON
        data = request.get_json()

        # Convertir les donnees recu en dataframe pour pouvoir les utiliser et faire la visualisation si necessaire
        df = pd.DataFrame(data)

        # Predire les resultats en fonction des donnnees recues
        predictions = model.predict(df)

        # Retourner les predictions 
        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)