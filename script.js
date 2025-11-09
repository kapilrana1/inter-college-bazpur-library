// Global Variables
let currentUser = null;
let books = [];
let notes = [];
let notices = [];
let editingBookId = null;
let editingNoteId = null;
let editingNoticeId = null;
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
            },
            {
                id: 5,
                title: "Grandma's Bag of Stories",
                author: 'Sudha Murthy',
                year: '2015',
                genre: 'Children Fiction',
                rating: 5,
                description: 'A delightful collection of stories told by a grandmother to her grandchildren during summer vacation',
                assignedTo: ['student', 'teacher'],
                pdf: 'https://raw.githubusercontent.com/kapilrana1/inter-college-bazpur-library/main/books/Grandma%27s%20Bag%20of%20Stories%20by%20Sudha%20Murthy.pdf'
            }
        ];
        // Save default books to localStorage
        saveBooksToStorage();
    }
    
    // Load notes from localStorage
    const savedNotes = localStorage.getItem('libraryNotes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    } else {
        notes = [];
        saveNotesToStorage();
    }
    
    // Load notices from localStorage
    const savedNotices = localStorage.getItem('libraryNotices');
    if (savedNotices) {
        notices = JSON.parse(savedNotices);
    } else {
        notices = [];
        saveNoticesToStorage();
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

function saveNotesToStorage() {
    localStorage.setItem('libraryNotes', JSON.stringify(notes));
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
    
    // Show admin toolbar only for admin
    if (currentUser.role === 'admin') {
        document.getElementById('adminToolbar').style.display = 'flex';
    } else {
        document.getElementById('adminToolbar').style.display = 'none';
    }
    
    // Show/hide Add Notice button based on role
    const addNoticeBtn = document.getElementById('addNoticeBtn');
    if (addNoticeBtn) {
        if (currentUser.role === 'admin') {
            addNoticeBtn.style.display = 'flex';
        } else {
            addNoticeBtn.style.display = 'none';
        }
    }
    
    // Show notes section for students and teachers
    if (currentUser.role === 'student' || currentUser.role === 'teacher') {
        document.getElementById('notesSection').style.display = 'block';
    } else {
        document.getElementById('notesSection').style.display = 'none';
    }
    
    displayBooks();
    displayNotes();
    displayNotices();
    lucide.createIcons();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('libraryPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('addBookForm').style.display = 'none';
    document.getElementById('addNoteForm').style.display = 'none';
    document.getElementById('ncertBooksSection').style.display = 'none';
    document.getElementById('dictionarySection').style.display = 'none';
    document.getElementById('searchInput').value = '';
    backToOptions();
}

// NCERT Books Toggle Function
function toggleNCERTBooks() {
    const ncertSection = document.getElementById('ncertBooksSection');
    const addBookForm = document.getElementById('addBookForm');
    const addNoteForm = document.getElementById('addNoteForm');
    const addNoticeForm = document.getElementById('addNoticeForm');
    const dictSection = document.getElementById('dictionarySection');
    const noticeSection = document.getElementById('noticeBoardSection');
    
    if (ncertSection.style.display === 'none' || ncertSection.style.display === '') {
        ncertSection.style.display = 'block';
        addBookForm.style.display = 'none';
        addNoteForm.style.display = 'none';
        addNoticeForm.style.display = 'none';
        dictSection.style.display = 'none';
        noticeSection.style.display = 'none';
    } else {
        ncertSection.style.display = 'none';
    }
    lucide.createIcons();
}

// Dictionary Toggle Function
function toggleDictionary() {
    const dictSection = document.getElementById('dictionarySection');
    const addBookForm = document.getElementById('addBookForm');
    const addNoteForm = document.getElementById('addNoteForm');
    const addNoticeForm = document.getElementById('addNoticeForm');
    const ncertSection = document.getElementById('ncertBooksSection');
    const noticeSection = document.getElementById('noticeBoardSection');
    
    if (dictSection.style.display === 'none' || dictSection.style.display === '') {
        dictSection.style.display = 'block';
        addBookForm.style.display = 'none';
        addNoteForm.style.display = 'none';
        addNoticeForm.style.display = 'none';
        ncertSection.style.display = 'none';
        noticeSection.style.display = 'none';
        switchDictTab('api'); // Default to Dictionary API
    } else {
        dictSection.style.display = 'none';
    }
    lucide.createIcons();
}

// Show welcome message with sample words
function showWelcomeMessage() {
    const resultDiv = document.getElementById('englishResult');
    resultDiv.innerHTML = `
        <div class="dict-welcome">
            <h3 style="color: #a78bfa; margin-bottom: 1rem;">Welcome to Digital Dictionary! 📚</h3>
            <p style="color: #e0e7ff; margin-bottom: 1.5rem;">Type any word in the search box above to see its Hindi translation.</p>
            <div class="dict-samples">
                <h4 style="color: #fbbf24; margin-bottom: 0.75rem;">Sample Words:</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
                    <div class="sample-word" onclick="document.getElementById('englishWordInput').value='hello'; searchEnglishToHindi();">
                        <strong>hello</strong> → नमस्ते
                    </div>
                    <div class="sample-word" onclick="document.getElementById('englishWordInput').value='book'; searchEnglishToHindi();">
                        <strong>book</strong> → किताब
                    </div>
                    <div class="sample-word" onclick="document.getElementById('englishWordInput').value='student'; searchEnglishToHindi();">
                        <strong>student</strong> → छात्र
                    </div>
                    <div class="sample-word" onclick="document.getElementById('englishWordInput').value='teacher'; searchEnglishToHindi();">
                        <strong>teacher</strong> → अध्यापक
                    </div>
                    <div class="sample-word" onclick="document.getElementById('englishWordInput').value='school'; searchEnglishToHindi();">
                        <strong>school</strong> → विद्यालय
                    </div>
                    <div class="sample-word" onclick="document.getElementById('englishWordInput').value='education'; searchEnglishToHindi();">
                        <strong>education</strong> → शिक्षा
                    </div>
                </div>
            </div>
        </div>
    `;
}

// English to Hindi Dictionary - Comprehensive data
const englishToHindi = {
    // Common words
    "hello": "नमस्ते / हैलो",
    "goodbye": "अलविदा",
    "thank you": "धन्यवाद / शुक्रिया",
    "please": "कृपया",
    "yes": "हाँ",
    "no": "नहीं",
    "good": "अच्छा",
    "bad": "बुरा / खराब",
    "beautiful": "सुंदर",
    "love": "प्यार / प्रेम",
    
    // Educational words
    "book": "किताब / पुस्तक",
    "library": "पुस्तकालय",
    "student": "छात्र / विद्यार्थी",
    "teacher": "अध्यापक / शिक्षक",
    "school": "विद्यालय / स्कूल",
    "college": "महाविद्यालय / कॉलेज",
    "education": "शिक्षा",
    "knowledge": "ज्ञान",
    "learning": "सीखना",
    "study": "अध्ययन / पढ़ाई",
    "exam": "परीक्षा",
    "class": "कक्षा",
    "homework": "गृहकार्य",
    "notebook": "कॉपी / नोटबुक",
    "pen": "कलम",
    "pencil": "पेंसिल",
    "paper": "कागज़",
    "desk": "डेस्क / मेज़",
    "chair": "कुर्सी",
    "blackboard": "तख़्ता / श्यामपट",
    
    // Numbers
    "one": "एक",
    "two": "दो",
    "three": "तीन",
    "four": "चार",
    "five": "पांच",
    "six": "छह",
    "seven": "सात",
    "eight": "आठ",
    "nine": "नौ",
    "ten": "दस",
    
    // Time
    "time": "समय / वक़्त",
    "day": "दिन",
    "night": "रात",
    "morning": "सुबह",
    "evening": "शाम",
    "today": "आज",
    "tomorrow": "कल",
    "yesterday": "कल (बीता हुआ)",
    "week": "सप्ताह / हफ़्ता",
    "month": "महीना / माह",
    "year": "साल / वर्ष",
    
    // Family
    "mother": "माँ / माता",
    "father": "पिता / पिताजी",
    "brother": "भाई",
    "sister": "बहन",
    "son": "बेटा / पुत्र",
    "daughter": "बेटी / पुत्री",
    "family": "परिवार",
    "friend": "दोस्त / मित्र",
    
    // Common verbs
    "go": "जाना",
    "come": "आना",
    "eat": "खाना",
    "drink": "पीना",
    "sleep": "सोना",
    "wake": "जागना",
    "read": "पढ़ना",
    "write": "लिखना",
    "speak": "बोलना",
    "listen": "सुनना",
    "see": "देखना",
    "think": "सोचना",
    "know": "जानना",
    "understand": "समझना",
    "learn": "सीखना",
    "teach": "पढ़ाना / सिखाना",
    "work": "काम करना",
    "play": "खेलना",
    "run": "दौड़ना",
    "walk": "चलना",
    
    // Science terms
    "science": "विज्ञान",
    "physics": "भौतिक विज्ञान",
    "chemistry": "रसायन विज्ञान",
    "biology": "जीव विज्ञान",
    "mathematics": "गणित",
    "history": "इतिहास",
    "geography": "भूगोल",
    "computer": "कंप्यूटर",
    "experiment": "प्रयोग",
    "theory": "सिद्धांत",
    "formula": "सूत्र",
    "equation": "समीकरण",
    "problem": "समस्या",
    "solution": "हल / समाधान",
    "question": "प्रश्न / सवाल",
    "answer": "उत्तर / जवाब",
    
    // Common adjectives
    "big": "बड़ा",
    "small": "छोटा",
    "hot": "गर्म",
    "cold": "ठंडा",
    "new": "नया",
    "old": "पुराना",
    "fast": "तेज़",
    "slow": "धीमा",
    "high": "ऊँचा",
    "low": "नीचा",
    "long": "लंबा",
    "short": "छोटा",
    "easy": "आसान",
    "difficult": "कठिन / मुश्किल",
    "important": "महत्वपूर्ण / ज़रूरी",
    "happy": "खुश",
    "sad": "दुखी / उदास",
    "angry": "नाराज़ / गुस्सा",
    "tired": "थका हुआ",
    
    // Fruits & Food
    "apple": "सेब",
    "banana": "केला",
    "mango": "आम",
    "orange": "संतरा",
    "grapes": "अंगूर",
    "watermelon": "तरबूज",
    "pineapple": "अनानास",
    "strawberry": "स्ट्रॉबेरी",
    "fruit": "फल",
    "vegetable": "सब्ज़ी",
    "rice": "चावल",
    "bread": "रोटी / ब्रेड",
    "water": "पानी",
    "milk": "दूध",
    "tea": "चाय",
    "coffee": "कॉफ़ी",
    
    // Colors
    "red": "लाल",
    "blue": "नीला",
    "green": "हरा",
    "yellow": "पीला",
    "white": "सफ़ेद",
    "black": "काला",
    "orange": "नारंगी",
    "purple": "बैंगनी",
    "pink": "गुलाबी",
    "brown": "भूरा",
    
    // Animals
    "dog": "कुत्ता",
    "cat": "बिल्ली",
    "cow": "गाय",
    "horse": "घोड़ा",
    "elephant": "हाथी",
    "lion": "शेर",
    "tiger": "बाघ",
    "bird": "चिड़िया / पक्षी",
    "fish": "मछली"
};

// Hindi to English Dictionary
const hindiToEnglish = {
    "नमस्ते": "Hello / Greetings",
    "अलविदा": "Goodbye",
    "धन्यवाद": "Thank you",
    "शुक्रिया": "Thank you",
    "कृपया": "Please",
    "हाँ": "Yes",
    "नहीं": "No",
    "अच्छा": "Good",
    "बुरा": "Bad",
    "सुंदर": "Beautiful",
    "प्यार": "Love",
    "प्रेम": "Love",
    
    "किताब": "Book",
    "पुस्तक": "Book",
    "पुस्तकालय": "Library",
    "छात्र": "Student",
    "विद्यार्थी": "Student",
    "अध्यापक": "Teacher",
    "शिक्षक": "Teacher",
    "विद्यालय": "School",
    "स्कूल": "School",
    "महाविद्यालय": "College",
    "कॉलेज": "College",
    "शिक्षा": "Education",
    "ज्ञान": "Knowledge",
    "सीखना": "Learning",
    "अध्ययन": "Study",
    "पढ़ाई": "Study",
    "परीक्षा": "Exam",
    "कक्षा": "Class",
    "गृहकार्य": "Homework",
    "कॉपी": "Notebook",
    "कलम": "Pen",
    "कागज़": "Paper",
    "मेज़": "Desk",
    "कुर्सी": "Chair",
    
    "एक": "One",
    "दो": "Two",
    "तीन": "Three",
    "चार": "Four",
    "पांच": "Five",
    "छह": "Six",
    "सात": "Seven",
    "आठ": "Eight",
    "नौ": "Nine",
    "दस": "Ten",
    
    "समय": "Time",
    "वक़्त": "Time",
    "दिन": "Day",
    "रात": "Night",
    "सुबह": "Morning",
    "शाम": "Evening",
    "आज": "Today",
    "कल": "Tomorrow/Yesterday",
    "सप्ताह": "Week",
    "हफ़्ता": "Week",
    "महीना": "Month",
    "माह": "Month",
    "साल": "Year",
    "वर्ष": "Year",
    
    "माँ": "Mother",
    "माता": "Mother",
    "पिता": "Father",
    "भाई": "Brother",
    "बहन": "Sister",
    "बेटा": "Son",
    "पुत्र": "Son",
    "बेटी": "Daughter",
    "पुत्री": "Daughter",
    "परिवार": "Family",
    "दोस्त": "Friend",
    "मित्र": "Friend",
    
    "जाना": "Go",
    "आना": "Come",
    "खाना": "Eat / Food",
    "पीना": "Drink",
    "सोना": "Sleep",
    "जागना": "Wake up",
    "पढ़ना": "Read",
    "लिखना": "Write",
    "बोलना": "Speak",
    "सुनना": "Listen",
    "देखना": "See / Watch",
    "सोचना": "Think",
    "जानना": "Know",
    "समझना": "Understand",
    "सिखाना": "Teach",
    "काम": "Work",
    "खेलना": "Play",
    "दौड़ना": "Run",
    "चलना": "Walk",
    
    // Fruits in Hindi
    "सेब": "Apple",
    "केला": "Banana", 
    "आम": "Mango",
    "संतरा": "Orange",
    "अंगूर": "Grapes",
    "तरबूज": "Watermelon",
    "अनानास": "Pineapple",
    "स्ट्रॉबेरी": "Strawberry",
    "फल": "Fruit",
    
    // Foods in Hindi
    "सब्ज़ी": "Vegetable",
    "चावल": "Rice",
    "रोटी": "Bread",
    "पानी": "Water",
    "दूध": "Milk",
    "चाय": "Tea",
    "कॉफ़ी": "Coffee",
    
    // Colors in Hindi
    "लाल": "Red",
    "नीला": "Blue",
    "हरा": "Green",
    "पीला": "Yellow",
    "सफ़ेद": "White",
    "काला": "Black",
    "नारंगी": "Orange",
    "बैंगनी": "Purple",
    "गुलाबी": "Pink",
    "भूरा": "Brown",
    
    // Animals in Hindi
    "कुत्ता": "Dog",
    "बिल्ली": "Cat",
    "गाय": "Cow",
    "घोड़ा": "Horse",
    "हाथी": "Elephant",
    "शेर": "Lion",
    "बाघ": "Tiger",
    "चिड़िया": "Bird",
    "मछली": "Fish",
    
    "विज्ञान": "Science",
    "भौतिक": "Physics",
    "रसायन": "Chemistry",
    "जीव": "Biology",
    "गणित": "Mathematics",
    "इतिहास": "History",
    "भूगोल": "Geography",
    "प्रयोग": "Experiment",
    "सिद्धांत": "Theory",
    "सूत्र": "Formula",
    "समीकरण": "Equation",
    "समस्या": "Problem",
    "हल": "Solution",
    "समाधान": "Solution",
    "प्रश्न": "Question",
    "सवाल": "Question",
    "उत्तर": "Answer",
    "जवाब": "Answer",
    
    "बड़ा": "Big",
    "छोटा": "Small",
    "गर्म": "Hot",
    "ठंडा": "Cold",
    "नया": "New",
    "पुराना": "Old",
    "तेज़": "Fast",
    "धीमा": "Slow",
    "ऊँचा": "High",
    "नीचा": "Low",
    "लंबा": "Long",
    "आसान": "Easy",
    "कठिन": "Difficult",
    "मुश्किल": "Difficult",
    "महत्वपूर्ण": "Important",
    "ज़रूरी": "Important",
    "खुश": "Happy",
    "दुखी": "Sad",
    "उदास": "Sad",
    "नाराज़": "Angry",
    "गुस्सा": "Angry",
    "थका": "Tired"
};

// Synonyms and Antonyms Dictionary
const synonymsAntonyms = {
    "happy": {
        synonyms: ["joyful", "cheerful", "delighted", "pleased", "content", "glad"],
        antonyms: ["sad", "unhappy", "miserable", "depressed", "sorrowful"]
    },
    "good": {
        synonyms: ["excellent", "great", "fine", "nice", "wonderful", "pleasant"],
        antonyms: ["bad", "poor", "terrible", "awful", "horrible"]
    },
    "big": {
        synonyms: ["large", "huge", "enormous", "giant", "massive", "vast"],
        antonyms: ["small", "tiny", "little", "minute", "miniature"]
    },
    "fast": {
        synonyms: ["quick", "rapid", "swift", "speedy", "hasty"],
        antonyms: ["slow", "sluggish", "gradual", "leisurely"]
    },
    "beautiful": {
        synonyms: ["pretty", "lovely", "attractive", "gorgeous", "stunning"],
        antonyms: ["ugly", "unattractive", "hideous", "plain"]
    },
    "smart": {
        synonyms: ["intelligent", "clever", "bright", "brilliant", "wise"],
        antonyms: ["stupid", "dumb", "foolish", "ignorant"]
    },
    "easy": {
        synonyms: ["simple", "effortless", "straightforward", "uncomplicated"],
        antonyms: ["difficult", "hard", "complex", "complicated", "challenging"]
    },
    "strong": {
        synonyms: ["powerful", "mighty", "robust", "sturdy", "tough"],
        antonyms: ["weak", "feeble", "frail", "fragile"]
    },
    "rich": {
        synonyms: ["wealthy", "affluent", "prosperous", "well-off"],
        antonyms: ["poor", "needy", "impoverished", "destitute"]
    },
    "brave": {
        synonyms: ["courageous", "fearless", "bold", "daring", "heroic"],
        antonyms: ["cowardly", "afraid", "timid", "fearful"]
    },
    "new": {
        synonyms: ["fresh", "modern", "recent", "latest", "novel"],
        antonyms: ["old", "ancient", "outdated", "obsolete"]
    },
    "clean": {
        synonyms: ["spotless", "pure", "tidy", "neat", "immaculate"],
        antonyms: ["dirty", "filthy", "messy", "unclean", "soiled"]
    },
    "hot": {
        synonyms: ["warm", "heated", "burning", "scorching", "boiling"],
        antonyms: ["cold", "cool", "chilly", "freezing", "icy"]
    },
    "important": {
        synonyms: ["significant", "crucial", "vital", "essential", "critical"],
        antonyms: ["unimportant", "trivial", "insignificant", "minor"]
    },
    "love": {
        synonyms: ["affection", "adoration", "devotion", "fondness", "care"],
        antonyms: ["hate", "hatred", "dislike", "loathing"]
    }
};

// Subject-specific dictionaries
const subjectDictionaries = {
    physics: {
        "force": "A push or pull that can change the motion of an object. Measured in Newtons (N).",
        "energy": "The capacity to do work. Types include kinetic, potential, thermal, etc.",
        "velocity": "The rate of change of displacement with time. A vector quantity.",
        "acceleration": "The rate of change of velocity with time. Measured in m/s².",
        "momentum": "The product of mass and velocity. p = mv",
        "gravity": "The force of attraction between objects with mass.",
        "friction": "The resistance force that opposes motion between surfaces.",
        "work": "Energy transferred when a force moves an object. W = F × d",
        "power": "The rate of doing work. P = W/t, measured in Watts.",
        "atom": "The basic unit of matter consisting of protons, neutrons, and electrons."
    },
    chemistry: {
        "atom": "The smallest unit of an element that retains its chemical properties.",
        "molecule": "Two or more atoms chemically bonded together.",
        "element": "A pure substance consisting of only one type of atom.",
        "compound": "A substance made of two or more different elements chemically bonded.",
        "acid": "A substance that donates hydrogen ions (H+) in solution. pH < 7.",
        "base": "A substance that accepts hydrogen ions or donates hydroxide ions. pH > 7.",
        "catalyst": "A substance that speeds up a reaction without being consumed.",
        "oxidation": "Loss of electrons or increase in oxidation state.",
        "reduction": "Gain of electrons or decrease in oxidation state.",
        "ion": "An atom or molecule with a net electric charge."
    },
    biology: {
        "cell": "The basic structural and functional unit of all living organisms.",
        "DNA": "Deoxyribonucleic acid - the molecule carrying genetic instructions.",
        "photosynthesis": "Process by which plants convert light energy into chemical energy.",
        "enzyme": "A biological catalyst that speeds up chemical reactions in organisms.",
        "protein": "Large biomolecules made of amino acids, essential for life.",
        "mitochondria": "The powerhouse of the cell - produces ATP energy.",
        "chromosome": "Thread-like structure of DNA carrying genetic information.",
        "respiration": "Process of breaking down glucose to release energy in cells.",
        "evolution": "Change in heritable characteristics of populations over generations.",
        "ecosystem": "A community of living organisms interacting with their environment."
    },
    math: {
        "algebra": "Branch of mathematics using symbols to represent numbers and quantities.",
        "geometry": "Study of shapes, sizes, and properties of space.",
        "calculus": "Study of continuous change - includes differentiation and integration.",
        "integer": "A whole number (positive, negative, or zero).",
        "fraction": "A number representing part of a whole. Written as a/b.",
        "equation": "A mathematical statement showing equality between two expressions.",
        "variable": "A symbol representing an unknown or changeable value.",
        "function": "A relation between inputs and outputs where each input has one output.",
        "theorem": "A mathematical statement that has been proven true.",
        "prime": "A natural number greater than 1 divisible only by 1 and itself."
    }
};

let currentSubject = 'physics';

// Switch Dictionary Tabs
function switchDictTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.dict-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.dict-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    if (tab === 'api') {
        document.getElementById('apiDict').classList.add('active');
        document.querySelector('.dict-tab:nth-child(1)').classList.add('active');
        showAPIWelcome();
    } else if (tab === 'translate') {
        document.getElementById('translateDict').classList.add('active');
        document.querySelector('.dict-tab:nth-child(2)').classList.add('active');
    } else if (tab === 'english') {
        document.getElementById('englishDict').classList.add('active');
        document.querySelector('.dict-tab:nth-child(3)').classList.add('active');
        showWelcomeMessage();
    }
    lucide.createIcons();
}

// Show API Welcome Message
function showAPIWelcome() {
    const resultDiv = document.getElementById('apiResult');
    resultDiv.innerHTML = `
        <div class="dict-welcome">
            <h3 style="color: #a78bfa; margin-bottom: 1rem;">🌐 Smart Dictionary with Hindi Translation</h3>
            <p style="color: #e0e7ff; margin-bottom: 1.5rem;">Search any English word to get:<br>
            ✅ Hindi Translation (Online + Offline)<br>
            ✅ English Definitions & Examples<br>
            ✅ Pronunciation Audio<br>
            ✅ Synonyms & Antonyms</p>
            <div class="dict-samples">
                <h4 style="color: #fbbf24; margin-bottom: 0.75rem;">Try these words:</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.75rem;">
                    <div class="sample-word" onclick="document.getElementById('apiWordInput').value='apple'; searchDictionaryAPI();">
                        apple
                    </div>
                    <div class="sample-word" onclick="document.getElementById('apiWordInput').value='knowledge'; searchDictionaryAPI();">
                        knowledge
                    </div>
                    <div class="sample-word" onclick="document.getElementById('apiWordInput').value='education'; searchDictionaryAPI();">
                        education
                    </div>
                    <div class="sample-word" onclick="document.getElementById('apiWordInput').value='beautiful'; searchDictionaryAPI();">
                        beautiful
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Search Dictionary API with Hindi Translation
async function searchDictionaryAPI() {
    const word = document.getElementById('apiWordInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('apiResult');
    
    if (!word) {
        resultDiv.innerHTML = '<p class="dict-error">Please enter a word to search</p>';
        return;
    }
    
    resultDiv.innerHTML = '<div class="dict-loading"><i data-lucide="loader" class="rotating"></i> Searching dictionary & getting Hindi translation...</div>';
    lucide.createIcons();
    
    try {
        // Try to get from offline dictionary first
        let hindiTranslation = englishToHindi[word];
        
        // If not in offline dictionary, try online API
        if (!hindiTranslation) {
            try {
                const glosbeResponse = await fetch(`https://glosbe.com/gapi/translate?from=en&dest=hi&format=json&phrase=${encodeURIComponent(word)}&pretty=true`);
                if (glosbeResponse.ok) {
                    const glosbeData = await glosbeResponse.json();
                    if (glosbeData.tuc && glosbeData.tuc.length > 0 && glosbeData.tuc[0].phrase) {
                        hindiTranslation = glosbeData.tuc[0].phrase.text;
                    }
                }
            } catch (e) {
                console.log('Glosbe API unavailable, using offline dictionary only');
            }
        }
        
        // Fetch English definition from Free Dictionary API
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        if (!response.ok) {
            // If API fails, check offline dictionary
            if (hindiTranslation) {
                resultDiv.innerHTML = `
                    <div class="dict-word-card api-card">
                        <h3 class="dict-word-title">${word.charAt(0).toUpperCase() + word.slice(1)}</h3>
                        <div class="hindi-translation-box">
                            <h4 style="color: #a78bfa; margin-bottom: 0.5rem;">🇮🇳 Hindi Translation</h4>
                            <p class="dict-hindi-text" style="font-size: 2rem; font-weight: bold;">${hindiTranslation}</p>
                        </div>
                        <p style="color: #94a3b8; margin-top: 1rem;">English definition not available for this word.</p>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `<p class="dict-error">❌ Word "${word}" not found. Please check spelling.</p>`;
            }
            return;
        }
        
        const data = await response.json();
        const wordData = data[0];
        
        let html = `<div class="dict-word-card api-card">`;
        html += `<h3 class="dict-word-title">${wordData.word}</h3>`;
        
        // Show Hindi translation at the top if available
        if (hindiTranslation) {
            html += `<div class="hindi-translation-box">
                <h4 style="color: #a78bfa; margin-bottom: 0.5rem;">🇮🇳 Hindi Translation</h4>
                <p class="dict-hindi-text" style="font-size: 2rem; font-weight: bold; color: #2563eb;">${hindiTranslation}</p>
            </div>`;
        }
        
        if (wordData.phonetic) {
            html += `<p class="dict-phonetic">📢 ${wordData.phonetic}</p>`;
        }
        
        // Add audio if available
        if (wordData.phonetics && wordData.phonetics.length > 0) {
            const audioPhonetic = wordData.phonetics.find(p => p.audio);
            if (audioPhonetic && audioPhonetic.audio) {
                html += `<div class="audio-player">
                    <button onclick="playAudio('${audioPhonetic.audio}')" class="audio-btn">
                        <i data-lucide="volume-2"></i>
                        <span>Listen Pronunciation</span>
                    </button>
                </div>`;
            }
        }
        
        wordData.meanings.forEach((meaning, index) => {
            html += `<div class="dict-meaning">`;
            html += `<h4 class="dict-pos">📝 ${meaning.partOfSpeech}</h4>`;
            
            meaning.definitions.slice(0, 3).forEach((def, idx) => {
                html += `<div class="dict-definition">`;
                html += `<p><strong>${idx + 1}.</strong> ${def.definition}</p>`;
                if (def.example) {
                    html += `<p class="dict-example">💡 Example: "${def.example}"</p>`;
                }
                html += `</div>`;
            });
            
            if (meaning.synonyms && meaning.synonyms.length > 0) {
                html += `<p class="dict-synonyms"><strong>✓ Synonyms:</strong> ${meaning.synonyms.slice(0, 5).join(', ')}</p>`;
            }
            
            if (meaning.antonyms && meaning.antonyms.length > 0) {
                html += `<p class="dict-antonyms"><strong>✗ Antonyms:</strong> ${meaning.antonyms.slice(0, 5).join(', ')}</p>`;
            }
            
            html += `</div>`;
        });
        
        html += `</div>`;
        resultDiv.innerHTML = html;
        
    } catch (error) {
        resultDiv.innerHTML = `<p class="dict-error">⚠️ Error: Unable to fetch data. Please check your internet connection.</p>`;
    }
    
    lucide.createIcons();
}

// Play Audio Pronunciation
function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(err => {
        alert('Unable to play audio');
    });
}

// Swap Languages in Translator
function swapLanguages() {
    const fromLang = document.getElementById('fromLang');
    const toLang = document.getElementById('toLang');
    
    const temp = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = temp;
    
    // Clear results
    document.getElementById('translateResult').innerHTML = '';
}

// Translate Text using MyMemory API
async function translateText() {
    const text = document.getElementById('translateInput').value.trim();
    const fromLang = document.getElementById('fromLang').value;
    const toLang = document.getElementById('toLang').value;
    const resultDiv = document.getElementById('translateResult');
    
    if (!text) {
        resultDiv.innerHTML = '<p class="dict-error">Please enter text to translate</p>';
        return;
    }
    
    if (fromLang === toLang) {
        resultDiv.innerHTML = '<p class="dict-error">Please select different languages</p>';
        return;
    }
    
    resultDiv.innerHTML = '<div class="dict-loading"><i data-lucide="loader" class="rotating"></i> Translating...</div>';
    lucide.createIcons();
    
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
        );
        
        if (!response.ok) {
            throw new Error('Translation failed');
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200 && data.responseData) {
            const translation = data.responseData.translatedText;
            
            let html = `<div class="dict-word-card translate-card">`;
            html += `<div class="translate-section">`;
            html += `<h4 class="translate-label">📝 Original:</h4>`;
            html += `<p class="translate-text">${text}</p>`;
            html += `</div>`;
            html += `<div class="translate-section">`;
            html += `<h4 class="translate-label">✓ Translation:</h4>`;
            html += `<p class="translate-result-text">${translation}</p>`;
            html += `</div>`;
            
            if (data.responseData.match) {
                html += `<p class="translate-confidence">Confidence: ${(data.responseData.match * 100).toFixed(0)}%</p>`;
            }
            
            html += `</div>`;
            resultDiv.innerHTML = html;
        } else {
            resultDiv.innerHTML = '<p class="dict-error">Translation not available</p>';
        }
        
    } catch (error) {
        resultDiv.innerHTML = `<p class="dict-error">⚠️ Error: Unable to translate. Please check your internet connection.</p>`;
    }
    
    lucide.createIcons();
}

// Switch Subject Tabs
function switchSubject(subject) {
    currentSubject = subject;
    document.querySelectorAll('.subject-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('subjectWordInput').value = '';
    document.getElementById('subjectResult').innerHTML = '';
}

// Search English to Hindi
function searchEnglishToHindi() {
    const word = document.getElementById('englishWordInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('englishResult');
    
    if (!word) {
        resultDiv.innerHTML = '';
        return;
    }
    
    const matchedWords = Object.keys(englishToHindi).filter(key => 
        key.toLowerCase().includes(word)
    );
    
    if (matchedWords.length === 0) {
        resultDiv.innerHTML = `<p class="dict-error">No translation found for "${word}"</p>`;
        return;
    }
    
    let html = '<div class="dict-results-list">';
    matchedWords.slice(0, 10).forEach(key => {
        html += `<div class="dict-word-card hindi-card">`;
        html += `<h3 class="dict-word-title">${key}</h3>`;
        html += `<p class="dict-hindi-text">${englishToHindi[key]}</p>`;
        html += `</div>`;
    });
    html += '</div>';
    
    resultDiv.innerHTML = html;
}

// Search Hindi to English
function searchHindiToEnglish() {
    const word = document.getElementById('hindiWordInput').value.trim();
    const resultDiv = document.getElementById('hindiResult');
    
    if (!word) {
        resultDiv.innerHTML = '';
        return;
    }
    
    const matchedWords = Object.keys(hindiToEnglish).filter(key => 
        key.includes(word)
    );
    
    if (matchedWords.length === 0) {
        resultDiv.innerHTML = `<p class="dict-error">No translation found for "${word}"</p>`;
        return;
    }
    
    let html = '<div class="dict-results-list">';
    matchedWords.slice(0, 10).forEach(key => {
        html += `<div class="dict-word-card hindi-card">`;
        html += `<h3 class="dict-word-title dict-hindi-text">${key}</h3>`;
        html += `<p class="dict-definition">${hindiToEnglish[key]}</p>`;
        html += `</div>`;
    });
    html += '</div>';
    
    resultDiv.innerHTML = html;
}

// Search Synonyms & Antonyms
function searchSynonyms() {
    const word = document.getElementById('synonymsWordInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('synonymsResult');
    
    if (!word) {
        resultDiv.innerHTML = '';
        return;
    }
    
    const matchedWords = Object.keys(synonymsAntonyms).filter(key => 
        key.toLowerCase().includes(word)
    );
    
    if (matchedWords.length === 0) {
        resultDiv.innerHTML = `<p class="dict-error">No synonyms/antonyms found for "${word}"</p>`;
        return;
    }
    
    let html = '<div class="dict-results-list">';
    matchedWords.forEach(key => {
        const data = synonymsAntonyms[key];
        html += `<div class="dict-word-card synonym-card">`;
        html += `<h3 class="dict-word-title">${key.charAt(0).toUpperCase() + key.slice(1)}</h3>`;
        
        if (data.synonyms && data.synonyms.length > 0) {
            html += `<div class="syn-section">`;
            html += `<h4 class="syn-title">✓ Synonyms:</h4>`;
            html += `<p class="syn-list">${data.synonyms.join(', ')}</p>`;
            html += `</div>`;
        }
        
        if (data.antonyms && data.antonyms.length > 0) {
            html += `<div class="ant-section">`;
            html += `<h4 class="ant-title">✗ Antonyms:</h4>`;
            html += `<p class="ant-list">${data.antonyms.join(', ')}</p>`;
            html += `</div>`;
        }
        
        html += `</div>`;
    });
    html += '</div>';
    
    resultDiv.innerHTML = html;
}

// Search Subject Word
function searchSubjectWord() {
    const word = document.getElementById('subjectWordInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('subjectResult');
    
    if (!word) {
        resultDiv.innerHTML = '';
        return;
    }
    
    const dictionary = subjectDictionaries[currentSubject];
    const matchedWords = Object.keys(dictionary).filter(key => 
        key.toLowerCase().includes(word)
    );
    
    if (matchedWords.length === 0) {
        resultDiv.innerHTML = `<p class="dict-error">No ${currentSubject} terms found for "${word}"</p>`;
        return;
    }
    
    let html = '<div class="dict-results-list">';
    matchedWords.forEach(key => {
        html += `<div class="dict-word-card subject-card">`;
        html += `<h3 class="dict-word-title">${key.charAt(0).toUpperCase() + key.slice(1)}</h3>`;
        html += `<p class="dict-definition">${dictionary[key]}</p>`;
        html += `</div>`;
    });
    html += '</div>';
    
    resultDiv.innerHTML = html;
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
    document.getElementById('bookPdfFile').value = '';
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
    const pdfFile = document.getElementById('bookPdfFile').value.trim();
    
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
    
    // Generate PDF URL if filename provided
    let pdfUrl = '';
    if (pdfFile) {
        // Check if it's a full URL
        if (pdfFile.startsWith('http://') || pdfFile.startsWith('https://')) {
            pdfUrl = pdfFile;
        } else {
            // Generate GitHub Pages URL
            pdfUrl = `https://kapilrana1.github.io/inter-college-bazpur-library/books/${pdfFile}`;
        }
    }
    
    const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        year: year,
        genre: genre,
        rating: rating,
        description: description,
        pdfUrl: pdfUrl,
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
    
    // Extract filename from URL if it's a GitHub Pages URL
    let pdfFile = book.pdfUrl || '';
    if (pdfFile && pdfFile.includes('github.io')) {
        const parts = pdfFile.split('/');
        pdfFile = parts[parts.length - 1];
    }
    document.getElementById('bookPdfFile').value = pdfFile;
    
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
    
    // Filter books based on search query and user role
    const filteredBooks = books.filter(book => {
        // Admin can see all books
        // Students can only see books assigned to them
        // Teachers can only see books assigned to them
        if (currentUser.role === 'admin') {
            // Admin sees all books
        } else {
            // Students and Teachers only see assigned books
            if (!book.assignedTo || !book.assignedTo.includes(currentUser.role)) {
                return false;
            }
        }
        
        const query = searchQuery.toLowerCase();
        return book.title.toLowerCase().includes(query) ||
               book.author.toLowerCase().includes(query) ||
               (book.genre && book.genre.toLowerCase().includes(query));
    });
    
    // Update total books count based on what user can see
    document.getElementById('totalBooks').textContent = filteredBooks.length;
    
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
        <div class="book-card" onclick="openBookReader(${book.id})">
            <div class="book-header">
                <div class="book-header-left">
                    <i data-lucide="book-open" class="book-icon"></i>
                    <div class="book-rating ${currentUser.role === 'admin' ? 'clickable-rating' : ''}">
                        ${currentUser.role === 'admin' ? 
                            Array(5).fill(0).map((_, index) => `
                                <i data-lucide="star" class="star-icon ${index < book.rating ? 'filled' : ''}" 
                                   onclick="event.stopPropagation(); updateRating(${book.id}, ${index + 1})"></i>
                            `).join('') :
                            Array(book.rating).fill('<i data-lucide="star" class="star-icon filled"></i>').join('')
                        }
                    </div>
                </div>
                ${currentUser.role === 'admin' ? `
                    <div class="admin-actions">
                        <button class="edit-btn" onclick="event.stopPropagation(); editBook(${book.id})">
                            <i data-lucide="edit"></i>
                        </button>
                        <button class="delete-btn" onclick="event.stopPropagation(); deleteBook(${book.id})">
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

// Notice Board Functions
function toggleNoticeBoard() {
    const section = document.getElementById('noticeBoardSection');
    const isVisible = section.style.display !== 'none';
    
    // Hide all sections
    hideAllSections();
    
    if (!isVisible) {
        section.style.display = 'block';
        displayNotices();
    }
}

function toggleAddNoticeForm() {
    const form = document.getElementById('addNoticeForm');
    const formTitle = document.querySelector('#addNoticeForm .form-title span');
    
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        clearNoticeForm();
        editingNoticeId = null;
        formTitle.textContent = 'Add New Notice';
        
        // Set default date to today
        document.getElementById('noticeDate').valueAsDate = new Date();
    } else {
        form.style.display = 'none';
    }
    lucide.createIcons();
}

function clearNoticeForm() {
    document.getElementById('noticeTitle').value = '';
    document.getElementById('noticeDate').value = '';
    document.getElementById('noticeDescription').value = '';
    document.getElementById('noticeStudents').checked = true;
    document.getElementById('noticeTeachers').checked = true;
    document.getElementById('noticeImage').value = '';
    document.getElementById('noticeImagePreview').style.display = 'none';
    document.getElementById('previewImg').src = '';
}

function previewNoticeImage(event) {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('noticeImagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function saveNotice() {
    const title = document.getElementById('noticeTitle').value.trim();
    const date = document.getElementById('noticeDate').value;
    const description = document.getElementById('noticeDescription').value.trim();
    const students = document.getElementById('noticeStudents').checked;
    const teachers = document.getElementById('noticeTeachers').checked;
    const imageInput = document.getElementById('noticeImage');
    const imagePreview = document.getElementById('previewImg').src;
    
    if (!title || !date || !description) {
        alert('Please fill all required fields!');
        return;
    }
    
    const visibleTo = [];
    if (students) visibleTo.push('student');
    if (teachers) visibleTo.push('teacher');
    
    if (visibleTo.length === 0) {
        alert('Please select at least one visibility option!');
        return;
    }
    
    const notice = {
        id: editingNoticeId || Date.now(),
        title,
        date,
        description,
        visibleTo,
        createdBy: currentUser.email,
        image: imagePreview || null
    };
    
    if (editingNoticeId) {
        const index = notices.findIndex(n => n.id === editingNoticeId);
        if (index !== -1) {
            notices[index] = notice;
        }
    } else {
        notices.push(notice);
    }
    
    saveNoticesToStorage();
    clearNoticeForm();
    editingNoticeId = null;
    toggleAddNoticeForm();
    
    // Hide all sections and show notice board
    hideAllSections();
    const noticeBoardSection = document.getElementById('noticeBoardSection');
    if (noticeBoardSection) {
        noticeBoardSection.style.display = 'block';
    }
    
    // Display notices after showing the board
    displayNotices();
    lucide.createIcons();
}

function editNotice(noticeId) {
    const notice = notices.find(n => n.id === noticeId);
    if (!notice) return;
    
    editingNoticeId = noticeId;
    
    document.getElementById('noticeTitle').value = notice.title;
    document.getElementById('noticeDate').value = notice.date;
    document.getElementById('noticeDescription').value = notice.description;
    document.getElementById('noticeStudents').checked = notice.visibleTo.includes('student');
    document.getElementById('noticeTeachers').checked = notice.visibleTo.includes('teacher');
    
    // Load image if exists
    if (notice.image) {
        document.getElementById('previewImg').src = notice.image;
        document.getElementById('noticeImagePreview').style.display = 'block';
    } else {
        document.getElementById('noticeImagePreview').style.display = 'none';
    }
    
    document.querySelector('#addNoticeForm .form-title span').textContent = 'Edit Notice';
    document.getElementById('addNoticeForm').style.display = 'block';
    
    lucide.createIcons();
}

function deleteNotice(noticeId) {
    if (confirm('Are you sure you want to delete this notice?')) {
        notices = notices.filter(n => n.id !== noticeId);
        saveNoticesToStorage();
        displayNotices();
    }
}

function displayNotices() {
    const grid = document.getElementById('noticesGrid');
    if (!grid) return;
    
    // Get existing hardcoded notices (first 2 children)
    const existingNotices = grid.querySelectorAll('.notice-card');
    const hardcodedNoticesHTML = Array.from(existingNotices).map(card => card.outerHTML).join('');
    
    // Filter notices based on user role
    const filteredNotices = notices.filter(notice => {
        if (currentUser.role === 'admin') return true;
        return notice.visibleTo && notice.visibleTo.includes(currentUser.role);
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Generate dynamic notices HTML
    const dynamicNoticesHTML = filteredNotices.map(notice => `
        <div class="notice-card">
            <div class="notice-header">
                ${currentUser.role === 'admin' ? `
                    <div class="admin-actions">
                        <button class="edit-btn" onclick="editNotice(${notice.id})">
                            <i data-lucide="edit"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteNotice(${notice.id})">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                ` : ''}
            </div>
            <div class="notice-header-info">
                <h3 class="notice-title">${notice.title}</h3>
            </div>
            <div class="notice-meta">
                <div class="notice-date">
                    <i data-lucide="calendar"></i>
                    <span>${new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div class="notice-author">
                    <i data-lucide="user"></i>
                    <span>Posted by: ${notice.createdBy ? notice.createdBy.split('@')[0].charAt(0).toUpperCase() + notice.createdBy.split('@')[0].slice(1) : 'Admin'}</span>
                </div>
            </div>
            ${notice.image ? `
                <div class="notice-image">
                    <img src="${notice.image}" alt="${notice.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin: 1rem 0;">
                </div>
            ` : ''}
            <p class="notice-description">${notice.description}</p>
            ${notice.visibleTo && notice.visibleTo.length > 0 ? `
                <div class="notice-visibility">
                    <i data-lucide="eye"></i>
                    <span>Visible to: ${notice.visibleTo.map(role => role.charAt(0).toUpperCase() + role.slice(1)).join(', ')}</span>
                </div>
            ` : ''}
        </div>
    `).join('');
    
    // Combine hardcoded and dynamic notices
    grid.innerHTML = hardcodedNoticesHTML + dynamicNoticesHTML;
    
    lucide.createIcons();
}

function saveNoticesToStorage() {
    localStorage.setItem('libraryNotices', JSON.stringify(notices));
}

// Book Reader Functions
function openBookReader(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    // If book has PDF, open it directly in new tab
    if (book.pdfUrl) {
        window.open(book.pdfUrl, '_blank');
        return;
    }
    
    // Otherwise show the book reader modal
    // Set book details
    document.getElementById('readerBookTitle').textContent = book.title;
    document.getElementById('readerAuthor').textContent = book.author;
    document.getElementById('readerYear').textContent = book.year;
    document.getElementById('readerGenre').textContent = book.genre || 'N/A';
    document.getElementById('readerDescription').textContent = book.description;
    
    // Generate sample book content (you can replace this with actual book text)
    const bookContent = generateBookContent(book);
    document.getElementById('readerText').innerHTML = bookContent;
    
    // Show modal
    document.getElementById('bookReaderModal').style.display = 'flex';
    lucide.createIcons();
}

function closeBookReader() {
    document.getElementById('bookReaderModal').style.display = 'none';
}

function generateBookContent(book) {
    // Sample book content - replace with actual book text from database/API
    return `
        <h3>Chapter 1: Introduction</h3>
        <p>
            Welcome to "${book.title}" by ${book.author}. This ${book.genre} masterpiece, published in ${book.year}, 
            takes readers on an unforgettable journey through its pages.
        </p>
        <p>
            ${book.description} The narrative unfolds with compelling characters and intricate plotlines 
            that have captivated readers for generations.
        </p>
        
        <h3>Chapter 2: The Story Begins</h3>
        <p>
            As the story opens, we are introduced to a world filled with wonder and intrigue. 
            The author's masterful storytelling brings every scene to life with vivid descriptions 
            and deep character development.
        </p>
        <p>
            Each page turns with anticipation as the plot thickens and the characters face 
            challenges that test their resolve and shape their destinies.
        </p>
        
        <h3>Chapter 3: Development</h3>
        <p>
            The narrative continues to build momentum, weaving together various plot threads 
            into a tapestry of literary excellence. Readers find themselves immersed in the 
            world created by ${book.author}.
        </p>
        <p>
            <em>Note: This is a sample preview. The full book content would be loaded from your database or book repository.</em>
        </p>
    `;
}

// Notes Management Functions
function toggleAddNoteForm() {
    const form = document.getElementById('addNoteForm');
    const formTitle = document.querySelector('#addNoteForm .form-title span');
    const saveBtn = document.querySelector('#addNoteForm .save-btn');
    
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        clearNoteForm();
        editingNoteId = null;
        formTitle.textContent = 'Add New Notes';
        saveBtn.textContent = 'Save Notes';
    } else {
        form.style.display = 'none';
        editingNoteId = null;
    }
    lucide.createIcons();
}

function clearNoteForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteSubject').value = '';
    document.getElementById('noteClass').value = '';
    document.getElementById('noteTopic').value = '';
    document.getElementById('noteDescription').value = '';
    document.getElementById('notePdfFile').value = '';
    document.getElementById('assignNoteStudent').checked = true;
    document.getElementById('assignNoteTeacher').checked = true;
}

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const subject = document.getElementById('noteSubject').value;
    const classLevel = document.getElementById('noteClass').value;
    const topic = document.getElementById('noteTopic').value;
    const description = document.getElementById('noteDescription').value;
    const pdfFile = document.getElementById('notePdfFile').value.trim();
    
    // Get assigned roles
    const assignedTo = [];
    if (document.getElementById('assignNoteStudent').checked) assignedTo.push('student');
    if (document.getElementById('assignNoteTeacher').checked) assignedTo.push('teacher');
    
    if (!title || !subject) {
        alert('Please fill in at least Title and Subject!');
        return;
    }
    
    if (assignedTo.length === 0) {
        alert('Please assign notes to at least one role!');
        return;
    }
    
    // Generate PDF URL if filename provided
    let pdfUrl = '';
    if (pdfFile) {
        // Check if it's a full URL
        if (pdfFile.startsWith('http://') || pdfFile.startsWith('https://')) {
            pdfUrl = pdfFile;
        } else {
            // Generate GitHub Pages URL
            pdfUrl = `https://kapilrana1.github.io/inter-college-bazpur-library/books/${pdfFile}`;
        }
    }
    
    const newNote = {
        id: Date.now(),
        title: title,
        subject: subject,
        class: classLevel,
        topic: topic,
        description: description,
        pdfUrl: pdfUrl,
        addedBy: currentUser.name,
        assignedTo: assignedTo
    };
    
    if (editingNoteId) {
        // Update existing note
        const noteIndex = notes.findIndex(n => n.id === editingNoteId);
        if (noteIndex !== -1) {
            notes[noteIndex] = { ...notes[noteIndex], ...newNote, id: editingNoteId };
        }
        editingNoteId = null;
    } else {
        // Add new note
        notes.push(newNote);
    }
    
    saveNotesToStorage();
    displayNotes();
    toggleAddNoteForm();
    clearNoteForm();
}

