// Initialize the map using Leaflet.js
const map = L.map('map').setView([51.505, -0.09], 13); // Default location: London

// Add OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Replace this with your actual TomTom API key
const apiKey = 'atYvZdpt604DUkZenGVIitJVMhbQifEG';

// Button to load traffic data
document.getElementById('loadTraffic').addEventListener('click', loadTrafficData);

// Function to load traffic data
async function loadTrafficData() {
    // Define the bounding box (area) you're interested in for traffic data
    const bbox = '-0.510375,51.286760,0.334015,51.691874'; // Example: Bounding box for London
    const apiUrl = `https://api.tomtom.com/traffic/services/4/incidentDetails.json?bbox=${bbox}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.incidents) {
            // Clear any previous markers from the map
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Display traffic incidents on the map
            data.incidents.forEach(incident => {
                const { latitude, longitude, description, severity } = incident;
                const incidentText = `${description} (Severity: ${severity})`;

                // Add a marker for each traffic incident
                const marker = L.marker([latitude, longitude]).addTo(map);
                marker.bindPopup(incidentText).openPopup();
            });

            // Display traffic data count in the UI
            document.getElementById('trafficDetails').innerHTML = `
                <p>Loaded ${data.incidents.length} traffic incidents.</p>
            `;
        } else {
            alert('No traffic data found.');
        }
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        alert('Unable to load traffic data. Please try again.');
    }
}


