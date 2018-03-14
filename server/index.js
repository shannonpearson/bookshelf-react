var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require('../database-mysql');

var app = express();

UNCOMMENT FOR REACT
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

