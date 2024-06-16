let searchInput = document.getElementById('searchInput');
let clearButton = document.getElementById('clearButton');
let voiceButton = document.getElementById('voiceButton');
let searchButton = document.getElementById('searchButton');
let searchBar = document.getElementById('searchBar');
let searchResults = document.getElementById('searchResults');

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
});

voiceButton.addEventListener('click', () => {
    alert('Voice search activated (implement actual functionality)');
});

searchButton.addEventListener('click', () => {
    let query = searchInput.value;
    if (query) {
        searchResults.innerHTML = `<div>Results for "${query}"</div>`;
    }
});

// Implement swipe gestures
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
