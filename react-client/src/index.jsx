import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

import { Bootstrap, Media, Tabs, Tab, ListGroup, ListGroupItem, Grid, Row, Col, Image, Panel } from 'react-bootstrap';

import BookView from './components/BookView.jsx';
import BookList from './components/BookList.jsx';
import BookItem from './components/BookItem.jsx';
import SearchISBN from './components/SearchISBN.jsx';
import Navbar from './components/Navbar.jsx';


var bookViewStyle = {
  border: '2px solid #8c1f13',
  backgroundColor: '#e28888',
  width: 400,
  borderRadius: 15,
  padding: 15,
  margin: 20,
}

var listStyle = {
  border: '2px solid #0d440b',
  backgroundColor: '#9de590',
  width: 400,
  borderRadius: 15,
  paddingLeft: 15,
  paddingRight: 15,
  paddingBottom: 15,
  margin: 20
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentBook: {
        isbn: 1503302946,
        title: 'Call of the Wild',
        author: 'Jack London',
        description: 'Set in the Yukon during the 1890s Klondike Gold Rush',
        pages: 66,
        genre: 'Classics',
        year: 1903
      },
      favorites: [{
        isbn: 1450523730,
        title: 'Ulysses',
        author: 'James Joyce',
        description: 'Stream-of-consciousness',
        pages: 442,
        genre: 'Modernism',
        year: 1922 
      }],
      interested: [{
        isbn: 1975743660,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'Exemplary novel of the Jazz Age',
        pages: 184,
        genre: 'Modernism',
        year: 1924
      }],
      shelf: [{
        isbn: 1099908506,
        title: 'The Sun Also Rises',
        author: 'Ernest Hemingway',
        description: 'Quintessential story of the Lost Generation',
        pages: 256,
        genre: 'Modernism',
        year: 1926
      }],
      searchResults: [],
    };
    this.selectBook = this.selectBook.bind(this)
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/home', 
    //   success: (data) => { // data should be array with favorites, interested, and shelf sets (in that order)
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  search(query) {
    console.log('query:', query);
    // post request
	const searchQuery = query.split(' ').join('+');
	const url = 'http://openlibrary.org/search.json?q=' + query;
	axios.get(url)
		.catch((error) => {
			console.log('search error', error);
		})
		.then((response) => {
			const docs = response.data.docs.slice(0, 4);
			const books = [];
			docs.forEach(async (obj) => {
        console.log(obj)
				const bookObj = {
					isbn: obj.isbn ? obj.isbn[0] : null,
					title: obj.title_suggest || obj.title || null,
					author: obj.author_name ? obj.author_name[0] : null,
					year: obj.publish_year ? Math.min(...obj.publish_year) : null,
          key: obj.key || null,
          cover: obj.cover_i ? 'http://covers.openlibrary.org/b/id/' + obj.cover_i + '-M.jpg' : null,
        };
				books.push(bookObj);
			});
			this.setState({ searchResults: books }, () => {
        console.log(this.state.searchResults);
      });
		}) 
  }

  addToFavorites() {
    // post request sends list:favorites, adds book object to state favorites list
    $.ajax({
      type: 'POST',
      url: '/save',
      data: JSON.stringify({list: favorites, book: currentBook}),
      success: () => {
        this.setState({favorites: this.state.favorites.concat([this.state.currentBook])});
      },
      error: () => {
        console.log('error adding to favorites in react post request');
      }
    })
  }

  addToInterested() {
    // post request sends list:interested, adds book object to state interested list
        $.ajax({
      type: 'POST',
      url: '/save',
      data: JSON.stringify({list: interested, book: currentBook}),
      success: () => {
        this.setState({favorites: this.state.interested.concat([this.state.currentBook])});
      },
      error: () => {
        console.log('error adding to favorites in react post request');
      }
    })
  }

  addToShelf() {
    // post request sends list:shelf, adds book object to state shelf list    
  }

  selectBook(book, self=this) {
    return function(e) {
      console.log(self)
      self.setState({currentBook: book})
    }
  }

  render () {
    // current book and each list with books = state object
    return (
      <div>
        <Navbar />
        <SearchISBN onSearch={this.search.bind(this)} />

        <Media style={{ marginTop: 30, marginLeft: 30 }}>
          <Media.Left>
            <img width={200} src="https://covers.openlibrary.org/b/id/5546156-M.jpg" />
          </Media.Left>
          <Media.Body>
            <div> {this.state.currentBook.title} </div>
            <div> {this.state.currentBook.author} </div>
            <div> {this.state.currentBook.year} </div>
            <div> {this.state.currentBook.pages} pages </div>
            <div> Genre: {this.state.currentBook.genre} </div>
            <div style={{ fontStyle: "italic" }}>
              {" "}
              {this.state.currentBook.description}{" "}
            </div>
          </Media.Body>
        </Media>


        <Tabs style={{ marginTop: 30, marginLeft: 30 }} defaultActiveKey={1} id="list-tabs">
          <Tab eventKey={1} title="Bookshelf">
            <ListGroup>
              {this.state.shelf.map(book => {
                return <ListGroupItem key={book.isbn} onClick={this.selectBook(book)}>
                    {book.title} by {book.author}
                  </ListGroupItem>;
              })}
            </ListGroup>
          </Tab>

          <Tab eventKey={2} title="Favorites">
            <ListGroup>
              {this.state.favorites.map(book => {
                return <ListGroupItem key={book.isbn} onClick={this.selectBook(book)}>
                    {book.title} by {book.author}
                  </ListGroupItem>;
              })}
            </ListGroup>
          </Tab>

          <Tab eventKey={3} title="Interested">
            <ListGroup>
              {this.state.interested.map(book => {
                return <ListGroupItem key={book.isbn} onClick={this.selectBook(book)}>
                    {book.title} by {book.author}
                  </ListGroupItem>;
              })}
            </ListGroup>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
//              <div key={book.isbn} onClick={this.selectBook.bind(this)}> {book.title} by {book.author} </div>
