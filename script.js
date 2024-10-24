// Ajoute un écouteur d'événements au bouton "Obtenir la météo"
document.getElementById('getWeather').addEventListener('click', function() {
    // Récupère le nom de la ville à partir de l'input
    const city = document.getElementById('city').value;
    // Définir la clé API pour accéder aux données météorologiques
    const apiKey = '111d3925a25791cc8fd2d6a68447328d'; // Remplacez par votre clé API
    // Crée l'URL de la requête API avec la ville et la clé API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Affiche un message de chargement pendant que les données sont récupérées
    document.getElementById('weatherInfo').innerHTML = '<p>Chargement...</p>'; // Message de chargement

    // Effectue une requête fetch pour obtenir les données météo
    fetch(url)
        .then(response => {
            // Vérifie si la réponse est correcte
            if (!response.ok) {
                // Gestion des erreurs basées sur le code d'état de la réponse
                switch (response.status) {
                    case 404:
                        // Erreur si la ville n'est pas trouvée
                        throw new Error('Ville non trouvée');
                    case 401:
                        // Erreur si la clé API est invalide
                        throw new Error('Clé API invalide');
                    default:
                        // Erreur générique pour d'autres problèmes de réseau
                        throw new Error('Erreur réseau : ' + response.status);
                }
            }
            // Retourne la réponse au format JSON si tout est ok
            return response.json();
        })
        .then(data => {
            // Crée une chaîne HTML avec les informations météorologiques reçues
            const weatherInfo = `
                <h2>${data.name}</h2>
                <p>Température : ${data.main.temp} °C</p>
                <p>${data.weather[0].description}</p>
            `;
            // Met à jour le contenu de l'élément weatherInfo avec les données météorologiques
            document.getElementById('weatherInfo').innerHTML = weatherInfo;
        })
        .catch(error => {
            // Affiche un message d'erreur si quelque chose a échoué
            document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
            // Affiche l'erreur dans la console pour le débogage
            console.error(error);
        });
});
