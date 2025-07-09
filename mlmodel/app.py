from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'disease_model.pkl')
model = joblib.load(MODEL_PATH)

# Mapping
disease_mapping = {
    0: 'Fungal infection', 1: 'Allergy', 2: 'GERD', 3: 'Chronic cholestasis', 4: 'Drug Reaction',
    5: 'Peptic ulcer disease', 6: 'AIDS', 7: 'Diabetes', 8: 'Gastroenteritis', 9: 'Bronchial Asthma',
    10: 'Hypertension', 11: 'Migraine', 12: 'Cervical spondylosis', 13: 'Paralysis (brain hemorrhage)',
    14: 'Jaundice', 15: 'Malaria', 16: 'Chicken pox', 17: 'Dengue', 18: 'Typhoid', 19: 'Hepatitis A',
    20: 'Hepatitis B', 21: 'Hepatitis C', 22: 'Hepatitis D', 23: 'Hepatitis E', 24: 'Alcoholic hepatitis',
    25: 'Tuberculosis', 26: 'Common Cold', 27: 'Pneumonia', 28: 'Dimorphic hemorrhoids (piles)',
    29: 'Heart attack', 30: 'Varicose veins', 31: 'Hypothyroidism', 32: 'Hyperthyroidism',
    33: 'Hypoglycemia', 34: 'Osteoarthrosis', 35: 'Arthritis',
    36: '(Vertigo) Paroxysmal Positional Vertigo', 37: 'Acne', 38: 'Urinary tract infection',
    39: 'Psoriasis', 40: 'Impetigo'
}

feature_names = [
    'itching', 'continuous_sneezing', 'joint_pain', 'stomach_pain',
    'acidity', 'ulcers_on_tongue', 'anxiety', 'irregular_sugar_level',
    'cough', 'dehydration', 'headache', 'yellowish_skin', 'dark_urine',
    'nausea', 'pain_behind_the_eyes', 'diarrhoea', 'mild_fever',
    'blurred_and_distorted_vision', 'redness_of_eyes', 'runny_nose',
    'chest_pain', 'fast_heart_rate', 'bloody_stool', 'cramps',
    'obesity', 'enlarged_thyroid', 'red_spots_over_body',
    'abnormal_menstruation', 'receiving_blood_transfusion',
    'receiving_unsterile_injections', 'history_of_alcohol_consumption'
]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    if not data or 'symptoms' not in data:
        return jsonify({'error': 'Symptoms not provided'}), 400

    input_vector = [1 if symptom in data['symptoms'] else 0 for symptom in feature_names]
    prediction = model.predict(np.array(input_vector).reshape(1, -1))[0]
    predicted_disease = disease_mapping.get(prediction, "Unknown Disease")
    
    return jsonify({'disease': predicted_disease})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)

