const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'FILL_ME_IN',
  database : 'test'
});

// calls callback on all books from table (name input)
const getAllBooks = function(callback) {
  connection.query('SELECT * FROM books', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// calls callback on book object from database searched by isbn
const findByISBN = function(table, isbn, callback) {
  connection.query('SELECT * FROM ? WHERE isbn = ?', [table, isbn], function(err, result) {
    if (err) {
      console.log('error finding title', err);
    } else {
      console.log('book by title: ', result);
      callback(result);
    }
  })
};

// adds book (input) to table (name input)
const addToTable = function(shelf, book, callback) {
  const isbn = book.isbn;
  const title = book.title;
  const author = book.author;
  const description = book.description;
  const pages = book.pages;
  const genre = book.genre;
  const year = book.year;
  const cover = book.cover;
  connection.query('INSERT INTO books (isbn, title, author, description, pages, genre, year, cover, shelf) VALUES (? ? ? ? ? ? ? ?)', [isbn, title, author, description, pages, genre, year, cover, shelf], function(err, result) {
    if (err) {
      console.log('error inserting book into db', err);
    } else {
      console.log('book inserted into db, ', result)
    }
  });
}


module.exports = {
  getAllBooks,
  findByISBN,
  addToTable,
}
