import React from 'react';
import ListItem from './ListItem.jsx';



class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          something: null
        }
    }

    // show(book) {
    // 	// input is entire book item so we can just do props select book on the book
    // 	this.props.selectBook(book);
    // }

    render() {
	  	(<div>
	    	<h4> List Component </h4>
	    	There are { props.books.length } books.
	    	{ props.books.map(book => <ListItem book={book} onClick={this.props.selectBook(book)}/>)}
	  	</div>
		)
  	}
)

export default List;