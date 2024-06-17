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
    resultsContainer.innerHTML = results.map((item, index) => `
        <div>
            ${currentUser.role === 'admin' ? 
                `Well No: <input type="text" value="${item['well no']}" onchange="editValue(${index}, 'well no', this.value)">
                Allowable Pressure: <input type="number" value="${item['alloweable']}" onchange="editValue(${index}, 'alloweable', this.value)">`
            : 
                `Well No: ${item['well no']} Allowable Pressure: ${item['alloweable']}`
            }
            Flow: <input type="number" value="${item['flow']}" onchange="editValue(${index}, 'flow', this.value)">
            Pressure: <input type="number" value="${item['pressure ']}" onchange="editValue(${index}, 'pressure ', this.value)">
        </div>
    `).join('');
}

function editValue(index, field, value) {
    excelData[index][field] = value;
    displayResults(excelData);
}

document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value;
    const filterRadius = document.getElementById('filter-radius').checked;
    const results = excelData.filter(item => item['well no'].includes(query));
    displayResults(results);
});

document.getElementById('filter-radius').addEventListener('change', function() {
    const query = document.getElementById('search-bar').value;
    const filterRadius = this.checked;
    const results = excelData.filter(item => item['well no'].includes(query));
    displayResults(results);
});

// Fetch and display data when the page loads
fetchData();
