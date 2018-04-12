import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = props => (
  <div>
    { props.books.map(book => (
      <SearchResult book={book} />
            ))}
  </div>
);

export default SearchResults;
