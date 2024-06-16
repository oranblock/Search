let searchInput = document.getElementById('searchInput');
let clearButton = document.getElementById('clearButton');
let voiceButton = document.getElementById('voiceButton');
let searchButton = document.getElementById('searchButton');
let locationToggle = document.getElementById('locationToggle');
let radiusInput = document.getElementById('radiusInput');
let searchResults = document.getElementById('searchResults');

let userLocation = null;

// Function to initialize the search input
function initializeSearchInput() {
    const savedLetters = localStorage.getItem('searchLetters');
    if (savedLetters) {
        const letters = savedLetters.split('-');
        document.getElementById('letter1').textContent = letters[0];
        document.getElementById('letter2').textContent = letters[1];
    }
    updateSearchInput();
}

// Update search input based on letter buttons and dash
function updateSearchInput() {
    const letter1 = document.getElementById('letter1').textContent;
    const letter2 = document.getElementById('letter2').textContent;
    const numbers = searchInput.value.slice(3);
    searchInput.value = `${letter1}${letter2}-${numbers}`;
}

// Clear search input
clearButton.addEventListener('click', () => {
    searchInput.value = '';
    updateSearchInput();
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

// Event listeners for touch keyboard buttons
document.querySelectorAll('.letter-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Long press to edit the letter');
    });

    button.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const newLetter = prompt('Enter a letter:', button.textContent);
        if (newLetter && /^[A-Za-z]$/.test(newLetter)) {
            button.textContent = newLetter.toUpperCase();
            const letter1 = document.getElementById('letter1').textContent;
            const letter2 = document.getElementById('letter2').textContent;
            localStorage.setItem('searchLetters', `${letter1}-${letter2}`);
            updateSearchInput();
        }
    });
});

document.querySelectorAll('.number-button').forEach(button => {
    button.addEventListener('click', () => {
        const currentInput = searchInput.value.replace(/[^\d]/g, '');
        if (currentInput.length < 4) {
            searchInput.value += button.textContent;
            updateSearchInput();
        }
    });
});

// Event listeners for arrow buttons
document.getElementById('leftArrow').addEventListener('click', () => {
    const currentInput = searchInput.value.replace(/[^\d]/g, '');
    if (currentInput.length > 0) {
        searchInput.value = searchInput.value.slice(0, -1);
        updateSearchInput();
    }
});

document.getElementById('rightArrow').addEventListener('click', () => {
    alert('Right arrow button pressed (Implement functionality if needed)');
});

// Initialize the search input on load
initializeSearchInput();
