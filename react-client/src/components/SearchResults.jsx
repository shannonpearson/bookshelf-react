import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = props => (
  <div style={{ marginLeft: '100px' }}>
    { props.books.map(book => (
      <SearchResult key={book.key} book={book} />
            ))}
  </div>
);

export default SearchResults;
