document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearButton');
    const voiceButton = document.getElementById('voiceButton');
    const searchButton = document.getElementById('searchButton');

    // Clear input text
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
    });

    // Voice search (placeholder functionality)
    voiceButton.addEventListener('click', () => {
        alert('Voice search activated (implement actual functionality)');
    });

    // Perform search (placeholder functionality)
    searchButton.addEventListener('click', () => {
        alert('Searching for: ' + searchInput.value);
    });
});
