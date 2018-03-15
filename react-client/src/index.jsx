import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BookView from './components/BookView.jsx';
import BookList from './components/BookList.jsx';

var bookViewStyle = {
  border: '1px solid #8c1f13',
  backgroundColor: '#e28888',
  width: 400,
  borderRadius: 15,
  padding: 15,
  margin: 20,
}

var listStyle = {
  border: '1px solid #0d440b',
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
        this.setState({
          favorites: data[0],
          interested: data[1],
          shelf: data[2]
        })
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
  }

  render () {
    // current book and each list with books = state object
    return (
    <div>
      <div style={bookViewStyle}><BookView book={this.state.currentBook} /></div>
      <div>

        <div style={listStyle}>
          <h3>Favorites</h3>
          <BookList books={this.state.favorites} selectBook={this.selectBook} />
        </div>

        <div style={listStyle}>
          <h3>Shelf</h3>
          <BookList books={this.state.shelf} selectBook={this.selectBook} />
        </div>

        <div style={listStyle}>
          <h3>Interested</h3>
          <BookList books={this.state.interested} selectBook={this.selectBook} />
        </div>

      </div>
    </div>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));