function deleteNote(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes = notes.filter(note => note.id !== noteId);
        saveNotesToStorage();
        displayNotes();
    }
}

function editNote(noteId) {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;
    
    // Fill form with note data
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteSubject').value = note.subject || '';
    document.getElementById('noteClass').value = note.class || '';
    document.getElementById('noteTopic').value = note.topic || '';
    document.getElementById('noteDescription').value = note.description || '';
    
    // Extract filename from GitHub Pages URL or use full URL
    if (note.pdfUrl) {
        const githubPagesPattern = 'https://kapilrana1.github.io/inter-college-bazpur-library/books/';
        if (note.pdfUrl.startsWith(githubPagesPattern)) {
            document.getElementById('notePdfFile').value = note.pdfUrl.substring(githubPagesPattern.length);
        } else {
            document.getElementById('notePdfFile').value = note.pdfUrl;
        }
    } else {
        document.getElementById('notePdfFile').value = '';
    }
    
    // Set assigned roles
    document.getElementById('assignNoteStudent').checked = note.assignedTo?.includes('student') || false;
    document.getElementById('assignNoteTeacher').checked = note.assignedTo?.includes('teacher') || false;
    
    // Update form title and button
    const formTitle = document.querySelector('#addNoteForm .form-title span');
    const saveBtn = document.querySelector('#addNoteForm .save-btn');
    formTitle.textContent = 'Edit Notes';
    saveBtn.textContent = 'Update Notes';
    
    // Show form and set editing mode
    editingNoteId = noteId;
    document.getElementById('addNoteForm').style.display = 'block';
    lucide.createIcons();
    
    // Scroll to form
    document.getElementById('addNoteForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function displayNotes() {
    const grid = document.getElementById('notesGrid');
    if (!grid) return;
    
    // Filter notes based on user role
    const filteredNotes = notes.filter(note => {
        // Admin can see all notes
        if (currentUser.role === 'admin') {
            return true;
        }
        // Students and Teachers only see assigned notes
        if (!note.assignedTo || !note.assignedTo.includes(currentUser.role)) {
            return false;
        }
        return true;
    });
    
    if (filteredNotes.length === 0) {
        grid.innerHTML = `
            <div class="no-books">
                <i data-lucide="file-text" class="no-books-icon"></i>
                <p class="no-books-text">No notes available</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    grid.innerHTML = filteredNotes.map(note => `
        <div class="book-card note-card">
            <div class="book-header">
                <div class="book-header-left">
                    <i data-lucide="file-text" class="book-icon"></i>
                    <span class="note-badge">${note.subject}</span>
                </div>
                ${currentUser.role === 'admin' ? `
                    <div class="admin-actions">
                        <button class="edit-btn" onclick="editNote(${note.id})">
                            <i data-lucide="edit"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteNote(${note.id})">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                ` : ''}
            </div>
            <h3 class="book-title">${note.title}</h3>
            <div class="book-details">
                ${note.class ? `
                    <div class="book-detail">
                        <i data-lucide="graduation-cap"></i>
                        <span>Class ${note.class}</span>
                    </div>
                ` : ''}
                ${note.topic ? `
                    <div class="book-detail">
                        <i data-lucide="bookmark"></i>
                        <span>${note.topic}</span>
                    </div>
                ` : ''}
            </div>
            ${note.description ? `<p class="book-description">${note.description}</p>` : ''}
            ${note.pdfUrl ? `
                <div class="note-actions">
                    <a href="${note.pdfUrl}" target="_blank" class="note-link">
                        <i data-lucide="external-link"></i>
                        <span>Open Notes</span>
                    </a>
                </div>
            ` : ''}
            ${note.assignedTo && note.assignedTo.length > 0 ? `
                <div class="assigned-badges">
                    ${note.assignedTo.map(role => `
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