// Admin credentials
const ADMIN_CREDENTIALS = {
    email: 'intercollage@bazpur.com',
    password: 'Icbazpur1100'
};

// Initialize books from localStorage or use default
let books = JSON.parse(localStorage.getItem('libraryBooks')) || [
    {
        id: 1,
        title: 'भारत का इतिहास',
        author: 'डॉ. राजेश कुमार',
        category: 'History',
        year: 2023,
        description: 'भारतीय इतिहास की व्यापक जानकारी',
        cover: ''
    },
    {
        id: 2,
        title: 'Physics Fundamentals',
        author: 'Dr. A.K. Singh',
        category: 'Science',
        year: 2024,
        description: 'Complete guide to physics for intermediate students',
        cover: ''
    },
    {
        id: 3,
        title: 'अंग्रेजी व्याकरण',
        author: 'प्रोफ. सुनीता वर्मा',
        category: 'Language',
        year: 2023,
        description: 'English grammar in Hindi for better understanding',
        cover: ''
    }
];

// Check if admin is logged in
let isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    if (isAdminLoggedIn) {
        showAdminDashboard();
    }
});

// Tab switching
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    if (tabName === 'student') {
        document.getElementById('student-section').classList.add('active');
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        displayBooks();
    } else if (tabName === 'admin') {
        document.getElementById('admin-section').classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        if (isAdminLoggedIn) {
            showAdminDashboard();
        }
    }
}

// Admin login
function adminLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const errorMsg = document.getElementById('loginError');

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        isAdminLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        errorMsg.textContent = '';
        showAdminDashboard();
    } else {
        errorMsg.textContent = 'Invalid email or password!';
    }
}

// Show admin dashboard
function showAdminDashboard() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    displayAdminBooks();
}

// Admin logout
function adminLogout() {
    isAdminLoggedIn = false;
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginError').textContent = '';
}

// Add new book
function addBook(event) {
    event.preventDefault();

    const newBook = {
        id: Date.now(),
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        category: document.getElementById('bookCategory').value,
        year: parseInt(document.getElementById('bookYear').value),
        description: document.getElementById('bookDescription').value,
        cover: document.getElementById('bookCover').value || ''
    };

    books.push(newBook);
    saveBooks();
    displayAdminBooks();
    displayBooks();
    
    // Reset form
    document.getElementById('addBookForm').reset();
    
    // Show success message
    alert('Book added successfully!');
}

// Delete book
function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(book => book.id !== bookId);
        saveBooks();
        displayAdminBooks();
        displayBooks();
    }
}

// Save books to localStorage
function saveBooks() {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
}

// Display books for students
function displayBooks(filteredBooks = null) {
    const booksList = document.getElementById('booksList');
    const booksToDisplay = filteredBooks || books;

    if (booksToDisplay.length === 0) {
        booksList.innerHTML = '<div class="no-books">No books available</div>';
        return;
    }

    booksList.innerHTML = booksToDisplay.map(book => `
        <div class="book-card">
            ${book.cover 
                ? `<img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.outerHTML='<div class=\\'book-cover\\'>📚</div>'">`
                : '<div class="book-cover">📚</div>'
            }
            <h3>${book.title}</h3>
            <p class="book-author">👤 ${book.author}</p>
            <span class="book-category">${book.category}</span>
            <p class="book-year">📅 ${book.year}</p>
            <p class="book-description">${book.description}</p>
        </div>
    `).join('');
}

// Display books for admin
function displayAdminBooks() {
    const adminBooksList = document.getElementById('adminBooksList');

    if (books.length === 0) {
        adminBooksList.innerHTML = '<div class="no-books">No books in library</div>';
        return;
    }

    adminBooksList.innerHTML = books.map(book => `
        <div class="admin-book-item">
            <div class="admin-book-info">
                <h4>${book.title}</h4>
                <p>Author: ${book.author} | Category: ${book.category} | Year: ${book.year}</p>
            </div>
            <button onclick="deleteBook(${book.id})" class="btn btn-danger">Delete</button>
        </div>
    `).join('');
}

// Search books
function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm)
    );

    displayBooks(filteredBooks);
}
