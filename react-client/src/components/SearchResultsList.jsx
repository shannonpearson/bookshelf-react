import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = props => (
  <div>
    { props.books.map(book => (
      <SearchResult book={book} />
            ))}
  </div>
);

export default SearchResultsList;
