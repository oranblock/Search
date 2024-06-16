let currentUser = null;

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
    } else {
        alert('Invalid login');
    }
});

// Hide admin container initially
document.querySelector('.admin-container').style.display = 'none';

const database = {
    data: [
        { code: "AB-1234", createdBy: "admin" },
        { code: "CD-5678", createdBy: "admin" },
        { code: "EF-9012", createdBy: "admin" }
    ],
    getAllData() {
        return this.data;
    },
    addData(newEntry) {
        this.data.push(newEntry);
    },
    updateData(oldCode, newCode) {
        const item = this.data.find(item => item.code === oldCode);
        if (item) {
            item.code = newCode;
        }
    }
};

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = results.map(item => `
        <div>
            ${item.code} ${item.createdBy !== 'admin' ? '<button onclick="editData(\'' + item.code + '\')">Edit</button>' : ''}
        </div>
    `).join('');
}

function filterData(query, filterRadius) {
    const allData = database.getAllData();
    return allData.filter(item => {
        let matchesQuery = item.code.includes(query);
        if (filterRadius) {
            matchesQuery = true;
        }
        return matchesQuery;
    });
}

function addData(code, createdBy) {
    database.addData({ code, createdBy });
    const query = document.getElementById('search-bar').value;
    const filterRadius = document.getElementById('filter-radius').checked;
    const results = filterData(query, filterRadius);
    displayResults(results);
}

function editData(code) {
    const newCode = prompt("Enter new code:", code);
    if (newCode) {
        database.updateData(code, newCode);
        const query = document.getElementById('search-bar').value;
        const filterRadius = document.getElementById('filter-radius').checked;
        const results = filterData(query, filterRadius);
        displayResults(results);
    }
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

document.querySelectorAll('.number-buttons button').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.textContent;
        const searchBar = document.getElementById('search-bar');
        if (value === "←") {
            searchBar.value = searchBar.value.slice(0, -1);
        } else if (value === "→") {
        } else {
            searchBar.value += value;
        }
        const query = searchBar.value;
        const filterRadius = document.getElementById('filter-radius').checked;
        const results = filterData(query, filterRadius);
        displayResults(results);
    });
});

document.querySelectorAll('.letter-buttons button').forEach(button => {
    button.addEventListener('click', function() {
        const letter = this.textContent;
        const searchBar = document.getElementById('search-bar');
        searchBar.value += letter;
        const query = searchBar.value;
        const filterRadius = document.getElementById('filter-radius').checked;
        const results = filterData(query, filterRadius);
        displayResults(results);
    });

    button.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const searchBar = document.getElementById('search-bar');
        const position = searchBar.value.indexOf(this.textContent);
        if (position !== -1) {
            searchBar.value = searchBar.value.substring(0, position) + searchBar.value.substring(position + 1);
            const query = searchBar.value;
            const filterRadius = document.getElementById('filter-radius').checked;
            const results = filterData(query, filterRadius);
            displayResults(results);
        }
    });
});

document.getElementById('add-data').addEventListener('click', function() {
    if (currentUser && currentUser.role === 'admin') {
        const newData = document.getElementById('new-data').value;
        if (newData) {
            addData(newData, 'admin');
            document.getElementById('new-data').value = '';
        }
    } else {
        alert('Only admins can add new data');
    }
});

const initialData = database.getAllData();
displayResults(initialData);
