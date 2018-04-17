import React from 'react';
import axios from 'axios';

import { DropdownButton, MenuItem, Media, Alert } from 'react-bootstrap';

class searchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false,
    };

    this.addToShelf = this.addToShelf.bind(this);
  }

  addToShelf(eventKey) {
    const { book } = this.props;
    book.shelf = eventKey;
    // console.log('book front end', book);
    axios.post('/books/save', { book })
      .then((response) => {
        this.setState({ added: true });
      })
      .catch((error) => {
        console.log('error adding book', error);
      });
  }

  render() {
    const { book } = this.props;
    return (
      <div>
        {this.state.added &&
          <Alert bsStyle="success" onDismiss={this.handleDismiss} style={{ marginBottom: '5px' }}> Added to shelf! </Alert>
        }
        <Media>
          <Media.Left>
            <img src={book.cover || 'http://i.imgur.com/sJ3CT4V.gif'} alt="Book Cover" style={{ width: '150px', paddingBottom: '80px', }} />
          </Media.Left>
          <Media.Body>
            <Media.Heading> {book.title} </Media.Heading>
            <div> {book.author} </div>
            <div> {book.year} </div>
            <DropdownButton title="Add to shelf:" id={book.key} style={{ marginTop: '20px' }}>
              <MenuItem eventKey="myshelf" onSelect={this.addToShelf}> Bookshelf </MenuItem>
              <MenuItem eventKey="favorites" onSelect={this.addToShelf}> Favorites </MenuItem>
              <MenuItem eventKey="interested" onSelect={this.addToShelf}> Interested </MenuItem>
            </DropdownButton>
          </Media.Body>
        </Media>
      </div>
    );
  }
}

export default searchResult;
