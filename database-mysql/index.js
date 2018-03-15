var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'FILL_ME_IN',
  database : 'test'
});

// calls callback on all books from table (name input)
var selectAllFromTable = function(table, callback) {
  connection.query('SELECT * FROM ?', [table], function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// calls callback on book object from database searched by isbn
var findByISBN = function(table, isbn, callback) {
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
var addToTable = function(table, book, callback) {
  var isbn = book.isbn;
  var title = book.title;
  var author = book.author;
  var description = book.description;
  var pages = book.pages;
  var genre = book.genre;
  var year = book.year;
  var cover = book.cover;
  connection.query('INSERT INTO ? (isbn, title, author, description, pages, genre, year, cover) VALUES (? ? ? ? ? ? ? ?)', [table, isbn, title, author, description, pages, genre, year, cover], function(err, result) {
    if (err) {
      console.log('error inserting book into db', err);
    } else {
      console.log('book inserted into db, ', result)
    }
  });
}


module.exports = {
  selectAllFromTable: selectAllFromTable,
  findByISBN: findByISBN,
  addToTable: addToTable
}
