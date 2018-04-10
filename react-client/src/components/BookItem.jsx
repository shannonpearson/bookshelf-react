import React from 'react';
import ReactDOM from 'react-dom';

const BookItem = (props) => (
  <div>
    { props.book.title } by { props.book.author }
  </div>
)

export default BookItem;  