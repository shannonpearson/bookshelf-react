const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
});

// calls callback on all books from table (name input)
const getAllBooks = function (callback) {
  connection.query('SELECT * FROM books', (err, results, fields) => {
    if(err) {
      console.log('database query error');
    } else {
      callback(results);
    }
  });
};

// calls callback on book object from database searched by isbn
const findByISBN = function (table, isbn, callback) {
  connection.query('SELECT * FROM ? WHERE isbn = ?', [table, isbn], (err, result) => {
    if (err) {
      console.log('error finding title', err);
    } else {
      console.log('book by title: ', result);
      callback(result);
    }
  });
};

// adds book (input) to table (name input)
const addToTable = function (shelf, book, callback) {
  const isbn = book.isbn;
  const title = book.title;
  const author = book.author;
  const description = book.description;
  const pages = book.pages;
  const genre = book.genre;
  const year = book.year;
  const cover = book.cover;
  connection.query('INSERT INTO books (isbn, title, author, description, pages, genre, year, cover, shelf) VALUES (? ? ? ? ? ? ? ?)', [isbn, title, author, description, pages, genre, year, cover, shelf], (err, result) => {
    if (err) {
      console.log('error inserting book into db', err);
    } else {
      console.log('book inserted into db, ', result)
    }
  });
};

// INSERT INTO books (isbn, title, author, pages, year, shelf) VALUES ('1934535423', 'Some book', 'Author McAuthorFace', '54', '1977', 'favorites');


module.exports = {
  getAllBooks,
  findByISBN,
  addToTable,
};
