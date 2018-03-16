import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BookView from './components/BookView.jsx';
import BookList from './components/BookList.jsx';
import BookItem from './components/BookItem.jsx';
import {Bootstrap, Media, Tabs, Tab, Navbar, Nav, NavItem, Grid, Row, Col, Image, Panel} from 'react-bootstrap';

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
      }]
    };
    this.selectBook = this.selectBook.bind(this)
  }

  componentDidMount() {
    $.ajax({
      url: '/home', 
      success: (data) => { // data should be array with favorites, interested, and shelf sets (in that order)
        // this.setState({
        //   favorites: data[0],
        //   interested: data[1],
        //   shelf: data[2]
        // })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  search(isbn) {
    // post request
    $.ajax({
      type: 'POST',
      url: '/search',
      data: JSON.stringify({isbn: isbn}),
      success: (data) => { // data should be book object ready to go into state current book
        this.setState({currentBook: data});
      },
      error: () => {
        console.log('error searching isbn');
      }
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
    $.ajax({
      type: 'POST',
      url: '/save',
      data: JSON.stringify({list: shelf, book: currentBook}),
      success: () => {
        this.setState({favorites: this.state.shelf.concat([this.state.currentBook])});
      },
      error: () => {
        console.log('error adding to favorites in react post request');
      }
    })
  }

  selectBook(book) {
    // renders book to book view by setting state current book
    // $.ajax({
    //   type: 'POST',
    //   url: '/view',
    //   data: JSON.stringify({id: id}),
    //   success: (data) => { // data should be book object ready to set to state current book
    //     this.setState({currentBook: data});
    //   },
    //   error: () => {
    //     console.log('error viewing book');
    //   }
    // })
   // this.setState({currentBook: book});
    console.log('click');
  }

  render () {
    // current book and each list with books = state object
    return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <span> Library </span>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={4} href="#/login">
            Log In
          </NavItem>
          <NavItem eventKey={4} href="#/logout">
            Log Out
          </NavItem>
        </Nav>
      </Navbar>

      <Media style={{marginTop: 30, marginLeft: 30}}>
        <Media.Left>
          <img width={200} src="https://covers.openlibrary.org/b/id/5546156-M.jpg" />
        </Media.Left>
        <Media.Body>
          <div> { this.state.currentBook.title } </div>
          <div> { this.state.currentBook.author } </div>
          <div> { this.state.currentBook.year } </div>
          <div> { this.state.currentBook.pages } pages </div>
          <div> Genre: { this.state.currentBook.genre } </div>
          <div style={{fontStyle: 'italic'}}> { this.state.currentBook.description } </div>
        </Media.Body>
      </Media>

      <Tabs style={{marginTop: 30, marginLeft: 30}} defaultActiveKey={1} id="list-tabs">
        <Tab eventKey={1} title="Bookshelf">
          {this.state.shelf.map(book => {
            return (
              <div key={book.isbn}> {book.title} by {book.author} </div>
            )
          })}
        </Tab>
        <Tab eventKey={2} title="Favorites">
          {this.state.favorites.map(book => {
            return (
              <div key={book.isbn}> {book.title} by {book.author} </div>
            )
          })}
        </Tab>
        <Tab eventKey={3} title="Interested">
          {this.state.interested.map(book => {
            return (
              <div key={book.isbn}> {book.title} by {book.author} </div>
            )
          })}
        </Tab>
      </Tabs>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

      // <div><BookView book={this.state.currentBook} /></div>
      // <div>

            // <BookList books={this.state.shelf} selectBook={this.selectBook} />
            // <BookList books={this.state.favorites} selectBook={this.selectBook} />
            // <BookList books={this.state.interested} selectBook={this.selectBook} />
      //   <div>
      //     <h3>Favorites</h3>
      //     <BookList books={this.state.favorites} selectBook={this.selectBook} />
      //   </div>

      //   <div>
      //     <h3>Shelf</h3>
      //     <BookList books={this.state.shelf} selectBook={this.selectBook} />
      //   </div>

      //   <div>
      //     <h3>Interested</h3>
      //     <BookList books={this.state.interested} selectBook={this.selectBook} />
      //   </div>

      // </div>