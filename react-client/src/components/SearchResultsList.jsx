import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = (props) => {
    props.books.map((book) => (
        <SearchResult book={book} />
    )
};