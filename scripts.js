let searchInput = document.getElementById('searchInput');
let clearButton = document.getElementById('clearButton');
let voiceButton = document.getElementById('voiceButton');
let searchButton = document.getElementById('searchButton');
let locationToggle = document.getElementById('locationToggle');
let radiusInput = document.getElementById('radiusInput');
let searchResults = document.getElementById('searchResults');

let userLocation = null;

// Clear search input
clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
});

// Placeholder for voice search functionality
voiceButton.addEventListener('click', () => {
    alert('Voice search activated (implement actual functionality)');
});

// Handle search button click
searchButton.addEventListener('click', () => {
    let query = searchInput.value;
    let pattern = /^[A-Za-z]{2}-\d{4}$/;
    if (pattern.test(query)) {
        if (locationToggle.checked && userLocation) {
            filterResultsByLocation(query, userLocation, parseInt(radiusInput.value));
        } else {
            displayResults([`Results for "${query}"`]);
        }
    } else {
        alert('Please enter a valid search query (e.g., AB-1234)');
    }
});

// Get user location if location filtering is enabled
locationToggle.addEventListener('change', () => {
    if (locationToggle.checked) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                console.log('User location:', userLocation);
            },
            (error) => {
                console.error('Error getting location:', error);
                locationToggle.checked = false;
                alert('Unable to get location. Please try again.');
            }
        );
    }
});

// Function to display results
function displayResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
        let resultItem = document.createElement('div');
        resultItem.textContent = result;
        resultItem.addEventListener('click', () => {
            searchInput.value = result;
            searchResults.innerHTML = '';
        });
        searchResults.appendChild(resultItem);
    });
}

// Function to filter results by location
function filterResultsByLocation(query, location, radius) {
    // Placeholder for filtering logic
    // Implement actual API call and filtering logic here
    let filteredResults = [
        `Filtered result for "${query}" within ${radius} km`
    ];
    displayResults(filteredResults);
}

// Example for instant search results as the user types
searchInput.addEventListener('input', () => {
    let value = searchInput.value.toLowerCase();
    searchResults.innerHTML = '';
    if (value) {
        let results = ['Example Result 1', 'Example Result 2', 'Example Result 3'];
        results.forEach(result => {
            let resultItem = document.createElement('div');
            resultItem.textContent = result;
            resultItem.addEventListener('click', () => {
                searchInput.value = result;
                searchResults.innerHTML = '';
            });
            searchResults.appendChild(resultItem);
        });
    }
});
