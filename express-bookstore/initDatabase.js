// initDatabase.js

const { Client } = require('pg');
const config = require('./config'); // Adjust the path as needed

const client = new Client({
  connectionString: config.DB_URI,
});

async function initDatabase() {
  try {
    await client.connect();

    // Placeholder for database initialization logic
    const books = [
      {
        isbn: "0691161518",
        amazon_url: "http://a.co/eobPtX2",
        author: "Matthew Lane",
        language: "english",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        year: 2017,
      },
      // Add more book objects as needed
    ];

    // Loop through books and insert them into the database
    for (const book of books) {
      await client.query(`
        INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        book.isbn, book.amazon_url, book.author, book.language,
        book.pages, book.publisher, book.title, book.year,
      ]);
    }

    console.log('Database initialized successfully with books');
  } catch (error) {
    console.error('Error initializing database:', error.message);
  } finally {
    await client.end();
  }
}

initDatabase();

