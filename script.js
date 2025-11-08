// Global Variables
let currentUser = null;
let books = [];
let users = [
    { id: 1, name: 'Admin', email: 'admin@bazpur.edu', password: 'admin123', role: 'admin' },
    { id: 2, name: 'Student', email: 'student@bazpur.edu', password: 'student', role: 'student' }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showLibraryPage();
    }
    
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Load sample books
    books = [
        {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            year: '1925',
            genre: 'Fiction',
            rating: 5,
            description: 'A classic American novel about the Jazz Age'
        },
        {
            id: 2,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            year: '1960',
            genre: 'Fiction',
            rating: 5,
            description: 'A story of racial injustice and childhood innocence'
        },
        {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            year: '1949',
            genre: 'Science Fiction',
            rating: 5,
            description: 'A dystopian social science fiction novel'
        },
        {
            id: 4,
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            year: '1813',
            genre: 'Romance',
            rating: 5,
            description: 'A romantic novel of manners'
        }
    ];
    
    // Add search functionality
    document.getElementById('searchInput').addEventListener('input', function(e) {
        displayBooks(e.target.value);
    });
    
    // Add Enter key support for admin login
    document.getElementById('adminPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adminLogin();
        }
    });
    
    // Add Enter key support for teacher login
    document.getElementById('teacherPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            teacherLogin();
        }
    });
});

// Login Credentials
const TEACHER_CREDENTIALS = {
    email: 'teacher@bazpur.edu',
    password: 'teacher123'
};

// Login Functions
function studentLogin() {
    const student = users.find(u => u.role === 'student');
    currentUser = student;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showLibraryPage();
}

function showAdminForm() {
    document.getElementById('loginOptions').style.display = 'none';
    document.getElementById('adminLoginForm').style.display = 'block';
    lucide.createIcons();
}

function showTeacherForm() {
    document.getElementById('loginOptions').style.display = 'none';
    document.getElementById('teacherLoginForm').style.display = 'block';
    lucide.createIcons();
}

function backToOptions() {
    document.getElementById('adminLoginForm').style.display = 'none';
    document.getElementById('teacherLoginForm').style.display = 'none';
    document.getElementById('loginOptions').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('teacherErrorMessage').style.display = 'none';
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPassword').value = '';
    document.getElementById('teacherEmail').value = '';
    document.getElementById('teacherPassword').value = '';
    lucide.createIcons();
}

function adminLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('errorMessage');
    
    const user = users.find(u => u.email === email && u.password === password && u.role === 'admin');
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        errorDiv.style.display = 'none';
        showLibraryPage();
    } else {
        errorDiv.textContent = 'Invalid admin credentials!';
        errorDiv.style.display = 'block';
    }
}

function teacherLogin() {
    const email = document.getElementById('teacherEmail').value;
    const password = document.getElementById('teacherPassword').value;
    const errorDiv = document.getElementById('teacherErrorMessage');
    
    if (email === TEACHER_CREDENTIALS.email && password === TEACHER_CREDENTIALS.password) {
        currentUser = { id: 3, name: 'Teacher', email: email, role: 'teacher' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        errorDiv.style.display = 'none';
        showLibraryPage();
    } else {
        errorDiv.textContent = 'Invalid teacher credentials!';
        errorDiv.style.display = 'block';
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('adminPassword');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
}

function toggleTeacherPassword() {
    const passwordInput = document.getElementById('teacherPassword');
    const eyeIcon = document.getElementById('teacherEyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
}

function showLibraryPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('libraryPage').style.display = 'block';
    
    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    
    // Show add button only for admin
    if (currentUser.role === 'admin') {
        document.getElementById('addBookBtn').style.display = 'flex';
    } else {
        document.getElementById('addBookBtn').style.display = 'none';
    }
    
    displayBooks();
    lucide.createIcons();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('libraryPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('searchInput').value = '';
    backToOptions();
}

// Book Management Functions
function toggleAddForm() {
    const form = document.getElementById('addBookForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        clearBookForm();
    } else {
        form.style.display = 'none';
    }
    lucide.createIcons();
}

function clearBookForm() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookYear').value = '';
    document.getElementById('bookGenre').value = '';
    document.getElementById('bookRating').value = '5';
    document.getElementById('bookDescription').value = '';
}

function saveBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const year = document.getElementById('bookYear').value;
    const genre = document.getElementById('bookGenre').value;
    const rating = parseInt(document.getElementById('bookRating').value);
    const description = document.getElementById('bookDescription').value;
    
    if (!title || !author) {
        alert('Please fill in at least Title and Author!');
        return;
    }
    
    const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        year: year,
        genre: genre,
        rating: rating,
        description: description,
        addedBy: currentUser.name
    };
    
    books.push(newBook);
    displayBooks();
    toggleAddForm();
    clearBookForm();
}

function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(book => book.id !== bookId);
        displayBooks();
    }
}

function displayBooks(searchQuery = '') {
    const grid = document.getElementById('booksGrid');
    document.getElementById('totalBooks').textContent = books.length;
    
    // Filter books based on search query
    const filteredBooks = books.filter(book => {
        const query = searchQuery.toLowerCase();
        return book.title.toLowerCase().includes(query) ||
               book.author.toLowerCase().includes(query) ||
               (book.genre && book.genre.toLowerCase().includes(query));
    });
    
    if (filteredBooks.length === 0) {
        grid.innerHTML = `
            <div class="no-books">
                <i data-lucide="book-open" class="no-books-icon"></i>
                <p class="no-books-text">Koi book nahi mili</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    grid.innerHTML = filteredBooks.map(book => `
        <div class="book-card">
            <div class="book-header">
                <div class="book-header-left">
                    <i data-lucide="book-open" class="book-icon"></i>
                    <div class="book-rating">
                        ${Array(book.rating).fill('<i data-lucide="star" class="star-icon"></i>').join('')}
                    </div>
                </div>
                ${currentUser.role === 'admin' ? `
                    <button class="delete-btn" onclick="deleteBook(${book.id})">
                        <i data-lucide="trash-2"></i>
                    </button>
                ` : ''}
            </div>
            <h3 class="book-title">${book.title}</h3>
            <div class="book-details">
                <div class="book-detail">
                    <i data-lucide="user"></i>
                    <span>${book.author}</span>
                </div>
                ${book.year ? `
                    <div class="book-detail">
                        <i data-lucide="calendar"></i>
                        <span>${book.year}</span>
                    </div>
                ` : ''}
                ${book.genre ? `<span class="book-genre">${book.genre}</span>` : ''}
            </div>
            ${book.description ? `<p class="book-description">${book.description}</p>` : ''}
        </div>
    `).join('');
    
    lucide.createIcons();
}