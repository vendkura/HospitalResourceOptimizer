document.getElementById('predictionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Collecter les données du formulaire
    const data = [{
        AGE: parseFloat(document.getElementById('age').value),
        "TYPE OF ADMISSION-EMERGENCY/OPD": parseInt(document.getElementById('type').value),
        ADMISSION_MONTH: parseFloat(document.getElementById('month').value),
        ADMISSION_SEASON: parseInt(document.getElementById('season').value),
        GENDER: parseInt(document.getElementById('gender').value)
    }];

    // Envoyer une requête POST à l'API Flask
    const response = await fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // Traiter la réponse
    const result = await response.json();
    document.getElementById('result').innerText = `Predicted Stay Duration: ${result.predictions[0]} days`;
});
