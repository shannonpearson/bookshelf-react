import React from 'react';
import { Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';

class BookShelf extends React.Component {
  construtor(props) {
    super(props);
    this.state = {
      something: 'some bullshit',
    };
  }

  render() {
    return (
      <Tabs style={{ marginTop: 30, marginLeft: 30 }} defaultActiveKey={1} id="list-tabs">
        <Tab eventKey={1} title="Bookshelf">
          <ListGroup>
            {this.state.shelf.map(book => (
              <ListGroupItem key={book.isbn} onClick={this.selectBook(book)}>
                {book.title} by {book.author}
              </ListGroupItem>))}
          </ListGroup>
        </Tab>

        <Tab eventKey={2} title="Favorites">
          <ListGroup>
            {this.state.favorites.map(book => (
              <ListGroupItem key={book.isbn} onClick={this.selectBook(book)}>
                {book.title} by {book.author}
              </ListGroupItem>))}
          </ListGroup>
        </Tab>

        <Tab eventKey={3} title="Interested">
          <ListGroup>
            {this.state.interested.map(book => (
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
