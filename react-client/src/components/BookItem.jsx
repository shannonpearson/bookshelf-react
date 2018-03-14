import React from 'react';

const ListItem = (props) => (
  <div>
    { props.book.title } by { props.book.author }
  </div>
)

export default ListItem;