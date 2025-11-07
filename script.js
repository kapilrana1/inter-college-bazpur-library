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
        title: 'Mathematics - Class 6',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 6 with comprehensive explanations',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/femh1dd.zip'
    },
    {
        id: 2,
        title: 'Science - Class 6',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 6 covering Physics, Chemistry and Biology',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/fesc1dd.zip'
    },
    {
        id: 3,
        title: 'Social Science - Class 6',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science textbook for Class 6 - History, Geography, Civics',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/fess1dd.zip'
    },
    {
        id: 4,
        title: 'Hindi - Vasant Part 1',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Vasant Part 1 for Class 6',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/fehn1dd.zip'
    },
    {
        id: 5,
        title: 'English - Honeysuckle',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Honeysuckle for Class 6',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/feep1dd.zip'
    },
    
    // Class 7 NCERT Books
    {
        id: 6,
        title: 'Mathematics - Class 7',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 7',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/gemh1dd.zip'
    },
    {
        id: 7,
        title: 'Science - Class 7',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 7',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/gesc1dd.zip'
    },
    {
        id: 8,
        title: 'Social Science - Class 7',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science textbook for Class 7',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/gess1dd.zip'
    },
    {
        id: 9,
        title: 'Hindi - Vasant Part 2',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Vasant Part 2 for Class 7',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/gehn1dd.zip'
    },
    {
        id: 10,
        title: 'English - Honeycomb',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Honeycomb for Class 7',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/geep1dd.zip'
    },
    
    // Class 8 NCERT Books
    {
        id: 11,
        title: 'Mathematics - Class 8',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 8',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/hemh1dd.zip'
    },
    {
        id: 12,
        title: 'Science - Class 8',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 8',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/hesc1dd.zip'
    },
    {
        id: 13,
        title: 'Social Science - Class 8',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science textbook for Class 8',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/hess1dd.zip'
    },
    {
        id: 14,
        title: 'Hindi - Vasant Part 3',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Vasant Part 3 for Class 8',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/hehn1dd.zip'
    },
    {
        id: 15,
        title: 'English - Honeydew',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Honeydew for Class 8',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/heep1dd.zip'
    },
    
    // Class 9 NCERT Books
    {
        id: 16,
        title: 'Mathematics - Class 9',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 9',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iemh1dd.zip'
    },
    {
        id: 17,
        title: 'Science - Class 9',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 9',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iesc1dd.zip'
    },
    {
        id: 18,
        title: 'Social Science - Class 9',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science - India and Contemporary World for Class 9',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iess1dd.zip'
    },
    {
        id: 19,
        title: 'Hindi - Kshitij Part 1',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Kshitij Part 1 for Class 9',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iehn1dd.zip'
    },
    {
        id: 20,
        title: 'English - Beehive',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Beehive for Class 9',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/ieep1dd.zip'
    },
    
    // Class 10 NCERT Books
    {
        id: 21,
        title: 'Mathematics - Class 10',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 10',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh1dd.zip'
    },
    {
        id: 22,
        title: 'Science - Class 10',
        author: 'NCERT',
        category: 'Science',
        year: 2024,
        description: 'NCERT Science textbook for Class 10',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc1dd.zip'
    },
    {
        id: 23,
        title: 'Social Science - Class 10',
        author: 'NCERT',
        category: 'Social Science',
        year: 2024,
        description: 'NCERT Social Science - India and Contemporary World II for Class 10',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/jess1dd.zip'
    },
    {
        id: 24,
        title: 'Hindi - Kshitij Part 2',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Kshitij Part 2 for Class 10',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/jehn1dd.zip'
    },
    {
        id: 25,
        title: 'English - First Flight',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook First Flight for Class 10',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/jeep1dd.zip'
    },
    
    // Class 11 NCERT Books
    {
        id: 26,
        title: 'Mathematics - Class 11',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh1dd.zip'
    },
    {
        id: 27,
        title: 'Physics - Class 11',
        author: 'NCERT',
        category: 'Physics',
        year: 2024,
        description: 'NCERT Physics textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph1dd.zip'
    },
    {
        id: 28,
        title: 'Chemistry - Class 11',
        author: 'NCERT',
        category: 'Chemistry',
        year: 2024,
        description: 'NCERT Chemistry textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech1dd.zip'
    },
    {
        id: 29,
        title: 'Biology - Class 11',
        author: 'NCERT',
        category: 'Biology',
        year: 2024,
        description: 'NCERT Biology textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo1dd.zip'
    },
    {
        id: 30,
        title: 'History - Themes in World History',
        author: 'NCERT',
        category: 'History',
        year: 2024,
        description: 'NCERT History textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/kehs1dd.zip'
    },
    {
        id: 31,
        title: 'Geography - Fundamentals of Physical Geography',
        author: 'NCERT',
        category: 'Geography',
        year: 2024,
        description: 'NCERT Geography textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/kegy1dd.zip'
    },
    {
        id: 32,
        title: 'Economics - Class 11',
        author: 'NCERT',
        category: 'Economics',
        year: 2024,
        description: 'NCERT Economics textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/keec1dd.zip'
    },
    {
        id: 33,
        title: 'Accountancy - Class 11',
        author: 'NCERT',
        category: 'Accountancy',
        year: 2024,
        description: 'NCERT Accountancy textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/keac1dd.zip'
    },
    {
        id: 34,
        title: 'Business Studies - Class 11',
        author: 'NCERT',
        category: 'Business Studies',
        year: 2024,
        description: 'NCERT Business Studies textbook for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebs1dd.zip'
    },
    {
        id: 35,
        title: 'Hindi - Aroh Part 1',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Aroh Part 1 for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/kehn1dd.zip'
    },
    {
        id: 36,
        title: 'English - Hornbill',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Hornbill for Class 11',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/keeh1dd.zip'
    },
    
    // Class 12 NCERT Books
    {
        id: 37,
        title: 'Mathematics - Class 12',
        author: 'NCERT',
        category: 'Mathematics',
        year: 2024,
        description: 'NCERT Mathematics textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh1dd.zip'
    },
    {
        id: 38,
        title: 'Physics - Class 12',
        author: 'NCERT',
        category: 'Physics',
        year: 2024,
        description: 'NCERT Physics textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph1dd.zip'
    },
    {
        id: 39,
        title: 'Chemistry - Class 12',
        author: 'NCERT',
        category: 'Chemistry',
        year: 2024,
        description: 'NCERT Chemistry textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech1dd.zip'
    },
    {
        id: 40,
        title: 'Biology - Class 12',
        author: 'NCERT',
        category: 'Biology',
        year: 2024,
        description: 'NCERT Biology textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo1dd.zip'
    },
    {
        id: 41,
        title: 'History - Themes in Indian History Part 3',
        author: 'NCERT',
        category: 'History',
        year: 2024,
        description: 'NCERT History textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/lehs1dd.zip'
    },
    {
        id: 42,
        title: 'Geography - Fundamentals of Human Geography',
        author: 'NCERT',
        category: 'Geography',
        year: 2024,
        description: 'NCERT Geography textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/legy1dd.zip'
    },
    {
        id: 43,
        title: 'Economics - Class 12',
        author: 'NCERT',
        category: 'Economics',
        year: 2024,
        description: 'NCERT Economics textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/leec1dd.zip'
    },
    {
        id: 44,
        title: 'Accountancy - Class 12',
        author: 'NCERT',
        category: 'Accountancy',
        year: 2024,
        description: 'NCERT Accountancy textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/leac1dd.zip'
    },
    {
        id: 45,
        title: 'Business Studies - Class 12',
        author: 'NCERT',
        category: 'Business Studies',
        year: 2024,
        description: 'NCERT Business Studies textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebs1dd.zip'
    },
    {
        id: 46,
        title: 'Political Science - Contemporary World Politics',
        author: 'NCERT',
        category: 'Political Science',
        year: 2024,
        description: 'NCERT Political Science textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/leps1dd.zip'
    },
    {
        id: 47,
        title: 'Sociology - Indian Society',
        author: 'NCERT',
        category: 'Sociology',
        year: 2024,
        description: 'NCERT Sociology textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/lesy1dd.zip'
    },
    {
        id: 48,
        title: 'Psychology - Class 12',
        author: 'NCERT',
        category: 'Psychology',
        year: 2024,
        description: 'NCERT Psychology textbook for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/leps2dd.zip'
    },
    {
        id: 49,
        title: 'Hindi - Aroh Part 2',
        author: 'NCERT',
        category: 'Hindi',
        year: 2024,
        description: 'NCERT Hindi textbook Aroh Part 2 for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/lehn1dd.zip'
    },
    {
        id: 50,
        title: 'English - Flamingo',
        author: 'NCERT',
        category: 'English',
        year: 2024,
        description: 'NCERT English textbook Flamingo for Class 12',
        cover: '',
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/lefl1dd.zip'
    }
];

