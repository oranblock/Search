let currentUser = null;
let excelData = [];

const users = [
    { username: 'admin', password: 'adminpass', role: 'admin' },
    { username: 'user', password: 'userpass', role: 'user' }
];

function login(username, password) {
    return users.find(user => user.username === username && user.password === password);
}

document.getElementById('login-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    currentUser = login(username, password);
    if (currentUser) {
        document.getElementById('user-role').textContent = `Logged in as ${currentUser.role}`;
        document.querySelector('.admin-container').style.display = currentUser.role === 'admin' ? 'block' : 'none';
        displayResults(excelData);
    } else {
        alert('Invalid login');
    }
});

document.querySelector('.admin-container').style.display = 'none';

function fetchData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            excelData = data;
            displayResults(excelData);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = results.map(item => `
        <div>
            Code: ${item.Code}
        </div>
    `).join('');
}

function filterData(query, filterRadius) {
    return excelData.filter(item => {
        let matchesQuery = item.Code.includes(query);
        if (filterRadius) {
            matchesQuery = true;
        }
        return matchesQuery;
    });
}

document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value;
    const filterRadius = document.getElementById('filter-radius').checked;
    const results = filterData(query, filterRadius);
    displayResults(results);
});

document.getElementById('filter-radius').addEventListener('change', function() {
    const query = document.getElementById('search-bar').value;
    const filterRadius = this.checked;
    const results = filterData(query, filterRadius);
    displayResults(results);
});

// Fetch and display data when the page loads
fetchData();
