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
      console.log('PROPS:', this.props)
	  	return (<div>
        { this.props.books.map(book => <BookItem key={book.isbn} book={book} onClick={this.props.selectBook(book)}/>)}
      </div>

      )
    }   
}

export default BookList;
	    	// There are { this.props.books.length } books.