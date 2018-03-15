import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BookView from './components/BookView.jsx';
import BookList from './components/BookList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentBook: null,
      favorites: [],
      interested: [],
      shelf: []
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
    this.setState({currentBook: book});
  }

  render () {
    // current book and each list with books = state object
    return (
    <div>
      <BookView book={this.state.currentBook} />
      <div>

        <div>
          <h1>Favorites</h1>
          <BookList books={this.state.favorites} selectBook={this.selectBook} />
        </div>

        <div>
          <h1>Shelf</h1>
          <BookList books={this.state.shelf} selectBook={this.selectBook} />
        </div>

        <div>
          <h1>Interested</h1>
          <BookList books={this.state.interested} selectBook={this.selectBook} />
        </div>

      </div>
    </div>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));