// Check if admin is logged in
let isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    populateCategoryFilter();
    displayBooks();
    if (isAdminLoggedIn) {
        showAdminDashboard();
    }
});

// Populate category filter dropdown
function populateCategoryFilter() {
    const categories = [...new Set(books.map(book => book.category))].sort();
    const categoryFilter = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter books by class, category, and search
function filterBooks() {
    const classFilter = document.getElementById('classFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredBooks = books;
    
    // Filter by class
    if (classFilter !== 'all') {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(`class ${classFilter}`) ||
            book.title.toLowerCase().includes(`कक्षा ${classFilter}`)
        );
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
        filteredBooks = filteredBooks.filter(book => 
            book.category === categoryFilter
        );
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayBooks(filteredBooks);
    updateBookCount(filteredBooks.length, books.length);
}

// Update book count display
function updateBookCount(filtered, total) {
    const bookCount = document.getElementById('bookCount');
    if (filtered === total) {
        bookCount.textContent = `Showing all ${total} books`;
    } else {
        bookCount.textContent = `Showing ${filtered} of ${total} books`;
    }
}

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
        cover: document.getElementById('bookCover').value || '',
        pdfUrl: document.getElementById('bookPdf').value || ''
    };

    books.push(newBook);
    saveBooks();
    displayAdminBooks();
    populateCategoryFilter(); // Update category filter
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
        populateCategoryFilter(); // Update category filter
        displayBooks();
    }
}

