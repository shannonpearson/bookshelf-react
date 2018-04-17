const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const db = require('../database-mysql/schema.js');

const app = express();

// UNCOMMENT FOR REACT
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// app.get('/home', function(req, res) {
// 	const books = {};
// 	// get from favorites list
// 	db.getAllBooks((response) => {
// 		console.log(response);
// 		res.send(response);
// 	})
// })

// app.get('/books/find', function(req, res) {
// 	const searchQuery = req.body.query.split(' ').join('+');
// 	const url = 'http://openlibrary.org/search.json?q=' + searchQuery;
// 	axios.get(url)
// 		.catch((error) => {
// 			console.log('search error', error);
// 		})
// 		.then((response) => {
// 			const docs = response.data.docs.slice(0, 4);
// 			const books = [];
// 			docs.forEach((obj) => {
// 				const bookObj = {
// 					isbn: obj.isbn ? obj.isbn[0] : null,
// 					title: obj.title_suggest || obj.title || null,
// 					author: obj.author_name ? obj.author_name[0] : null,
// 					year: obj.publish_year ? Math.min(obj.publish_year) : null,
// 					cover: obj.cover_i || null,
// 					key: obj.key || null,
// 				};
// 				books.push(bookObj);
// 			})
// 			res.send(books);
// 		})
// });

// calls db method to add book to db
app.post('/books/save', (req, res) => {
  // want req to have list name and book object (from button and state)
  // add to db
  // console.log('request body save', req.body);
  db.save(req.body.book, () => {
    // console.log('saved to database! calling callback...');
    // console.log('results back from save', results);
    // res.send(results);  
    res.sendStatus(201);
  });
});

app.get('/books/shelf', (req, res) => {
  // should send back object with favorites, interested, shelf
  db.getAllBooks((response) => {
    // console.log('response', response);
    const items = JSON.parse(JSON.stringify(response));
    // for each book, add to object under property matching book 'shelf' property
    console.log('items', items)
    const books = {
      favorites: [],
      interested: [],
      myshelf: [],
    };
    items.forEach((book) => {
      books[book.shelf].push(book);
    });
    console.log('books for res', books)
    res.send(books);
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

