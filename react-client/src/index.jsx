import React from 'react';
import ReactDOM from 'react-dom';

import { Nav, Navbar, NavItem } from 'react-bootstrap';

import SearchPage from './components/SearchPage';
import BookShelf from './components/BookShelf';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
    };
    this.renderBookshelves = this.renderBookshelves.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
  }

  renderBookshelves() {
    this.setState({ showSearch: false });
  }

  renderSearch() {
    this.setState({ showSearch: true });
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <span> Library </span>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} onClick={this.renderBookshelves}>
                My Bookshelves
            </NavItem>
            <NavItem eventKey={2} onClick={this.renderSearch}>
                Search
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="#/login">
              Log In
            </NavItem>
            <NavItem eventKey={4} href="#/logout">
              Log Out
            </NavItem>
          </Nav>
        </Navbar>
        {this.state.showSearch ? <SearchPage /> : <BookShelf />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

