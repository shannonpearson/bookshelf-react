import React from 'react';
import axios from 'axios';

import { Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';

class BookShelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
    };
  }

  componentWillMount() {
    axios.get('/books/shelf')
      .catch((err) => {console.log('error', err)})
      .then((results) => {
        this.setState({ books: results });
      })
  }

  render() {
    return (
      <Tabs style={{ marginTop: 30, marginLeft: 30 }} defaultActiveKey={1} id="list-tabs">
        <Tab eventKey={1} title="Bookshelf">
          <ListGroup>
            {this.state.books.shelf.map(book => (
              <ListGroupItem key={book.isbn} onClick={this.selectBook(book)}>
                {book.title} by {book.author}
              </ListGroupItem>))}
          </ListGroup>
        </Tab>

        <Tab eventKey={2} title="Favorites">
          <ListGroup>
            {this.state.books.favorites.map(book => (
              <ListGroupItem key={book.isbn} onClick={this.selectBook(book)}>
                {book.title} by {book.author}
              </ListGroupItem>))}
          </ListGroup>
        </Tab>

        <Tab eventKey={3} title="Interested">
          <ListGroup>
            {this.state.books.interested.map(book => (
              <ListGroupItem key={book.isbn} onClick={this.selectBook(book)}>
                {book.title} by {book.author}
              </ListGroupItem>))}
          </ListGroup>
        </Tab>
      </Tabs>
    );
  }
}

export default BookShelf;
