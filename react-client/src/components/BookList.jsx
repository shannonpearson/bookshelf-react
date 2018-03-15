import React from 'react';
import BookItem from './BookItem.jsx';



class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          something: null
        }
    }

    render() {
	  	(<div>
	    	<h4> List Component </h4>
	    	There are { props.books.length } books.
	    	{ props.books.map(book => <ListItem book={book} onClick={this.props.selectBook(book)}/>)}
	  	</div>
		)
  	}
}

export default BookList;