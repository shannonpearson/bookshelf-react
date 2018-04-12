import React from 'react';
import axios from 'axios';

import { DropdownButton, MenuItem, Image } from 'react-bootstrap';

class searchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addToShelf(e) {
    axios.post('/books/save', { shelf: e.target.value, book: this.props.book });
  }

  render() {
    const { book } = this.props;
    return (
      <div>
        {book.cover && <Image src={book.cover} alt="Book Cover" thumbnail />}
        <div>
          <div> {book.title} </div>
          <div> {book.author} </div>
          <div> {book.year} </div>
        </div>
        <DropdownButton>
          <MenuItem eventKey={1}> Bookshelf </MenuItem>
          <MenuItem eventKey={2}> Favorites </MenuItem>
          <MenuItem eventKey={3}> Interested </MenuItem>
        </DropdownButton>
      </div>
    );
  }
}

export default searchResult;
