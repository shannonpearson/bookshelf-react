const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const db = require('../database-mysql');

const app = express();

// UNCOMMENT FOR REACT
app.use(express.static(`${__dirname }/../react-client/dist`));
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

// app.post('books/search', function(req, res) { // req has object with isbn to search
// 	// define url so that it requests the api properly
// 	const isbn = req.body.isbn;
// 	let compositeUrl = 'http://openlibrary.org/api/things?query={"type":"/type/edition", "isbn_10":"';
//     compositeUrl += isbn;
//     compositeUrl += '"}';
//     const url = {
//     	url: compositeUrl
//     };
//     console.log('first request url', url)

//     // request to external api
//     request(url, function(err, res, body) {
//     	if (err) {
//     		console.log('error');
//     	} else {
//     		const code = JSON.parse(body).result[0];
//             console.log('CODE', body)
//     		const newUrl = 'http://openlibrary.org/api/get?key=' + code;
//             console.log('second request url: ', newUrl)
//     		request({url: newUrl}, function(err, res, body) {
//     			if (err) {
//     				console.log('async error');
//     			} else {
//     				// res send object with all desired book properties
//     				const obj = JSON.parse(body);
// console.log('RES OBJ:', obj.result);
    				// const resObj = {};
    				// resObj.title = obj.result.title || 'unlisted';
    				// resObj.author = obj.result.by_statement || 'unlisted';
    				// resObj.genre = obj.result.genres[0] || 'none';
    				// //resObj.subjects = obj.result.subjects || 'none';
    				// resObj.pages = obj.result.number_of_pages || 0;
    				// resObj.id = obj.result.key || Math.floor(Math.random() * 10000);
    				// resObj.year = obj.result.publish_date || 0000;
    				// resObj.isbn = obj.result.isbn_10[0];
//             resObj.cover = obj.result.cover.large;
    				// res.send(resObj);
// console.log(res)
//                 }
//             })
//     	}
//     });
// })

// renders book view from database
// app.get('/books/view/:id', function(req, res) {

// });

// calls db method to add book to db
// app.post('/books/save', function(req, res) {
// 	// want req to have list name and book object (from button and state)
// 	// add to db
// 	const list = req.body.shelf;
// 	const book = req.body.book;
// 	db.addToTable(shelf, book, function(result) {
// 		console.log('saved to db according to app.post');
// 	})
// })

app.get('/books/shelf', (req, res) => {
  // should send back object with favorites, interested, shelf
  db.getAllBooks((response) => {
	response = JSON.parse(JSON.stringify(response));
	console.log('response', response);
	// for each book, add to object under property matching book 'shelf' property
	const books = {};
	response.forEach((book) => {
		books[book.shelf].push(book);
	});
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

