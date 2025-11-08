// Global Variables
let currentUser = null;
let books = [];
let editingBookId = null;
let users = [
    { id: 1, name: 'Admin', email: 'admin@bazpur.edu', password: 'admin123', role: 'admin' },
    { id: 2, name: 'Student', email: 'student@bazpur.edu', password: 'student', role: 'student' }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Load books from localStorage or use default books
    const savedBooks = localStorage.getItem('libraryBooks');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
    } else {
        books = [
            {
                id: 1,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                year: '1925',
                genre: 'Fiction',
                rating: 5,
                description: 'A classic American novel about the Jazz Age',
                assignedTo: ['student', 'teacher']
            },
            {
                id: 2,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                year: '1960',
                genre: 'Fiction',
                rating: 5,
                description: 'A story of racial injustice and childhood innocence',
                assignedTo: ['student', 'teacher']
            },
            {
                id: 3,
                title: '1984',
                author: 'George Orwell',
                year: '1949',
                genre: 'Science Fiction',
                rating: 5,
                description: 'A dystopian social science fiction novel',
                assignedTo: ['student', 'teacher']
            },
            {
                id: 4,
                title: 'Pride and Prejudice',
                author: 'Jane Austen',
                year: '1813',
                genre: 'Romance',
                rating: 5,
                description: 'A romantic novel of manners',
                assignedTo: ['student', 'teacher']
            }
        ];
        // Save default books to localStorage
        saveBooksToStorage();
    }
    
    // Check if user is already logged in (after books are loaded)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showLibraryPage();
    }
    
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

// Storage Functions
function saveBooksToStorage() {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
}

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
    const formTitle = document.querySelector('#addBookForm .form-title span');
    const saveBtn = document.querySelector('#addBookForm .save-btn');
    
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        clearBookForm();
        editingBookId = null;
        formTitle.textContent = 'Add New Book';
        saveBtn.textContent = 'Book Save Karein';
    } else {
        form.style.display = 'none';
        editingBookId = null;
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
    document.getElementById('assignStudent').checked = true;
    document.getElementById('assignTeacher').checked = true;
}

function saveBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const year = document.getElementById('bookYear').value;
    const genre = document.getElementById('bookGenre').value;
    const rating = parseInt(document.getElementById('bookRating').value);
    const description = document.getElementById('bookDescription').value;
    
    // Get assigned roles
    const assignedTo = [];
    if (document.getElementById('assignStudent').checked) assignedTo.push('student');
    if (document.getElementById('assignTeacher').checked) assignedTo.push('teacher');
    
    if (!title || !author) {
        alert('Please fill in at least Title and Author!');
        return;
    }
    
    if (assignedTo.length === 0) {
        alert('Please assign book to at least one role!');
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
        addedBy: currentUser.name,
        assignedTo: assignedTo
    };
    
    if (editingBookId) {
        // Update existing book
        const bookIndex = books.findIndex(b => b.id === editingBookId);
        if (bookIndex !== -1) {
            books[bookIndex] = { ...books[bookIndex], ...newBook, id: editingBookId };
        }
        editingBookId = null;
    } else {
        // Add new book
        books.push(newBook);
    }
    
    saveBooksToStorage();
    displayBooks();
    toggleAddForm();
    clearBookForm();
}

function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(book => book.id !== bookId);
        saveBooksToStorage();
        displayBooks();
    }
}

function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    // Fill form with book data
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookYear').value = book.year || '';
    document.getElementById('bookGenre').value = book.genre || '';
    document.getElementById('bookRating').value = book.rating || 5;
    document.getElementById('bookDescription').value = book.description || '';
    
    // Set assigned roles
    document.getElementById('assignStudent').checked = book.assignedTo?.includes('student') || false;
    document.getElementById('assignTeacher').checked = book.assignedTo?.includes('teacher') || false;
    
    // Update form title and button
    const formTitle = document.querySelector('#addBookForm .form-title span');
    const saveBtn = document.querySelector('#addBookForm .save-btn');
    formTitle.textContent = 'Edit Book';
    saveBtn.textContent = 'Update Book';
    
    // Show form and set editing mode
    editingBookId = bookId;
    document.getElementById('addBookForm').style.display = 'block';
    lucide.createIcons();
    
    // Scroll to form
    document.getElementById('addBookForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateRating(bookId, newRating) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.rating = newRating;
        saveBooksToStorage();
        displayBooks();
    }
}

function displayBooks(searchQuery = '') {
    const grid = document.getElementById('booksGrid');
    document.getElementById('totalBooks').textContent = books.length;
    
    // Filter books based on search query and user role
    const filteredBooks = books.filter(book => {
        // Admin can see all books, other roles only see books assigned to them
        const isAssigned = currentUser.role === 'admin' || !book.assignedTo || book.assignedTo.includes(currentUser.role);
        if (!isAssigned) return false;
        
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
                    <div class="book-rating ${currentUser.role === 'admin' ? 'clickable-rating' : ''}">
                        ${currentUser.role === 'admin' ? 
                            Array(5).fill(0).map((_, index) => `
                                <i data-lucide="star" class="star-icon ${index < book.rating ? 'filled' : ''}" 
                                   onclick="updateRating(${book.id}, ${index + 1})"></i>
                            `).join('') :
                            Array(book.rating).fill('<i data-lucide="star" class="star-icon filled"></i>').join('')
                        }
                    </div>
                </div>
                ${currentUser.role === 'admin' ? `
                    <div class="admin-actions">
                        <button class="edit-btn" onclick="editBook(${book.id})">
                            <i data-lucide="edit"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteBook(${book.id})">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
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
            ${book.assignedTo && book.assignedTo.length > 0 ? `
                <div class="assigned-badges">
                    ${book.assignedTo.map(role => `
                        <span class="role-badge ${role}-badge">
                            ${role === 'student' ? '👨‍🎓 Students' : '👨‍🏫 Teachers'}
                        </span>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    lucide.createIcons();
}