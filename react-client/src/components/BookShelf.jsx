import React from 'react';
import axios from 'axios';

import { Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';

class BookShelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      myshelf: [],
      interested: [],
    };
  }

  componentWillMount() {
    axios.get('/books/shelf')
      .then((results) => {
        this.setState({
          favorites: results.data.favorites,
          myshelf: results.data.myshelf,
          interested: results.data.interested,
        });
      });
  }

  render() {
    return (
      <Tabs style={{ marginTop: 30, marginLeft: 30, width: '80%' }} defaultActiveKey={1} id="list-tabs">
        <Tab eventKey={1} title="Bookshelf">
          <ListGroup>
            {this.state.myshelf.map(book => (
              <ListGroupItem key={book.isbn}>
                {book.title} by {book.author}
              </ListGroupItem>))}
          </ListGroup>
        </Tab>

        <Tab eventKey={2} title="Favorites">
          <ListGroup>
            {this.state.favorites.map(book => (
              <ListGroupItem key={book.isbn}>
                {book.title} by {book.author}
              </ListGroupItem>))}
          </ListGroup>
        </Tab>

        <Tab eventKey={3} title="Interested">
          <ListGroup>
            {this.state.interested.map(book => (
              <ListGroupItem key={book.isbn}>
                {book.title} by {book.author}
              </ListGroupItem>))}
          </ListGroup>
        </Tab>
      </Tabs>
    );
  }
}

export default BookShelf;
