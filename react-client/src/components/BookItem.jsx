import React from 'react';

const BookItem = props => (
  <div>
    { props.book.title } by { props.book.author }
  </div>
);

export default BookItem;
