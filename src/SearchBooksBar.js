import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBooksBar extends Component {

  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired,
    onBackPressed: PropTypes.func
  };

  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({ query });
    if (query) {
      this.props.onSearchBooks(query);
    }
  };

  render() {

    const { query } = this.state;

    return (
      <div className="search-books-bar">
        <a className="close-search" onClick={() => this.props.onBackPressed()}>Close</a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)} />
        </div>
      </div>
    );
  }
};

export default SearchBooksBar;