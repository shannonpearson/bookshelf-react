import React from 'react';

const BookView = (props) => (
	<div>
	    <div> { props.book.title } </div>
	    <div> { props.book.author } </div>
	    <div> { props.book.year } </div>
	    <div> { props.book.pages } pages </div>
	    <div> { props.book.genre } </div>
	    <div> { props.book.description } </div>
    </div>
)

export default BookView;