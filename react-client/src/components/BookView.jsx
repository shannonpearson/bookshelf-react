import React from 'react';
import axios from 'axios';

import { DropdownButton, MenuItem } from 'react-bootstrap';

class BookView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			added: false,
		}
	}
	
	addToShelf(e) {
		axios.post('/books/save', {shelf: e.target.value, book: this.props.book});
	}

	render() {
		const { book } = this.props;
		return (
			<div>
				<div>
					<div> { book.title } </div>
					<div> { book.author } </div>
					<div> { book.year } </div>
					<div> { book.pages } pages </div>
					<div> { book.genre } </div>
					<div> { book.description } </div>
				</div>
				<DropdownButton>
					<MenuItem eventKey={1}> Bookshelf </MenuItem>
					<MenuItem eventKey={2}> Favorites </MenuItem>
					<MenuItem eventKey={3}> Interested </MenuItem>
				</DropdownButton>
			</div>
			
		)
	}	
}

export default BookView;