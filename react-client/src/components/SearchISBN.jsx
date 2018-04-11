import React from 'react';
import axios from 'axios';

class SearchISBN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  search(query) {
    console.log('query:', query);
    const searchQuery = query.split(' ').join('+');
    const url = `http://openlibrary.org/search.json?q=${searchQuery}`;
    axios
      .get(url)
      .catch((error) => {
        console.log('search error', error);
      })
      .then((response) => {
        const docs = response.data.docs.slice(0, 4);
        const books = [];
        docs.forEach(async (obj) => {
          console.log(obj);
          const bookObj = {
            isbn: obj.isbn ? obj.isbn[0] : null,
            title: obj.title_suggest || obj.title || null,
            author: obj.author_name ? obj.author_name[0] : null,
            year: obj.publish_year ? Math.min(...obj.publish_year) : null,
            key: obj.key || null,
            cover: obj.cover_i
              ? `http://covers.openlibrary.org/b/id/${obj.cover_i}-M.jpg`
              : null,
          };
          books.push(bookObj);
        });
        this.setState({ searchResults: books }, () => {
          console.log(this.state.searchResults);
        });
      });
  }

  render() {
    return (
      <div style={{ marginLeft: 20 }}>
        <span> Find a book: </span>
        <input
          type="text"
          name="isbnSearch"
          placeholder=" Search by ISBN"
          onChange={this.onChange}
          value={this.state.term}
          style={{ marginLeft: 10 }}
        />
        <button type="button" onClick={this.search} style={{ marginLeft: 10 }}>
          {' '}
          Search{' '}
        </button>
      </div>
    );
  }
}

export default SearchISBN;
