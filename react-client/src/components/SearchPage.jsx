import React from 'react';

import SearchISBN from './SearchISBN';
import SearchResultsList from './SearchResultsList';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  onSearch() {
    console.log('searching');
    this.setState({ searchResults: [1, 2, 4] });
  }

  render() {
    return (
      <div>
        <SearchISBN onSearch={this.search} />
        {this.state.searchResults.length > 0 &&
          <SearchResultsList books={this.state.searchResults} />
        }
      </div>
    );
  }
}

export default SearchPage;
