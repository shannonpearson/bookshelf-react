import React from 'react';

import Search from './Search';
import SearchResults from './SearchResults';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  onSearch() {
    console.log('searching');
    this.setState({ searchResults: [1, 2, 4] });
  }

  render() {
    return (
      <div>
        <Search onSearch={this.search} />
        {this.state.searchResults.length > 0 &&
          <SearchResults books={this.state.results} />
        }
      </div>
    );
  }
}

export default SearchPage;
