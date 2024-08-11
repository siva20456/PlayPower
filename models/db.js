const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use an absolute path to avoid path issues
const dbPath = path.resolve(__dirname, 'mydatabase.db');

// Connect to SQLite database (creates the file if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

function listTables() {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, rows) => {
        if (err) {
            console.error('Error retrieving table list:', err);
            return;
        }
        console.log('Tables in the database:', rows.map(row => row.name));
    });
}

// Function to initialize the database
function initializeDatabase() {
    const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT
    );`;

    const assignmentsTable = `
    CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_date TEXT,  -- Use TEXT for storing date strings
    created_by TEXT NOT NULL
    );`;

    // Execute table creation statements
    db.run(usersTable, (err) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created or already exists');
        }
    });

    db.run(assignmentsTable, (err) => {
        if (err) {
            console.error('Error creating assignments table:', err);
        } else {
            console.log('Assignments table created or already exists');
        }
    });
}

// Initialize the database and check tables
initializeDatabase();
listTables();

// Export the database object for use in other modules
module.exports = db;
