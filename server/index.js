const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const db = require('../database-mysql');

const app = express();

//UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/home', function(req, res) {
	const books = {};
	// get from favorites list
	db.selectAllFromTable('books', (results) => {
		books.favorites = results;
		// get from interested list
		db.selectAllFromTable('interested', (results) => {
			books.interested = results;
			// get from shelf list
			db.selectAllFromTable('shelf', (results) => {
				books.shelf = results;
				res.send(books);
			})
		})
	})
})

app.post('/books/find', function(req, res) {
	const searchQuery = req.body.query.split(' ').join('+');
	console.log('request search query', searchQuery);
	const url = 'http://openlibrary.org/search.json?q=' + searchQuery;
	request(url, function(err, res, body) {
		if (err) {
			console.log('error on search');
		} else {
			const results = JSON.parse(body); 
			const { docs } = results;
			console.log('docs', docs)
			const keys = []; // do this this way first then try using request-promise
			docs.forEach((obj) => {
				keys.push(obj.key);
			})
			console.log('keys', keys);
			const bookItems = [];
			keys.forEach((key) => {
				// compose url from key and run request with key to get entire book objects
				// (going to want to render each one and be able to drop all book info into database if saved)
				const newUrl = 'http://openlibrary.org/api/get?key=' + key;
				request({url: newUrl}, function(err, res, body) {
					if (err) {
						console.log('async error');
					} else {
						const obj = JSON.parse(body);
						console.log('res obj', obj);
					}
				})
			})
		}
	})
});

app.post('books/search', function(req, res) { // req has object with isbn to search
	// define url so that it requests the api properly 
	const isbn = req.body.isbn;
	let compositeUrl = 'http://openlibrary.org/api/things?query={"type":"/type/edition", "isbn_10":"';
    compositeUrl += isbn;
    compositeUrl += '"}';
    const url = {
    	url: compositeUrl
    };
    console.log('first request url', url)

    // request to external api
    request(url, function(err, res, body) {
    	if (err) {
    		console.log('error');
    	} else {
    		const code = JSON.parse(body).result[0];
            console.log('CODE', body)
    		const newUrl = 'http://openlibrary.org/api/get?key=' + code;
            console.log('second request url: ', newUrl)
    		request({url: newUrl}, function(err, res, body) {
    			if (err) {
    				console.log('async error');
    			} else {
    				// res send object with all desired book properties
    				const obj = JSON.parse(body);
                    console.log('RES OBJ:', obj.result);
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
    				//res.send(resObj);
                    //console.log(res)
                }
            })
    	}
    });
})

// renders book view from database
app.get('/books/view/:id', function(req, res) {

});

// calls db method to add book to db
app.post('/books/save', function(req, res) {
	// want req to have list name and book object (from button and state)
	// add to db
	const list = req.body.shelf;
	const book = req.body.book;
	db.addToTable(shelf, book, function(result) {
		console.log('saved to db according to app.post');
	})
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

