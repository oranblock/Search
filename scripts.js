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
    } else {
        alert('Invalid login');
    }
});

// Hide admin container initially
document.querySelector('.admin-container').style.display = 'none';

document.getElementById('file-input').addEventListener('change', handleFile, false);

function handleFile(e) {
    const files = e.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        excelData = jsonData.slice(1).map(row => ({ code: row[0], createdBy: 'excel' }));
        displayResults(excelData);
    };
    reader.readAsArrayBuffer(file);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = results.map(item => `
        <div>
            ${item.code} ${item.createdBy !== 'admin' ? '<button onclick="editData(\'' + item.code + '\')">Edit</button>' : ''}
        </div>
    `).join('');
}

function filterData(query, filterRadius) {
    return excelData.filter(item => {
        let matchesQuery = item.code.includes(query);
        if (filterRadius) {
            matchesQuery = true;
        }
        return matchesQuery;
    });
}

function addData(code, createdBy) {
    excelData.push({ code, createdBy });
    const query = document.getElementById('search-bar').value;
    const filterRadius = document.getElementById('filter-radius').checked;
    const results = filterData(query, filterRadius);
    displayResults(results);
}

function editData(code) {
    const newCode = prompt("Enter new code:", code);
    if (newCode) {
        const item = excelData.find(item => item.code === code);
        if (item) {
            item.code = newCode;
            const query = document.getElementById('search-bar').value;
            const filterRadius = document.getElementById('filter-radius').checked;
            const results = filterData(query, filterRadius);
            displayResults(results);
        }
    }
}

document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value;
    if (/^[A-Z]{0,2}-\d{0,4}$/.test(query)) {  // Restrict to 2 letters, dash, and 4 numbers
        const filterRadius = document.getElementById('filter-radius').checked;
        const results = filterData(query, filterRadius);
        displayResults(results);
    } else {
        this.value = this.value.slice(0, -1);  // Prevent invalid input
    }
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
        } else if (value === "-") {
            if (/^[A-Z]{2}$/.test(searchBar.value) && !searchBar.value.includes('-')) {
                searchBar.value += value;
            }
        } else {
            if (/^[A-Z]{0,2}-\d{0,4}$/.test(searchBar.value + value)) {
                searchBar.value += value;
            }
        }
        const query = searchBar.value;
        const filterRadius = document.getElementById('filter-radius').checked;
        const results = filterData(query, filterRadius);
        displayResults(results);
    });
});

document.querySelectorAll('.letter-buttons button').forEach(button => {
    let timer;
    button.addEventListener('mousedown', function() {
        timer = setTimeout(() => {
            const searchBar = document.getElementById('search-bar');
            const position = searchBar.value.indexOf(this.textContent);
            if (position !== -1) {
                searchBar.value = searchBar.value.substring(0, position) + searchBar.value.substring(position + 1);
                const query = searchBar.value;
                const filterRadius = document.getElementById('filter-radius').checked;
                const results = filterData(query, filterRadius);
                displayResults(results);
            }
        }, 800); // Adjust the time for long press detection here (800 ms)
    });

    button.addEventListener('mouseup', function() {
        clearTimeout(timer);
    });

    button.addEventListener('mouseleave', function() {
        clearTimeout(timer);
    });

    button.addEventListener('click', function() {
        const letter = this.textContent;
        const searchBar = document.getElementById('search-bar');
        if (/^[A-Z]{0,2}$/.test(searchBar.value.split('-')[0] + letter)) {
            searchBar.value += letter;
        }
        const query = searchBar.value;
        const filterRadius = document.getElementById('filter-radius').checked;
        const results = filterData(query, filterRadius);
        displayResults(results);
    });
});

document.getElementById('add-data').addEventListener('click', function() {
    if (currentUser && currentUser.role === 'admin') {
        const newData = document.getElementById('new-data').value;
        if (/^[A-Z]{2}-\d{4}$/.test(newData)) {
            addData(newData, 'admin');
            document.getElementById('new-data').value = '';
        } else {
            alert('Invalid format. Use: AB-1234');
        }
    } else {
        alert('Only admins can add new data');
    }
});

const initialData = database.getAllData();
displayResults(initialData);
