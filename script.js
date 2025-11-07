// Admin credentials
const ADMIN_CREDENTIALS = {
    email: 'intercollage@bazpur.com',
    password: 'Icbazpur1100'
};

// Initialize books from localStorage or use default
let books = JSON.parse(localStorage.getItem('libraryBooks')) || [
    // Class 6 NCERT Books
    {
        id: 1,
        title: 'गणित - कक्षा 6',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 6 with comprehensive explanations',
        cover: ''
    },
    {
        id: 2,
        title: 'विज्ञान - कक्षा 6',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 6 covering Physics, Chemistry and Biology',
        cover: ''
    },
    {
        id: 3,
        title: 'सामाजिक विज्ञान - कक्षा 6',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science textbook for Class 6 - History, Geography, Civics',
        cover: ''
    },
    {
        id: 4,
        title: 'हिंदी - वसंत भाग 1',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Vasant Part 1 for Class 6',
        cover: ''
    },
    {
        id: 5,
        title: 'English - Honeysuckle',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Honeysuckle for Class 6',
        cover: ''
    },
    
    // Class 7 NCERT Books
    {
        id: 6,
        title: 'गणित - कक्षा 7',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 7',
        cover: ''
    },
    {
        id: 7,
        title: 'विज्ञान - कक्षा 7',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 7',
        cover: ''
    },
    {
        id: 8,
        title: 'सामाजिक विज्ञान - कक्षा 7',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science textbook for Class 7',
        cover: ''
    },
    {
        id: 9,
        title: 'हिंदी - वसंत भाग 2',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Vasant Part 2 for Class 7',
        cover: ''
    },
    {
        id: 10,
        title: 'English - Honeycomb',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Honeycomb for Class 7',
        cover: ''
    },
    
    // Class 8 NCERT Books
    {
        id: 11,
        title: 'गणित - कक्षा 8',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 8',
        cover: ''
    },
    {
        id: 12,
        title: 'विज्ञान - कक्षा 8',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 8',
        cover: ''
    },
    {
        id: 13,
        title: 'सामाजिक विज्ञान - कक्षा 8',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science textbook for Class 8',
        cover: ''
    },
    {
        id: 14,
        title: 'हिंदी - वसंत भाग 3',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Vasant Part 3 for Class 8',
        cover: ''
    },
    {
        id: 15,
        title: 'English - Honeydew',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Honeydew for Class 8',
        cover: ''
    },
    
    // Class 9 NCERT Books
    {
        id: 16,
        title: 'गणित - कक्षा 9',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 9',
        cover: ''
    },
    {
        id: 17,
        title: 'विज्ञान - कक्षा 9',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 9',
        cover: ''
    },
    {
        id: 18,
        title: 'सामाजिक विज्ञान - कक्षा 9',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science - India and Contemporary World for Class 9',
        cover: ''
    },
    {
        id: 19,
        title: 'हिंदी - क्षितिज भाग 1',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Kshitij Part 1 for Class 9',
        cover: ''
    },
    {
        id: 20,
        title: 'English - Beehive',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Beehive for Class 9',
        cover: ''
    },
    
    // Class 10 NCERT Books
    {
        id: 21,
        title: 'गणित - कक्षा 10',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 10',
        cover: ''
    },
    {
        id: 22,
        title: 'विज्ञान - कक्षा 10',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 10',
        cover: ''
    },
    {
        id: 23,
        title: 'सामाजिक विज्ञान - कक्षा 10',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science - India and Contemporary World II for Class 10',
        cover: ''
    },
    {
        id: 24,
        title: 'हिंदी - क्षितिज भाग 2',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Kshitij Part 2 for Class 10',
        cover: ''
    },
    {
        id: 25,
        title: 'English - First Flight',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook First Flight for Class 10',
        cover: ''
    },
    
    // Class 11 NCERT Books
    {
        id: 26,
        title: 'गणित - कक्षा 11',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 11',
        cover: ''
    },
    {
        id: 27,
        title: 'भौतिक विज्ञान - कक्षा 11',
        author: 'NCERT',
        category: 'Physics',
        year: 2024,
        description: 'NCERT Physics textbook for Class 11',
        cover: ''
    },
    {
        id: 28,
        title: 'रसायन विज्ञान - कक्षा 11',
        author: 'NCERT',
        category: 'Chemistry',
        year: 2024,
        description: 'NCERT Chemistry textbook for Class 11',
        cover: ''
    },
    {
        id: 29,
        title: 'जीव विज्ञान - कक्षा 11',
        author: 'NCERT',
        category: 'Biology',
        year: 2024,
        description: 'NCERT Biology textbook for Class 11',
        cover: ''
    },
    {
        id: 30,
        title: 'इतिहास - विश्व इतिहास के कुछ विषय',
        author: 'NCERT',
        category: 'History',
        year: 2024,
        description: 'NCERT History textbook for Class 11',
        cover: ''
    },
    {
        id: 31,
        title: 'भूगोल - भौतिक भूगोल के मूल सिद्धांत',
        author: 'NCERT',
        category: 'Geography',
        year: 2024,
        description: 'NCERT Geography textbook for Class 11',
        cover: ''
    },
    {
        id: 32,
        title: 'अर्थशास्त्र - कक्षा 11',
        author: 'NCERT',
        category: 'Economics',
        year: 2024,
        description: 'NCERT Economics textbook for Class 11',
        cover: ''
    },
    {
        id: 33,
        title: 'लेखाशास्त्र - कक्षा 11',
        author: 'NCERT',
        category: 'Accountancy',
        year: 2024,
        description: 'NCERT Accountancy textbook for Class 11',
        cover: ''
    },
    {
        id: 34,
        title: 'व्यवसाय अध्ययन - कक्षा 11',
        author: 'NCERT',
        category: 'Business Studies',
        year: 2024,
        description: 'NCERT Business Studies textbook for Class 11',
        cover: ''
    },
    {
        id: 35,
        title: 'हिंदी - आरोह भाग 1',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Aroh Part 1 for Class 11',
        cover: ''
    },
    {
        id: 36,
        title: 'English - Hornbill',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Hornbill for Class 11',
        cover: ''
    },
    
    // Class 12 NCERT Books
    {
        id: 37,
        title: 'गणित - कक्षा 12',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 12',
        cover: ''
    },
    {
        id: 38,
        title: 'भौतिक विज्ञान - कक्षा 12',
        author: 'NCERT',
        category: 'Physics',
        year: 2024,
        description: 'NCERT Physics textbook for Class 12',
        cover: ''
    },
    {
        id: 39,
        title: 'रसायन विज्ञान - कक्षा 12',
        author: 'NCERT',
        category: 'Chemistry',
        year: 2024,
        description: 'NCERT Chemistry textbook for Class 12',
        cover: ''
    },
    {
        id: 40,
        title: 'जीव विज्ञान - कक्षा 12',
        author: 'NCERT',
        category: 'Biology',
        year: 2024,
        description: 'NCERT Biology textbook for Class 12',
        cover: ''
    },
    {
        id: 41,
        title: 'इतिहास - भारतीय इतिहास के कुछ विषय भाग 3',
        author: 'NCERT',
        category: 'History',
        year: 2024,
        description: 'NCERT History textbook for Class 12',
        cover: ''
    },
    {
        id: 42,
        title: 'भूगोल - मानव भूगोल के मूल सिद्धांत',
        author: 'NCERT',
        category: 'Geography',
        year: 2024,
        description: 'NCERT Geography textbook for Class 12',
        cover: ''
    },
    {
        id: 43,
        title: 'अर्थशास्त्र - कक्षा 12',
        author: 'NCERT',
        category: 'Economics',
        year: 2024,
        description: 'NCERT Economics textbook for Class 12',
        cover: ''
    },
    {
        id: 44,
        title: 'लेखाशास्त्र - कक्षा 12',
        author: 'NCERT',
        category: 'Accountancy',
        year: 2024,
        description: 'NCERT Accountancy textbook for Class 12',
        cover: ''
    },
    {
        id: 45,
        title: 'व्यवसाय अध्ययन - कक्षा 12',
        author: 'NCERT',
        category: 'Business Studies',
        year: 2024,
        description: 'NCERT Business Studies textbook for Class 12',
        cover: ''
    },
    {
        id: 46,
        title: 'राजनीति विज्ञान - समकालीन विश्व राजनीति',
        author: 'NCERT',
        category: 'Political Science',
        year: 2024,
        description: 'NCERT Political Science textbook for Class 12',
        cover: ''
    },
    {
        id: 47,
        title: 'समाजशास्त्र - भारतीय समाज',
        author: 'NCERT',
        category: 'Sociology',
        year: 2024,
        description: 'NCERT Sociology textbook for Class 12',
        cover: ''
    },
    {
        id: 48,
        title: 'मनोविज्ञान - कक्षा 12',
        author: 'NCERT',
        category: 'Psychology',
        year: 2024,
        description: 'NCERT Psychology textbook for Class 12',
        cover: ''
    },
    {
        id: 49,
        title: 'हिंदी - आरोह भाग 2',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Aroh Part 2 for Class 12',
        cover: ''
    },
    {
        id: 50,
        title: 'English - Flamingo',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Flamingo for Class 12',
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
