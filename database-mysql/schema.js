var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const itemSchema = mongoose.Schema({
  // holds word id (unique) for root form, dictionary entry info (check keys)
  id: {type: String, index: true, unique: true},
  title: {type: String, unique: false},
//   genre: {type: String, default: null},
  author: {type: String, default: 'unlisted'},
  year: {type: Number, default: 0},
//   pages: {type: Number, default: 0},
  isbn: {type: Number, default: 0000000000, unique: true},
//   key: {type: String, unique: true},
  cover: {type: String, default: null},
  shelf: {type: String, default: 'interested'},
});

var Item = mongoose.model('Item', itemSchema);


const save = function(entry, callback) {
  // saves entry info into db object with findoneandupdate
  console.log('entry', entry)
  var newEntry = new Item({
    id: entry.key,
    title: entry.title,
    author: entry.author,
    year: entry.year,
    isbn: entry.isbn,
    shelf: entry.shelf,
    // key: entry.key,
  });
  // console.log('new entry', newEntry);
  newEntry.save(function(error) {
    if (error) {
      console.log('did not save :( ---', error);
    } else {
      console.log('saved to database');
    }
  });
  // Item.find({}).exec((error, results) => {
  //   if (error) {
  //     console.log('error in getting books after save', error);
  //   } else {
  //     callback(results);
  //   }
  // })
};

// db.test.save({ id: '/awoier23', title: 'a book', author: 'some guy', year: 1988, isbn: 1245629543, shelf: 'favorites'})

var getBookByIsbn = function(isbn, callback) {
  Item.find({isbn}).exec((error, obj) => {
    if (error) {
      console.log('error in getBook', error);
    } else {
      console.log('got book by isbn')
      callback(obj);
    }
  });
};


const getBookById = function(isbn, callback) {
  Item.find({ isbn }).exec((error, obj) => {
    if (error) {
      console.log("error in getBook", error);
    } else {
      console.log("got book by isbn");
      callback(obj);
    }
  });
};


const getAllBooks = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      console.log('error in database query to get all books', err);
    } else {
        console.log('items', items);
      callback(items);
    }
  });
};

//module.exports.selectAll = selectAll;
module.exports.save = save;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookbyId = getBookById;
module.exports.getBookByIsbn = getBookByIsbn;
