let searchInput = document.getElementById('searchInput');
let clearButton = document.getElementById('clearButton');
let voiceButton = document.getElementById('voiceButton');
let searchButton = document.getElementById('searchButton');
let searchBar = document.getElementById('searchBar');
let searchResults = document.getElementById('searchResults');
let locationToggle = document.getElementById('locationToggle');
let radiusInput = document.getElementById('radiusInput');

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
    if (query) {
        if (locationToggle.checked && userLocation) {
            filterResultsByLocation(query, userLocation, parseInt(radiusInput.value));
        } else {
            displayResults([`Results for "${query}"`]);
        }
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

// Swipe gestures to clear input or access additional options
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

searchBar.addEventListener('touchstart', (event) => {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

searchBar.addEventListener('touchend', (event) => {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture() {
    if (touchendX < touchstartX) {
        searchInput.value = '';
    }
    if (touchendX > touchstartX) {
        alert('Accessing additional options');
    }
}

// Real-time search result display as the user types
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