// Save books to localStorage
function saveBooks() {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
}

// Get icon based on category
function getCategoryIcon(category) {
    const icons = {
        'Mathematics': '🔢',
        'Science': '🔬',
        'Physics': '⚛️',
        'Chemistry': '🧪',
        'Biology': '🧬',
        'Social Science': '🌍',
        'History': '📜',
        'Geography': '🗺️',
        'Economics': '💰',
        'Political Science': '🏛️',
        'Sociology': '👥',
        'Psychology': '🧠',
        'Accountancy': '💼',
        'Business Studies': '📊',
        'Hindi': '📝',
        'English': '📖',
        'Language': '📚'
    };
    return icons[category] || '📚';
}

// Display books for students
function displayBooks(filteredBooks = null) {
    const booksList = document.getElementById('booksList');
    const booksToDisplay = filteredBooks || books;

    if (booksToDisplay.length === 0) {
        booksList.innerHTML = '<div class="no-books">No books found matching your criteria</div>';
        return;
    }

    booksList.innerHTML = booksToDisplay.map(book => `
        <div class="book-card">
            ${book.cover 
                ? `<img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.outerHTML='<div class=\\'book-cover\\'>${getCategoryIcon(book.category)}</div>'">`
                : `<div class="book-cover">${getCategoryIcon(book.category)}</div>`
            }
            <h3>${book.title}</h3>
            <p class="book-author">👤 ${book.author}</p>
            <span class="book-category">${book.category}</span>
            <p class="book-year">📅 ${book.year}</p>
            <p class="book-description">${book.description}</p>
            ${book.pdfUrl ? `
                <div class="book-actions">
                    <button onclick="openPdfViewer('${book.pdfUrl.replace(/'/g, "\\'")}', '${book.title.replace(/'/g, "\\'")}', event)" class="btn btn-read">
                        ${book.pdfUrl.endsWith('.zip') ? '� Open NCERT' : '�📖 Read Online'}
                    </button>
                    <a href="${book.pdfUrl}" download="${book.title}.${book.pdfUrl.endsWith('.zip') ? 'zip' : 'pdf'}" class="btn btn-download">
                        ⬇️ Download ${book.pdfUrl.endsWith('.zip') ? 'ZIP' : 'PDF'}
                    </a>
                </div>
            ` : '<p class="no-pdf">PDF not available</p>'}
        </div>
    `).join('');
    
    // Update count if not filtered
    if (!filteredBooks) {
        updateBookCount(books.length, books.length);
    }
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

// Open PDF Viewer
function openPdfViewer(pdfUrl, bookTitle, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const title = document.getElementById('pdfTitle');
    
    // Set title
    title.textContent = bookTitle;
    
    // Check if URL is a ZIP file
    if (pdfUrl.endsWith('.zip')) {
        // For ZIP files, open in new tab as they need to be downloaded and extracted
        window.open(pdfUrl, '_blank');
        return;
    }
    
    // For PDF files, use Google Docs Viewer for better PDF viewing
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    viewer.src = viewerUrl;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close PDF Viewer
function closePdfViewer() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    // Clear iframe
    viewer.src = '';
    
    // Hide modal
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target === modal) {
        closePdfViewer();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePdfViewer();
    }
});
