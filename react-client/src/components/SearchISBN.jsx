import React from 'react';

class SearchISBN extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			term: '',
		}
		this.onChange = this.onChange.bind(this);
		this.search = this.search.bind(this);
	}

	onChange(e) {
		this.setState({
			term: e.target.value
		})
	}

	search() {
		console.log('search bar click');
		this.props.onSearch(this.state.term);
	}

	render() {
		return (
			<div style={{marginLeft: 20}}>
				Find a book: 
				<input type="text" name="isbnSearch" placeholder=" Search by ISBN" onChange={this.onChange} value={this.state.term} style={{marginLeft: 10}}/> 
				<button type="button" onClick={this.search} style={{marginLeft: 10}}> Search </button>
			</div>
		)
	}
}

export default SearchISBN;