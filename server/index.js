var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require('../database-mysql');

var app = express();

//UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.get('/home', function(req, res) {
	var books = {};
	// get from favorites list
	db.selectAllFromTable('favorites', (results) => {
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

app.post('/search', function(req, res) { // req has object with isbn to search
	// define url so that it requests the api properly 
	var isbn = req.body.isbn;
	var compositeUrl = 'http://openlibrary.org/api/things?query={"type":"/type/edition", "isbn_10":"';
    compositeUrl += isbn;
    compositeUrl += '"}';
    var url = {
    	url: compositeUrl
    };

    // request to external api
    request(url, function(err, res, body) {
    	if (err) {
    		console.log('error');
    	} else {
    		var code = JSON.parse(body).result[0];
    		var newUrl = 'http://openlibrary.org/api/get?key=' + code;
    		request({url: newUrl}, function(err, res, body) {
    			if (err) {
    				console.log('async error');
    			} else {
    				// res send object with all desired book properties
    				var obj = JSON.parse(body);
    				var resObj = {};
    				resObj.title = obj.result.title || 'unlisted';
    				resObj.author = obj.result.by_statement || 'unlisted';
    				resObj.genre = obj.result.genres[0] || 'none';
    				//resObj.subjects = obj.result.subjects || 'none';
    				resObj.pages = obj.result.number_of_pages || 0;
    				resObj.id = obj.result.key || Math.floor(Math.random() * 10000);
    				resObj.year = obj.result.publish_date || 0000; 
    				resObj.isbn = obj.result.isbn_10[0];
                    resObj.cover = obj.result.cover.large;
    				res.send(resObj);
    			}
    		})
    	}
    });
})

// calls db method to add book to db
app.post('/save', function(req, res) {
	// want req to have list name and book object (from button and state)
	// add to db
	var list = req.body.list;
	var book = req.body.book;
	db.addToTable(list, book, function(result) {
		console.log('saved to db according to app.post');
	})
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

