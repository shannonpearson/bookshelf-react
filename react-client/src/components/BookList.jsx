import React from 'react';
import BookItem from './BookItem';


class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
    };
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.setState({ deleted: true });
  }

  render() {
    console.log('PROPS:', this.props);
    return (
      <div>
        { this.props.books.map(book =>
          <BookItem key={book.isbn} book={book} onClick={this.props.selectBook(book)} />)}
        {!this.state.deleted && <span> delete me </span>}
      </div>
    );
  }
}

export default BookList;
