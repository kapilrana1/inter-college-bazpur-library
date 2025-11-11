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
    
    // Force reload books (version 2.0 - 100 books)
    const BOOKS_VERSION = '4.0';
    const savedVersion = localStorage.getItem('booksVersion');
    
    // Load books from localStorage or use default books
    const savedBooks = localStorage.getItem('libraryBooks');
    if (savedBooks && savedVersion === BOOKS_VERSION) {
        books = JSON.parse(savedBooks);
    } else {
        // Clear old data and load new 100 books
        localStorage.removeItem('libraryBooks');
        localStorage.setItem('booksVersion', BOOKS_VERSION);
        books = [
            // Story Books (1-20)
            { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925', genre: 'Fiction', rating: 5, description: 'A classic American novel about the Jazz Age', assignedTo: ['student', 'teacher'] },
            { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: '1960', genre: 'Fiction', rating: 5, description: 'A story of racial injustice and childhood innocence', assignedTo: ['student', 'teacher'] },
            { id: 3, title: '1984', author: 'George Orwell', year: '1949', genre: 'Fiction', rating: 5, description: 'A dystopian social science fiction novel', assignedTo: ['student', 'teacher'] },
            { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: '1813', genre: 'Romance', rating: 5, description: 'A romantic novel of manners', assignedTo: ['student', 'teacher'] },
            { id: 5, title: "Grandma's Bag of Stories", author: 'Sudha Murthy', year: '2015', genre: 'Children Fiction', rating: 5, description: 'A delightful collection of stories told by a grandmother', assignedTo: ['student', 'teacher'], pdf: 'https://raw.githubusercontent.com/kapilrana1/inter-college-bazpur-library/main/books/Grandma%27s%20Bag%20of%20Stories%20by%20Sudha%20Murthy.pdf' },
            { id: 6, title: 'The Magic Drum', author: 'Sudha Murthy', year: '2016', genre: 'Children Fiction', rating: 5, description: 'Enchanting tales and moral stories for children', assignedTo: ['student', 'teacher'] },
            { id: 7, title: 'Harry Potter and the Philosopher Stone', author: 'J.K. Rowling', year: '1997', genre: 'Fantasy', rating: 5, description: 'A young wizard discovers his magical heritage', assignedTo: ['student', 'teacher'] },
            { id: 8, title: 'The Alchemist', author: 'Paulo Coelho', year: '1988', genre: 'Fiction', rating: 5, description: 'A shepherd boy journey to find treasure', assignedTo: ['student', 'teacher'] },
            { id: 9, title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', year: '1943', genre: 'Children Fiction', rating: 5, description: 'A story about love, loss, and human nature', assignedTo: ['student', 'teacher'] },
            { id: 10, title: 'Charlotte Web', author: 'E.B. White', year: '1952', genre: 'Children Fiction', rating: 5, description: 'A story of friendship between a pig and a spider', assignedTo: ['student', 'teacher'] },
            { id: 11, title: 'The Jungle Book', author: 'Rudyard Kipling', year: '1894', genre: 'Adventure', rating: 5, description: 'Adventures of Mowgli in the Indian jungle', assignedTo: ['student', 'teacher'] },
            { id: 12, title: 'Alice in Wonderland', author: 'Lewis Carroll', year: '1865', genre: 'Fantasy', rating: 5, description: 'A girl falls down a rabbit hole into a fantasy world', assignedTo: ['student', 'teacher'] },
            { id: 13, title: 'The Adventures of Tom Sawyer', author: 'Mark Twain', year: '1876', genre: 'Adventure', rating: 5, description: 'Adventures of a mischievous boy in Missouri', assignedTo: ['student', 'teacher'] },
            { id: 14, title: 'Treasure Island', author: 'Robert Louis Stevenson', year: '1883', genre: 'Adventure', rating: 5, description: 'A quest for buried treasure', assignedTo: ['student', 'teacher'] },
            { id: 15, title: 'The Secret Garden', author: 'Frances Hodgson Burnett', year: '1911', genre: 'Children Fiction', rating: 5, description: 'A girl discovers a magical garden', assignedTo: ['student', 'teacher'] },
            { id: 16, title: 'Anne of Green Gables', author: 'L.M. Montgomery', year: '1908', genre: 'Fiction', rating: 5, description: 'An orphan girl journey to find a home', assignedTo: ['student', 'teacher'] },
            { id: 17, title: 'Heidi', author: 'Johanna Spyri', year: '1881', genre: 'Children Fiction', rating: 5, description: 'A Swiss girl life in the Alps', assignedTo: ['student', 'teacher'] },
            { id: 18, title: 'The Wind in the Willows', author: 'Kenneth Grahame', year: '1908', genre: 'Children Fiction', rating: 5, description: 'Adventures of anthropomorphic animals', assignedTo: ['student', 'teacher'] },
            { id: 19, title: 'Peter Pan', author: 'J.M. Barrie', year: '1911', genre: 'Fantasy', rating: 5, description: 'The boy who never grows up', assignedTo: ['student', 'teacher'] },
            { id: 20, title: 'The Chronicles of Narnia', author: 'C.S. Lewis', year: '1950', genre: 'Fantasy', rating: 5, description: 'Children discover a magical world', assignedTo: ['student', 'teacher'] },
            
            // Science Books (21-40)
            { id: 21, title: 'A Brief History of Time', author: 'Stephen Hawking', year: '1988', genre: 'Science', rating: 5, description: 'Cosmology and the universe explained', assignedTo: ['student', 'teacher'] },
            { id: 22, title: 'Cosmos', author: 'Carl Sagan', year: '1980', genre: 'Science', rating: 5, description: 'Journey through space and time', assignedTo: ['student', 'teacher'] },
            { id: 23, title: 'The Origin of Species', author: 'Charles Darwin', year: '1859', genre: 'Science', rating: 5, description: 'Foundation of evolutionary biology', assignedTo: ['student', 'teacher'] },
            { id: 24, title: 'The Selfish Gene', author: 'Richard Dawkins', year: '1976', genre: 'Science', rating: 5, description: 'Gene-centered view of evolution', assignedTo: ['student', 'teacher'] },
            { id: 25, title: 'Sapiens', author: 'Yuval Noah Harari', year: '2011', genre: 'Science', rating: 5, description: 'A brief history of humankind', assignedTo: ['student', 'teacher'] },
            { id: 26, title: 'The Double Helix', author: 'James Watson', year: '1968', genre: 'Science', rating: 5, description: 'Discovery of DNA structure', assignedTo: ['student', 'teacher'] },
            { id: 27, title: 'The Elegant Universe', author: 'Brian Greene', year: '1999', genre: 'Science', rating: 5, description: 'String theory and physics', assignedTo: ['student', 'teacher'] },
            { id: 28, title: 'The Demon-Haunted World', author: 'Carl Sagan', year: '1995', genre: 'Science', rating: 5, description: 'Science as a candle in the dark', assignedTo: ['student', 'teacher'] },
            { id: 29, title: 'Relativity', author: 'Albert Einstein', year: '1916', genre: 'Science', rating: 5, description: 'The special and general theory', assignedTo: ['student', 'teacher'] },
            { id: 30, title: 'The Feynman Lectures on Physics', author: 'Richard Feynman', year: '1964', genre: 'Science', rating: 5, description: 'Comprehensive physics lectures', assignedTo: ['student', 'teacher'] },
            { id: 31, title: 'The Structure of Scientific Revolutions', author: 'Thomas Kuhn', year: '1962', genre: 'Science', rating: 5, description: 'How science progresses', assignedTo: ['student', 'teacher'] },
            { id: 32, title: 'Silent Spring', author: 'Rachel Carson', year: '1962', genre: 'Science', rating: 5, description: 'Environmental science classic', assignedTo: ['student', 'teacher'] },
            { id: 33, title: 'The Emperor New Mind', author: 'Roger Penrose', year: '1989', genre: 'Science', rating: 5, description: 'Consciousness and quantum mechanics', assignedTo: ['student', 'teacher'] },
            { id: 34, title: 'Gödel Escher Bach', author: 'Douglas Hofstadter', year: '1979', genre: 'Science', rating: 5, description: 'An eternal golden braid', assignedTo: ['student', 'teacher'] },
            { id: 35, title: 'The First Three Minutes', author: 'Steven Weinberg', year: '1977', genre: 'Science', rating: 5, description: 'Modern view of origin of universe', assignedTo: ['student', 'teacher'] },
            { id: 36, title: 'The Gene', author: 'Siddhartha Mukherjee', year: '2016', genre: 'Science', rating: 5, description: 'An intimate history', assignedTo: ['student', 'teacher'] },
            { id: 37, title: 'The Hidden Life of Trees', author: 'Peter Wohlleben', year: '2015', genre: 'Science', rating: 5, description: 'What they feel and communicate', assignedTo: ['student', 'teacher'] },
            { id: 38, title: 'The Sixth Extinction', author: 'Elizabeth Kolbert', year: '2014', genre: 'Science', rating: 5, description: 'An unnatural history', assignedTo: ['student', 'teacher'] },
            { id: 39, title: 'Lab Girl', author: 'Hope Jahren', year: '2016', genre: 'Science', rating: 5, description: 'A story of plants and science', assignedTo: ['student', 'teacher'] },
            { id: 40, title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', year: '2010', genre: 'Science', rating: 5, description: 'Medical ethics and HeLa cells', assignedTo: ['student', 'teacher'] },
            
            // Yoga & Wellness Books (41-55)
            { id: 41, title: 'Light on Yoga', author: 'B.K.S. Iyengar', year: '1966', genre: 'Yoga', rating: 5, description: 'Comprehensive guide to yoga', assignedTo: ['student', 'teacher'] },
            { id: 42, title: 'The Yoga Sutras of Patanjali', author: 'Patanjali', year: '400', genre: 'Yoga', rating: 5, description: 'Ancient yoga philosophy', assignedTo: ['student', 'teacher'] },
            { id: 43, title: 'Autobiography of a Yogi', author: 'Paramahansa Yogananda', year: '1946', genre: 'Yoga', rating: 5, description: 'Spiritual journey and yoga', assignedTo: ['student', 'teacher'] },
            { id: 44, title: 'The Heart of Yoga', author: 'T.K.V. Desikachar', year: '1995', genre: 'Yoga', rating: 5, description: 'Developing personal practice', assignedTo: ['student', 'teacher'] },
            { id: 45, title: 'Asana Pranayama Mudra Bandha', author: 'Swami Satyananda Saraswati', year: '1969', genre: 'Yoga', rating: 5, description: 'Yoga techniques guide', assignedTo: ['student', 'teacher'] },
            { id: 46, title: 'The Complete Illustrated Book of Yoga', author: 'Swami Vishnu-devananda', year: '1960', genre: 'Yoga', rating: 5, description: 'Comprehensive yoga manual', assignedTo: ['student', 'teacher'] },
            { id: 47, title: 'Yoga Anatomy', author: 'Leslie Kaminoff', year: '2007', genre: 'Yoga', rating: 5, description: 'Understanding yoga postures', assignedTo: ['student', 'teacher'] },
            { id: 48, title: 'The Science of Yoga', author: 'William J. Broad', year: '2012', genre: 'Yoga', rating: 5, description: 'Risks and rewards', assignedTo: ['student', 'teacher'] },
            { id: 49, title: 'Bhagavad Gita', author: 'Vyasa', year: '500 BCE', genre: 'Philosophy', rating: 5, description: 'Ancient Hindu scripture', assignedTo: ['student', 'teacher'] },
            { id: 50, title: 'The Miracle of Mindfulness', author: 'Thich Nhat Hanh', year: '1975', genre: 'Mindfulness', rating: 5, description: 'Introduction to meditation', assignedTo: ['student', 'teacher'] },
            { id: 51, title: 'Wherever You Go There You Are', author: 'Jon Kabat-Zinn', year: '1994', genre: 'Mindfulness', rating: 5, description: 'Mindfulness meditation guide', assignedTo: ['student', 'teacher'] },
            { id: 52, title: 'The Power of Now', author: 'Eckhart Tolle', year: '1997', genre: 'Spirituality', rating: 5, description: 'Guide to spiritual enlightenment', assignedTo: ['student', 'teacher'] },
            { id: 53, title: 'Meditation for Beginners', author: 'Jack Kornfield', year: '2004', genre: 'Meditation', rating: 5, description: 'Starting meditation practice', assignedTo: ['student', 'teacher'] },
            { id: 54, title: 'The Relaxation Response', author: 'Herbert Benson', year: '1975', genre: 'Wellness', rating: 5, description: 'Stress reduction techniques', assignedTo: ['student', 'teacher'] },
            { id: 55, title: 'Pranayama The Breath of Yoga', author: 'Gregor Maehle', year: '2012', genre: 'Yoga', rating: 5, description: 'Breathing techniques in yoga', assignedTo: ['student', 'teacher'] },
            
            // Computer Programming Books (56-100)
            { id: 56, title: 'Clean Code', author: 'Robert C. Martin', year: '2008', genre: 'Programming', rating: 5, description: 'A handbook of agile software craftsmanship', assignedTo: ['student', 'teacher'] },
            { id: 57, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', year: '1999', genre: 'Programming', rating: 5, description: 'From journeyman to master', assignedTo: ['student', 'teacher'] },
            { id: 58, title: 'Code Complete', author: 'Steve McConnell', year: '1993', genre: 'Programming', rating: 5, description: 'A practical handbook', assignedTo: ['student', 'teacher'] },
            { id: 59, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', year: '1990', genre: 'Computer Science', rating: 5, description: 'Comprehensive algorithms textbook', assignedTo: ['student', 'teacher'] },
            { id: 60, title: 'Design Patterns', author: 'Gang of Four', year: '1994', genre: 'Programming', rating: 5, description: 'Elements of reusable software', assignedTo: ['student', 'teacher'] },
            { id: 61, title: 'Structure and Interpretation of Computer Programs', author: 'Harold Abelson', year: '1985', genre: 'Computer Science', rating: 5, description: 'SICP programming fundamentals', assignedTo: ['student', 'teacher'] },
            { id: 62, title: 'The Art of Computer Programming', author: 'Donald Knuth', year: '1968', genre: 'Computer Science', rating: 5, description: 'Comprehensive programming treatise', assignedTo: ['student', 'teacher'] },
            { id: 63, title: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell', year: '2008', genre: 'Programming', rating: 5, description: 'Tech interview preparation', assignedTo: ['student', 'teacher'] },
            { id: 64, title: 'You Don Know JS', author: 'Kyle Simpson', year: '2014', genre: 'JavaScript', rating: 5, description: 'Deep JavaScript knowledge', assignedTo: ['student', 'teacher'] },
            { id: 65, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', year: '2011', genre: 'JavaScript', rating: 5, description: 'Modern introduction to programming', assignedTo: ['student', 'teacher'] },
            { id: 66, title: 'Python Crash Course', author: 'Eric Matthes', year: '2015', genre: 'Python', rating: 5, description: 'Hands-on project-based intro', assignedTo: ['student', 'teacher'] },
            { id: 67, title: 'Automate the Boring Stuff with Python', author: 'Al Sweigart', year: '2015', genre: 'Python', rating: 5, description: 'Practical programming for beginners', assignedTo: ['student', 'teacher'] },
            { id: 68, title: 'Learning Python', author: 'Mark Lutz', year: '1999', genre: 'Python', rating: 5, description: 'Comprehensive Python guide', assignedTo: ['student', 'teacher'] },
            { id: 69, title: 'Effective Java', author: 'Joshua Bloch', year: '2001', genre: 'Java', rating: 5, description: 'Best practices for Java', assignedTo: ['student', 'teacher'] },
            { id: 70, title: 'Head First Java', author: 'Kathy Sierra', year: '2003', genre: 'Java', rating: 5, description: 'Brain-friendly Java guide', assignedTo: ['student', 'teacher'] },
            { id: 71, title: 'Java The Complete Reference', author: 'Herbert Schildt', year: '1996', genre: 'Java', rating: 5, description: 'Comprehensive Java handbook', assignedTo: ['student', 'teacher'] },
            { id: 72, title: 'The C Programming Language', author: 'Brian Kernighan', year: '1978', genre: 'C Programming', rating: 5, description: 'Definitive C language guide', assignedTo: ['student', 'teacher'] },
            { id: 73, title: 'C++ Primer', author: 'Stanley Lippman', year: '1989', genre: 'C++', rating: 5, description: 'Comprehensive C++ introduction', assignedTo: ['student', 'teacher'] },
            { id: 74, title: 'Effective Modern C++', author: 'Scott Meyers', year: '2014', genre: 'C++', rating: 5, description: 'Modern C++ best practices', assignedTo: ['student', 'teacher'] },
            { id: 75, title: 'Learning SQL', author: 'Alan Beaulieu', year: '2005', genre: 'Database', rating: 5, description: 'Master SQL fundamentals', assignedTo: ['student', 'teacher'] },
            { id: 76, title: 'SQL in 10 Minutes', author: 'Ben Forta', year: '1999', genre: 'Database', rating: 5, description: 'Quick SQL tutorial', assignedTo: ['student', 'teacher'] },
            { id: 77, title: 'Database System Concepts', author: 'Abraham Silberschatz', year: '1986', genre: 'Database', rating: 5, description: 'Database fundamentals', assignedTo: ['student', 'teacher'] },
            { id: 78, title: 'Web Development with Node and Express', author: 'Ethan Brown', year: '2014', genre: 'Web Development', rating: 5, description: 'Building web applications', assignedTo: ['student', 'teacher'] },
            { id: 79, title: 'HTML and CSS', author: 'Jon Duckett', year: '2011', genre: 'Web Development', rating: 5, description: 'Design and build websites', assignedTo: ['student', 'teacher'] },
            { id: 80, title: 'JavaScript and jQuery', author: 'Jon Duckett', year: '2014', genre: 'Web Development', rating: 5, description: 'Interactive front-end development', assignedTo: ['student', 'teacher'] },
            { id: 81, title: 'React Up and Running', author: 'Stoyan Stefanov', year: '2016', genre: 'Web Development', rating: 5, description: 'Building web applications', assignedTo: ['student', 'teacher'] },
            { id: 82, title: 'Learning React', author: 'Alex Banks', year: '2017', genre: 'Web Development', rating: 5, description: 'Modern patterns for developing', assignedTo: ['student', 'teacher'] },
            { id: 83, title: 'Pro Git', author: 'Scott Chacon', year: '2009', genre: 'Version Control', rating: 5, description: 'Everything about Git', assignedTo: ['student', 'teacher'] },
            { id: 84, title: 'The Linux Command Line', author: 'William Shotts', year: '2012', genre: 'Linux', rating: 5, description: 'Complete introduction to Linux', assignedTo: ['student', 'teacher'] },
            { id: 85, title: 'Linux Pocket Guide', author: 'Daniel J. Barrett', year: '2004', genre: 'Linux', rating: 5, description: 'Essential commands', assignedTo: ['student', 'teacher'] },
            { id: 86, title: 'Operating System Concepts', author: 'Abraham Silberschatz', year: '1983', genre: 'Computer Science', rating: 5, description: 'OS fundamentals', assignedTo: ['student', 'teacher'] },
            { id: 87, title: 'Computer Networks', author: 'Andrew Tanenbaum', year: '1981', genre: 'Networking', rating: 5, description: 'Network fundamentals', assignedTo: ['student', 'teacher'] },
            { id: 88, title: 'Computer Organization and Design', author: 'David Patterson', year: '1994', genre: 'Computer Science', rating: 5, description: 'Hardware/software interface', assignedTo: ['student', 'teacher'] },
            { id: 89, title: 'Artificial Intelligence A Modern Approach', author: 'Stuart Russell', year: '1995', genre: 'AI', rating: 5, description: 'Comprehensive AI textbook', assignedTo: ['student', 'teacher'] },
            { id: 90, title: 'Deep Learning', author: 'Ian Goodfellow', year: '2016', genre: 'Machine Learning', rating: 5, description: 'Neural networks guide', assignedTo: ['student', 'teacher'] },
            { id: 91, title: 'Hands-On Machine Learning', author: 'Aurélien Géron', year: '2017', genre: 'Machine Learning', rating: 5, description: 'Scikit-Learn and TensorFlow', assignedTo: ['student', 'teacher'] },
            { id: 92, title: 'Pattern Recognition and Machine Learning', author: 'Christopher Bishop', year: '2006', genre: 'Machine Learning', rating: 5, description: 'ML fundamentals', assignedTo: ['student', 'teacher'] },
            { id: 93, title: 'Data Science from Scratch', author: 'Joel Grus', year: '2015', genre: 'Data Science', rating: 5, description: 'First principles with Python', assignedTo: ['student', 'teacher'] },
            { id: 94, title: 'Python for Data Analysis', author: 'Wes McKinney', year: '2012', genre: 'Data Science', rating: 5, description: 'Data wrangling with Pandas', assignedTo: ['student', 'teacher'] },
            { id: 95, title: 'The Elements of Statistical Learning', author: 'Trevor Hastie', year: '2001', genre: 'Statistics', rating: 5, description: 'Data mining and prediction', assignedTo: ['student', 'teacher'] },
            { id: 96, title: 'Algorithms to Live By', author: 'Brian Christian', year: '2016', genre: 'Computer Science', rating: 5, description: 'Computer science in everyday life', assignedTo: ['student', 'teacher'] },
            { id: 97, title: 'The Code Book', author: 'Simon Singh', year: '1999', genre: 'Cryptography', rating: 5, description: 'Science of secrecy', assignedTo: ['student', 'teacher'] },
            { id: 98, title: 'Cryptography and Network Security', author: 'William Stallings', year: '1998', genre: 'Security', rating: 5, description: 'Principles and practice', assignedTo: ['student', 'teacher'] },
            { id: 99, title: 'The Phoenix Project', author: 'Gene Kim', year: '2013', genre: 'DevOps', rating: 5, description: 'IT revolution novel', assignedTo: ['student', 'teacher'] },
            { id: 100, title: 'Site Reliability Engineering', author: 'Betsy Beyer', year: '2016', genre: 'DevOps', rating: 5, description: 'How Google runs production', assignedTo: ['student', 'teacher'] },
            
            // Additional Science Books (101-150) - Physics, Chemistry, Biology, Astronomy, etc.
            { id: 101, title: 'The Grand Design', author: 'Stephen Hawking', year: '2010', genre: 'Physics', rating: 5, description: 'New answers to ultimate questions', assignedTo: ['student', 'teacher'] },
            { id: 102, title: 'QED The Strange Theory', author: 'Richard Feynman', year: '1985', genre: 'Physics', rating: 5, description: 'Quantum electrodynamics explained', assignedTo: ['student', 'teacher'] },
            { id: 103, title: 'The Fabric of the Cosmos', author: 'Brian Greene', year: '2004', genre: 'Physics', rating: 5, description: 'Space time and texture of reality', assignedTo: ['student', 'teacher'] },
            { id: 104, title: 'Seven Brief Lessons on Physics', author: 'Carlo Rovelli', year: '2014', genre: 'Physics', rating: 5, description: 'Beautiful introduction to physics', assignedTo: ['student', 'teacher'] },
            { id: 105, title: 'The Order of Time', author: 'Carlo Rovelli', year: '2017', genre: 'Physics', rating: 5, description: 'Understanding time in physics', assignedTo: ['student', 'teacher'] },
            { id: 106, title: 'Black Holes and Time Warps', author: 'Kip Thorne', year: '1994', genre: 'Astrophysics', rating: 5, description: 'Einstein outrageous legacy', assignedTo: ['student', 'teacher'] },
            { id: 107, title: 'Astrophysics for People in a Hurry', author: 'Neil deGrasse Tyson', year: '2017', genre: 'Astrophysics', rating: 5, description: 'Quick universe overview', assignedTo: ['student', 'teacher'] },
            { id: 108, title: 'The Big Picture', author: 'Sean Carroll', year: '2016', genre: 'Physics', rating: 5, description: 'Origins of life meaning and universe', assignedTo: ['student', 'teacher'] },
            { id: 109, title: 'Something Deeply Hidden', author: 'Sean Carroll', year: '2019', genre: 'Quantum Physics', rating: 5, description: 'Quantum worlds and emergence', assignedTo: ['student', 'teacher'] },
            { id: 110, title: 'The Quantum Universe', author: 'Brian Cox', year: '2011', genre: 'Quantum Physics', rating: 5, description: 'Everything that can happen does', assignedTo: ['student', 'teacher'] },
            { id: 111, title: 'Periodic Tales', author: 'Hugh Aldersey-Williams', year: '2011', genre: 'Chemistry', rating: 5, description: 'Cultural history of elements', assignedTo: ['student', 'teacher'] },
            { id: 112, title: 'The Disappearing Spoon', author: 'Sam Kean', year: '2010', genre: 'Chemistry', rating: 5, description: 'Madness love and history', assignedTo: ['student', 'teacher'] },
            { id: 113, title: 'Napoleon Button', author: 'Penny Le Couteur', year: '2003', genre: 'Chemistry', rating: 5, description: 'How molecules changed history', assignedTo: ['student', 'teacher'] },
            { id: 114, title: 'The Chemistry Book', author: 'Derek Lowe', year: '2016', genre: 'Chemistry', rating: 5, description: 'Big ideas simply explained', assignedTo: ['student', 'teacher'] },
            { id: 115, title: 'Stuff Matters', author: 'Mark Miodownik', year: '2013', genre: 'Materials Science', rating: 5, description: 'Exploring marvelous materials', assignedTo: ['student', 'teacher'] },
            { id: 116, title: 'The Cell', author: 'Joshua Z. Rappoport', year: '2016', genre: 'Biology', rating: 5, description: 'Inside the microscopic world', assignedTo: ['student', 'teacher'] },
            { id: 117, title: 'The Song of the Cell', author: 'Siddhartha Mukherjee', year: '2022', genre: 'Biology', rating: 5, description: 'Exploration of medicine and biology', assignedTo: ['student', 'teacher'] },
            { id: 118, title: 'Life on the Edge', author: 'Johnjoe McFadden', year: '2014', genre: 'Biology', rating: 5, description: 'Quantum biology revolution', assignedTo: ['student', 'teacher'] },
            { id: 119, title: 'The Vital Question', author: 'Nick Lane', year: '2015', genre: 'Biology', rating: 5, description: 'Energy evolution and origins', assignedTo: ['student', 'teacher'] },
            { id: 120, title: 'The Body', author: 'Bill Bryson', year: '2019', genre: 'Biology', rating: 5, description: 'Guide for occupants', assignedTo: ['student', 'teacher'] },
            { id: 121, title: 'I Contain Multitudes', author: 'Ed Yong', year: '2016', genre: 'Microbiology', rating: 5, description: 'Microbes within us', assignedTo: ['student', 'teacher'] },
            { id: 122, title: 'The Emperor of All Maladies', author: 'Siddhartha Mukherjee', year: '2010', genre: 'Medicine', rating: 5, description: 'Biography of cancer', assignedTo: ['student', 'teacher'] },
            { id: 123, title: 'Being Mortal', author: 'Atul Gawande', year: '2014', genre: 'Medicine', rating: 5, description: 'Medicine and what matters', assignedTo: ['student', 'teacher'] },
            { id: 124, title: 'The Man Who Mistook His Wife', author: 'Oliver Sacks', year: '1985', genre: 'Neuroscience', rating: 5, description: 'Clinical tales', assignedTo: ['student', 'teacher'] },
            { id: 125, title: 'The Brain That Changes Itself', author: 'Norman Doidge', year: '2007', genre: 'Neuroscience', rating: 5, description: 'Stories of neuroplasticity', assignedTo: ['student', 'teacher'] },
            { id: 126, title: 'Behave', author: 'Robert Sapolsky', year: '2017', genre: 'Neuroscience', rating: 5, description: 'Biology of humans at best and worst', assignedTo: ['student', 'teacher'] },
            { id: 127, title: 'The Tell-Tale Brain', author: 'V.S. Ramachandran', year: '2011', genre: 'Neuroscience', rating: 5, description: 'Neuroscientist quest', assignedTo: ['student', 'teacher'] },
            { id: 128, title: 'Thinking Fast and Slow', author: 'Daniel Kahneman', year: '2011', genre: 'Psychology', rating: 5, description: 'Two systems of thinking', assignedTo: ['student', 'teacher'] },
            { id: 129, title: 'The Ancestor Tale', author: 'Richard Dawkins', year: '2004', genre: 'Evolution', rating: 5, description: 'Pilgrimage to dawn of life', assignedTo: ['student', 'teacher'] },
            { id: 130, title: 'Your Inner Fish', author: 'Neil Shubin', year: '2008', genre: 'Evolution', rating: 5, description: 'Journey into 3.5 billion years', assignedTo: ['student', 'teacher'] },
            { id: 131, title: 'The Beak of the Finch', author: 'Jonathan Weiner', year: '1994', genre: 'Evolution', rating: 5, description: 'Evolution in real time', assignedTo: ['student', 'teacher'] },
            { id: 132, title: 'The Third Chimpanzee', author: 'Jared Diamond', year: '1991', genre: 'Anthropology', rating: 5, description: 'Evolution and future', assignedTo: ['student', 'teacher'] },
            { id: 133, title: 'Guns Germs and Steel', author: 'Jared Diamond', year: '1997', genre: 'Anthropology', rating: 5, description: 'Fates of human societies', assignedTo: ['student', 'teacher'] },
            { id: 134, title: 'The Social Animal', author: 'Elliot Aronson', year: '1972', genre: 'Social Science', rating: 5, description: 'Introduction to social psychology', assignedTo: ['student', 'teacher'] },
            { id: 135, title: 'Pale Blue Dot', author: 'Carl Sagan', year: '1994', genre: 'Astronomy', rating: 5, description: 'Vision of human future in space', assignedTo: ['student', 'teacher'] },
            { id: 136, title: 'The 4 Percent Universe', author: 'Richard Panek', year: '2011', genre: 'Cosmology', rating: 5, description: 'Dark matter dark energy', assignedTo: ['student', 'teacher'] },
            { id: 137, title: 'The Illustrated Theory of Everything', author: 'Stephen Hawking', year: '2003', genre: 'Cosmology', rating: 5, description: 'Origin and fate of universe', assignedTo: ['student', 'teacher'] },
            { id: 138, title: 'The Day We Found the Universe', author: 'Marcia Bartusiak', year: '2009', genre: 'Astronomy', rating: 5, description: 'Discovery of galaxies', assignedTo: ['student', 'teacher'] },
            { id: 139, title: 'Coming of Age in the Milky Way', author: 'Timothy Ferris', year: '1988', genre: 'Astronomy', rating: 5, description: 'History of cosmology', assignedTo: ['student', 'teacher'] },
            { id: 140, title: 'The Perfect Theory', author: 'Pedro Ferreira', year: '2014', genre: 'Physics', rating: 5, description: 'Century of general relativity', assignedTo: ['student', 'teacher'] },
            { id: 141, title: 'The Greatest Show on Earth', author: 'Richard Dawkins', year: '2009', genre: 'Evolution', rating: 5, description: 'Evidence for evolution', assignedTo: ['student', 'teacher'] },
            { id: 142, title: 'The Dinosaur Heresies', author: 'Robert Bakker', year: '1986', genre: 'Paleontology', rating: 5, description: 'New theories about dinosaurs', assignedTo: ['student', 'teacher'] },
            { id: 143, title: 'The Rise and Fall of the Dinosaurs', author: 'Steve Brusatte', year: '2018', genre: 'Paleontology', rating: 5, description: 'New history of lost world', assignedTo: ['student', 'teacher'] },
            { id: 144, title: 'The Alchemy of Air', author: 'Thomas Hager', year: '2008', genre: 'Chemistry', rating: 5, description: 'Jewish genius and scientific discovery', assignedTo: ['student', 'teacher'] },
            { id: 145, title: 'The Making of the Atomic Bomb', author: 'Richard Rhodes', year: '1986', genre: 'Physics', rating: 5, description: 'History of nuclear weapons', assignedTo: ['student', 'teacher'] },
            { id: 146, title: 'The Information', author: 'James Gleick', year: '2011', genre: 'Information Theory', rating: 5, description: 'History theory flood', assignedTo: ['student', 'teacher'] },
            { id: 147, title: 'Chaos Making a New Science', author: 'James Gleick', year: '1987', genre: 'Mathematics', rating: 5, description: 'Introduction to chaos theory', assignedTo: ['student', 'teacher'] },
            { id: 148, title: 'Fermat Last Theorem', author: 'Simon Singh', year: '1997', genre: 'Mathematics', rating: 5, description: 'Epic quest to solve', assignedTo: ['student', 'teacher'] },
            { id: 149, title: 'The Man Who Knew Infinity', author: 'Robert Kanigel', year: '1991', genre: 'Mathematics', rating: 5, description: 'Life of genius Ramanujan', assignedTo: ['student', 'teacher'] },
            { id: 150, title: 'A Beautiful Mind', author: 'Sylvia Nasar', year: '1998', genre: 'Mathematics', rating: 5, description: 'Life of John Nash', assignedTo: ['student', 'teacher'] },
            
            // AI/ML Books (151-170) - Artificial Intelligence and Machine Learning
            { id: 151, title: 'Artificial Intelligence A Modern Approach', author: 'Stuart Russell', year: '2020', genre: 'AI/ML', rating: 5, description: 'Comprehensive AI textbook and reference', assignedTo: ['student', 'teacher'] },
            { id: 152, title: 'Deep Learning', author: 'Ian Goodfellow', year: '2016', genre: 'AI/ML', rating: 5, description: 'MIT Press deep learning bible', assignedTo: ['student', 'teacher'] },
            { id: 153, title: 'Pattern Recognition and Machine Learning', author: 'Christopher Bishop', year: '2006', genre: 'AI/ML', rating: 5, description: 'Classic ML textbook', assignedTo: ['student', 'teacher'] },
            { id: 154, title: 'Hands-On Machine Learning', author: 'Aurélien Géron', year: '2022', genre: 'AI/ML', rating: 5, description: 'Scikit-Learn Keras and TensorFlow', assignedTo: ['student', 'teacher'] },
            { id: 155, title: 'The Hundred-Page Machine Learning Book', author: 'Andriy Burkov', year: '2019', genre: 'AI/ML', rating: 5, description: 'Concise ML fundamentals', assignedTo: ['student', 'teacher'] },
            { id: 156, title: 'Machine Learning Yearning', author: 'Andrew Ng', year: '2018', genre: 'AI/ML', rating: 5, description: 'Technical strategy for AI engineers', assignedTo: ['student', 'teacher'] },
            { id: 157, title: 'Neural Networks and Deep Learning', author: 'Michael Nielsen', year: '2015', genre: 'AI/ML', rating: 5, description: 'Visual introduction to neural networks', assignedTo: ['student', 'teacher'] },
            { id: 158, title: 'Reinforcement Learning An Introduction', author: 'Richard Sutton', year: '2018', genre: 'AI/ML', rating: 5, description: 'Foundation of RL algorithms', assignedTo: ['student', 'teacher'] },
            { id: 159, title: 'The Master Algorithm', author: 'Pedro Domingos', year: '2015', genre: 'AI/ML', rating: 5, description: 'Quest for ultimate learning machine', assignedTo: ['student', 'teacher'] },
            { id: 160, title: 'Life 3.0', author: 'Max Tegmark', year: '2017', genre: 'AI/ML', rating: 5, description: 'Being human in age of AI', assignedTo: ['student', 'teacher'] },
            { id: 161, title: 'Superintelligence', author: 'Nick Bostrom', year: '2014', genre: 'AI/ML', rating: 5, description: 'Paths dangers strategies', assignedTo: ['student', 'teacher'] },
            { id: 162, title: 'Human Compatible', author: 'Stuart Russell', year: '2019', genre: 'AI/ML', rating: 5, description: 'AI and problem of control', assignedTo: ['student', 'teacher'] },
            { id: 163, title: 'Prediction Machines', author: 'Ajay Agrawal', year: '2018', genre: 'AI/ML', rating: 5, description: 'Simple economics of AI', assignedTo: ['student', 'teacher'] },
            { id: 164, title: 'AI Superpowers', author: 'Kai-Fu Lee', year: '2018', genre: 'AI/ML', rating: 5, description: 'China Silicon Valley and new world', assignedTo: ['student', 'teacher'] },
            { id: 165, title: 'The Alignment Problem', author: 'Brian Christian', year: '2020', genre: 'AI/ML', rating: 5, description: 'Machine learning and human values', assignedTo: ['student', 'teacher'] },
            { id: 166, title: 'Weapons of Math Destruction', author: 'Cathy O Neil', year: '2016', genre: 'AI/ML', rating: 5, description: 'How big data increases inequality', assignedTo: ['student', 'teacher'] },
            { id: 167, title: 'Machine Learning for Absolute Beginners', author: 'Oliver Theobald', year: '2020', genre: 'AI/ML', rating: 5, description: 'Plain English introduction', assignedTo: ['student', 'teacher'] },
            { id: 168, title: 'Grokking Deep Learning', author: 'Andrew Trask', year: '2019', genre: 'AI/ML', rating: 5, description: 'Build neural networks from scratch', assignedTo: ['student', 'teacher'] },
            { id: 169, title: 'Deep Learning with Python', author: 'François Chollet', year: '2021', genre: 'AI/ML', rating: 5, description: 'Keras creator teaches deep learning', assignedTo: ['student', 'teacher'] },
            { id: 170, title: 'Natural Language Processing with Transformers', author: 'Lewis Tunstall', year: '2022', genre: 'AI/ML', rating: 5, description: 'Building language applications with Hugging Face', assignedTo: ['student', 'teacher'] }
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
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    searchInput.addEventListener('input', function(e) {
        const selectedCategory = categoryFilter.value;
        displayBooks(e.target.value, selectedCategory);
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
    const booksGrid = document.getElementById('booksGrid');
    const notesSection = document.getElementById('notesSection');
    
    if (ncertSection.style.display === 'none' || ncertSection.style.display === '') {
        ncertSection.style.display = 'block';
        addBookForm.style.display = 'none';
        addNoteForm.style.display = 'none';
        addNoticeForm.style.display = 'none';
        dictSection.style.display = 'none';
        noticeSection.style.display = 'none';
        booksGrid.style.display = 'none';
        notesSection.style.display = 'none';
    } else {
        ncertSection.style.display = 'none';
        booksGrid.style.display = 'grid';
    }
    lucide.createIcons();
}

// Show All Books Function (Return to main books view)
function showAllBooks() {
    const ncertSection = document.getElementById('ncertBooksSection');
    const addBookForm = document.getElementById('addBookForm');
    const addNoteForm = document.getElementById('addNoteForm');
    const addNoticeForm = document.getElementById('addNoticeForm');
    const dictSection = document.getElementById('dictionarySection');
    const noticeSection = document.getElementById('noticeBoardSection');
    const booksGrid = document.getElementById('booksGrid');
    const notesSection = document.getElementById('notesSection');
    
    // Hide all other sections
    ncertSection.style.display = 'none';
    addBookForm.style.display = 'none';
    addNoteForm.style.display = 'none';
    addNoticeForm.style.display = 'none';
    dictSection.style.display = 'none';
    noticeSection.style.display = 'none';
    notesSection.style.display = 'none';
    
    // Show books grid
    booksGrid.style.display = 'grid';
    
    // Reset search and category filter
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = 'all';
    displayBooks('', 'all');
    
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
    const booksGrid = document.getElementById('booksGrid');
    const notesSection = document.getElementById('notesSection');
    
    if (dictSection.style.display === 'none' || dictSection.style.display === '') {
        dictSection.style.display = 'block';
        addBookForm.style.display = 'none';
        addNoteForm.style.display = 'none';
        addNoticeForm.style.display = 'none';
        ncertSection.style.display = 'none';
        noticeSection.style.display = 'none';
        booksGrid.style.display = 'none';
        notesSection.style.display = 'none';
        switchDictTab('api'); // Default to Dictionary API
    } else {
        dictSection.style.display = 'none';
        booksGrid.style.display = 'grid';
    }
    lucide.createIcons();
}

// Learning Games Toggle Function
function toggleLearningGames() {
    const gamesSection = document.getElementById('learningGamesSection');
    const addBookForm = document.getElementById('addBookForm');
    const addNoteForm = document.getElementById('addNoteForm');
    const dictSection = document.getElementById('dictionarySection');
    const ncertSection = document.getElementById('ncertBooksSection');
    const booksGrid = document.getElementById('booksGrid');
    const notesSection = document.getElementById('notesSection');
    
    if (gamesSection.style.display === 'none' || gamesSection.style.display === '') {
        gamesSection.style.display = 'block';
        addBookForm.style.display = 'none';
        addNoteForm.style.display = 'none';
        dictSection.style.display = 'none';
        ncertSection.style.display = 'none';
        booksGrid.style.display = 'none';
        notesSection.style.display = 'none';
        document.getElementById('gamePlayArea').style.display = 'none';
    } else {
        gamesSection.style.display = 'none';
        booksGrid.style.display = 'grid';
    }
    lucide.createIcons();
}

// Start Game Function
function startGame(gameType) {
    const gamePlayArea = document.getElementById('gamePlayArea');
    const gameContent = document.getElementById('gameContent');
    const gameTitle = document.getElementById('currentGameTitle');
    
    gamePlayArea.style.display = 'block';
    document.querySelector('.games-grid').style.display = 'none';
    
    switch(gameType) {
        case 'memory':
            gameTitle.textContent = '🧠 Memory Match Game';
            initMemoryGame(gameContent);
            break;
        case 'math':
            gameTitle.textContent = '➕ Math Challenge';
            initMathGame(gameContent);
            break;
        case 'word':
            gameTitle.textContent = '📝 Word Builder';
            initWordGame(gameContent);
            break;
        case 'typing':
            gameTitle.textContent = '⌨️ Typing Master';
            initTypingGame(gameContent);
            break;
        case 'science':
            gameTitle.textContent = '🔬 Science Explorer';
            initScienceGame(gameContent);
            break;
        case 'logic':
            gameTitle.textContent = '🧩 Logic Master';
            initLogicGame(gameContent);
            break;
    }
    lucide.createIcons();
}

// Close Game Function
function closeGame() {
    document.getElementById('gamePlayArea').style.display = 'none';
    document.querySelector('.games-grid').style.display = 'grid';
}

// Memory Match Game
function initMemoryGame(container) {
    const cards = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍎', '🍌', '🍇', '🍊', '🍓', '🍉'];
    let shuffled = cards.sort(() => Math.random() - 0.5);
    let flipped = [];
    let matched = [];
    
    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
            <h4 style="color: #ffffff;">Matched: <span id="matchCount">0</span> / 6</h4>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; max-width: 500px; margin: 0 auto;">
            ${shuffled.map((card, i) => `
                <div class="memory-card" data-index="${i}" onclick="flipCard(${i})" 
                     style="background: linear-gradient(135deg, #ec4899, #db2777); 
                            border-radius: 12px; padding: 2rem; font-size: 2rem; 
                            text-align: center; cursor: pointer; transition: all 0.3s;">
                    <span class="card-content" style="display: none;">${card}</span>
                    <span class="card-back">?</span>
                </div>
            `).join('')}
        </div>
    `;
    
    window.flipCard = function(index) {
        if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
            const card = container.querySelectorAll('.memory-card')[index];
            card.querySelector('.card-content').style.display = 'block';
            card.querySelector('.card-back').style.display = 'none';
            flipped.push(index);
            
            if (flipped.length === 2) {
                const card1 = shuffled[flipped[0]];
                const card2 = shuffled[flipped[1]];
                
                setTimeout(() => {
                    if (card1 === card2) {
                        matched.push(flipped[0], flipped[1]);
                        document.getElementById('matchCount').textContent = matched.length / 2;
                        if (matched.length === 12) {
                            setTimeout(() => alert('🎉 Congratulations! You won!'), 300);
                        }
                    } else {
                        container.querySelectorAll('.memory-card')[flipped[0]].querySelector('.card-content').style.display = 'none';
                        container.querySelectorAll('.memory-card')[flipped[0]].querySelector('.card-back').style.display = 'block';
                        container.querySelectorAll('.memory-card')[flipped[1]].querySelector('.card-content').style.display = 'none';
                        container.querySelectorAll('.memory-card')[flipped[1]].querySelector('.card-back').style.display = 'block';
                    }
                    flipped = [];
                }, 800);
            }
        }
    };
}

// Math Challenge Game
function initMathGame(container) {
    let score = 0;
    let question = generateMathQuestion();
    
    function generateMathQuestion() {
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        const operations = ['+', '-', '×'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        let answer;
        
        switch(op) {
            case '+': answer = num1 + num2; break;
            case '-': answer = num1 - num2; break;
            case '×': answer = num1 * num2; break;
        }
        
        return { num1, num2, op, answer };
    }
    
    function renderQuestion() {
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="color: #ffffff; margin-bottom: 2rem;">Score: ${score}</h3>
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                    <h2 style="color: #ffffff; font-size: 3rem;">${question.num1} ${question.op} ${question.num2} = ?</h2>
                </div>
                <input type="number" id="mathAnswer" placeholder="Your answer" 
                       style="padding: 1rem; font-size: 1.5rem; border-radius: 8px; border: 2px solid #ec4899; 
                              background: rgba(255,255,255,0.1); color: white; text-align: center; width: 200px;">
                <br><br>
                <button onclick="checkMathAnswer()" 
                        style="padding: 1rem 2rem; background: linear-gradient(135deg, #ec4899, #db2777); 
                               border: none; border-radius: 8px; color: white; font-size: 1.2rem; cursor: pointer;">
                    Submit Answer
                </button>
                <p id="mathFeedback" style="color: #ffffff; margin-top: 1rem; font-size: 1.2rem;"></p>
            </div>
        `;
        
        document.getElementById('mathAnswer').focus();
        document.getElementById('mathAnswer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkMathAnswer();
        });
    }
    
    window.checkMathAnswer = function() {
        const userAnswer = parseInt(document.getElementById('mathAnswer').value);
        const feedback = document.getElementById('mathFeedback');
        
        if (userAnswer === question.answer) {
            score += 10;
            feedback.textContent = '✅ Correct! +10 points';
            feedback.style.color = '#10b981';
            setTimeout(() => {
                question = generateMathQuestion();
                renderQuestion();
            }, 1000);
        } else {
            feedback.textContent = `❌ Wrong! Correct answer: ${question.answer}`;
            feedback.style.color = '#ef4444';
        }
    };
    
    renderQuestion();
}

// Word Builder Game
function initWordGame(container) {
    const words = ['LIBRARY', 'EDUCATION', 'LEARNING', 'KNOWLEDGE', 'STUDENT', 'TEACHER'];
    const targetWord = words[Math.floor(Math.random() * words.length)];
    const scrambled = targetWord.split('').sort(() => Math.random() - 0.5).join('');
    
    container.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #ffffff; margin-bottom: 2rem;">Unscramble the word!</h3>
            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                <h2 style="color: #fbbf24; font-size: 3rem; letter-spacing: 0.5rem;">${scrambled}</h2>
            </div>
            <input type="text" id="wordAnswer" placeholder="Type the word" 
                   style="padding: 1rem; font-size: 1.5rem; border-radius: 8px; border: 2px solid #ec4899; 
                          background: rgba(255,255,255,0.1); color: white; text-align: center; width: 300px; text-transform: uppercase;">
            <br><br>
            <button onclick="checkWordAnswer('${targetWord}')" 
                    style="padding: 1rem 2rem; background: linear-gradient(135deg, #ec4899, #db2777); 
                           border: none; border-radius: 8px; color: white; font-size: 1.2rem; cursor: pointer;">
                Check Answer
            </button>
            <p id="wordFeedback" style="color: #ffffff; margin-top: 1rem; font-size: 1.2rem;"></p>
        </div>
    `;
    
    window.checkWordAnswer = function(correct) {
        const userAnswer = document.getElementById('wordAnswer').value.toUpperCase();
        const feedback = document.getElementById('wordFeedback');
        
        if (userAnswer === correct) {
            feedback.textContent = '🎉 Correct! Well done!';
            feedback.style.color = '#10b981';
        } else {
            feedback.textContent = `❌ Try again! Hint: It starts with "${correct[0]}"`;
            feedback.style.color = '#ef4444';
        }
    };
}

// Typing Master Game
function initTypingGame(container) {
    const sentences = [
        'The quick brown fox jumps over the lazy dog',
        'Learning is a treasure that will follow its owner everywhere',
        'Education is the most powerful weapon you can use to change the world'
    ];
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    let startTime;
    
    container.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #ffffff; margin-bottom: 2rem;">Type this sentence as fast as you can!</h3>
            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                <p style="color: #ffffff; font-size: 1.5rem; line-height: 2;">${sentence}</p>
            </div>
            <textarea id="typingInput" placeholder="Start typing here..." 
                      style="padding: 1rem; font-size: 1.2rem; border-radius: 8px; border: 2px solid #ec4899; 
                             background: rgba(255,255,255,0.1); color: white; width: 100%; min-height: 100px; resize: vertical;"></textarea>
            <p id="typingStats" style="color: #ffffff; margin-top: 1rem; font-size: 1.2rem;"></p>
        </div>
    `;
    
    const input = document.getElementById('typingInput');
    input.addEventListener('input', function() {
        if (!startTime) startTime = Date.now();
        
        const typed = input.value;
        const stats = document.getElementById('typingStats');
        
        if (typed === sentence) {
            const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
            const wpm = Math.round((sentence.split(' ').length / timeTaken) * 60);
            stats.innerHTML = `✅ <span style="color: #10b981;">Completed in ${timeTaken}s! Speed: ${wpm} WPM</span>`;
        } else {
            const accuracy = typed.split('').filter((char, i) => char === sentence[i]).length / typed.length * 100;
            stats.textContent = `Accuracy: ${accuracy.toFixed(0)}%`;
        }
    });
}

// Science Explorer Game
function initScienceGame(container) {
    const questions = [
        { q: 'What is the chemical symbol for water?', a: 'H2O', options: ['H2O', 'O2', 'CO2', 'N2'] },
        { q: 'What planet is known as the Red Planet?', a: 'Mars', options: ['Mars', 'Venus', 'Jupiter', 'Saturn'] },
        { q: 'What is the speed of light?', a: '300,000 km/s', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'] },
        { q: 'What is the largest organ in human body?', a: 'Skin', options: ['Skin', 'Liver', 'Heart', 'Brain'] }
    ];
    
    let currentQ = 0;
    let score = 0;
    
    function showQuestion() {
        if (currentQ >= questions.length) {
            container.innerHTML = `
                <div style="text-align: center;">
                    <h2 style="color: #10b981; font-size: 3rem;">🎉 Quiz Complete!</h2>
                    <p style="color: #ffffff; font-size: 2rem; margin: 2rem 0;">Score: ${score}/${questions.length}</p>
                    <button onclick="location.reload()" 
                            style="padding: 1rem 2rem; background: linear-gradient(135deg, #ec4899, #db2777); 
                                   border: none; border-radius: 8px; color: white; font-size: 1.2rem; cursor: pointer;">
                        Play Again
                    </button>
                </div>
            `;
            return;
        }
        
        const q = questions[currentQ];
        container.innerHTML = `
            <div style="text-align: center;">
                <h4 style="color: #fbbf24; margin-bottom: 2rem;">Question ${currentQ + 1}/${questions.length}</h4>
                <h3 style="color: #ffffff; margin-bottom: 2rem; font-size: 1.5rem;">${q.q}</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 500px; margin: 0 auto;">
                    ${q.options.map(opt => `
                        <button onclick="checkScience('${opt}', '${q.a}')" 
                                style="padding: 1.5rem; background: rgba(255,255,255,0.1); border: 2px solid #ec4899; 
                                       border-radius: 8px; color: white; font-size: 1.2rem; cursor: pointer; transition: all 0.3s;">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <p style="color: #ffffff; margin-top: 2rem;">Score: ${score}</p>
            </div>
        `;
    }
    
    window.checkScience = function(selected, correct) {
        if (selected === correct) {
            score++;
        }
        currentQ++;
        showQuestion();
    };
    
    showQuestion();
}

// Logic Master Game
function initLogicGame(container) {
    const puzzles = [
        { q: 'If 2 + 3 = 10, 3 + 4 = 21, then 4 + 5 = ?', a: '36', hint: 'Multiply and add' },
        { q: 'What comes next: 2, 4, 8, 16, __?', a: '32', hint: 'Double each time' },
        { q: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops Lazzies?', a: 'Yes', hint: 'Think logically' }
    ];
    
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    
    container.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #ffffff; margin-bottom: 2rem;">Solve this puzzle!</h3>
            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                <p style="color: #ffffff; font-size: 1.5rem; line-height: 2;">${puzzle.q}</p>
            </div>
            <input type="text" id="logicAnswer" placeholder="Your answer" 
                   style="padding: 1rem; font-size: 1.5rem; border-radius: 8px; border: 2px solid #ec4899; 
                          background: rgba(255,255,255,0.1); color: white; text-align: center; width: 200px;">
            <br><br>
            <button onclick="checkLogic('${puzzle.a}')" 
                    style="padding: 1rem 2rem; background: linear-gradient(135deg, #ec4899, #db2777); 
                           border: none; border-radius: 8px; color: white; font-size: 1.2rem; cursor: pointer; margin-right: 1rem;">
                Submit
            </button>
            <button onclick="showHint('${puzzle.hint}')" 
                    style="padding: 1rem 2rem; background: rgba(255,255,255,0.1); border: 2px solid #fbbf24; 
                           border-radius: 8px; color: white; font-size: 1.2rem; cursor: pointer;">
                Hint
            </button>
            <p id="logicFeedback" style="color: #ffffff; margin-top: 1rem; font-size: 1.2rem;"></p>
        </div>
    `;
    
    window.checkLogic = function(correct) {
        const userAnswer = document.getElementById('logicAnswer').value;
        const feedback = document.getElementById('logicFeedback');
        
        if (userAnswer.toLowerCase() === correct.toLowerCase()) {
            feedback.textContent = '🎉 Brilliant! You solved it!';
            feedback.style.color = '#10b981';
        } else {
            feedback.textContent = '❌ Not quite! Try again or use the hint.';
            feedback.style.color = '#ef4444';
        }
    };
    
    window.showHint = function(hint) {
        document.getElementById('logicFeedback').textContent = `💡 Hint: ${hint}`;
        document.getElementById('logicFeedback').style.color = '#fbbf24';
    };
}

// Show welcome message with sample words
function showWelcomeMessage() {
    const resultDiv = document.getElementById('englishResult');
    resultDiv.innerHTML = `
        <div class="dict-welcome">
            <h3 style="color: #fdfdfdff; margin-bottom: 1rem;">Welcome to Digital Dictionary! 📚</h3>
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
                            <h4 style="color: #ffffff; margin-bottom: 0.5rem;">🇮🇳 Hindi Translation</h4>
                            <p class="dict-hindi-text" style="font-size: 2rem; font-weight: bold; color: #ffffff;">${hindiTranslation}</p>
                        </div>
                        <p style="color: #ffffff; margin-top: 1rem;">English definition not available for this word.</p>
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
                <h4 style="color: #ffffff; margin-bottom: 0.5rem;">🇮🇳 Hindi Translation</h4>
                <p class="dict-hindi-text" style="font-size: 2rem; font-weight: bold; color: #ffffff;">${hindiTranslation}</p>
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

function displayBooks(searchQuery = '', categoryFilter = 'all') {
    const grid = document.getElementById('booksGrid');
    
    // Filter books based on search query, category and user role
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
        
        // Category filter
        if (categoryFilter !== 'all') {
            if (book.genre !== categoryFilter) {
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

// Category Filter Function
function filterBooksByCategory() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const selectedCategory = categoryFilter.value;
    const searchQuery = searchInput.value;
    
    displayBooks(searchQuery, selectedCategory);
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