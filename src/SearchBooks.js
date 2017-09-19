import React from 'react';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

const Loading = require('react-loading-animation');

class SearchBooks extends React.Component {

    static propTypes = {
        wantToReadList: PropTypes.array.isRequired,
        currentlyReadingList: PropTypes.array.isRequired,
        readList: PropTypes.array.isRequired,
        onBackPressed: PropTypes.func.isRequired,
        onBookShelfStateChanged: PropTypes.func.isRequired,
        onSearchBooks: PropTypes.func
    };

    state = {
        showLoadingSearchResult: false,
        searchedBooks: []
    };

    updateSearchedBooks = (searchedBooks) => {
        this.setState({ searchedBooks });
    };

    showLoadingSearchResult = (shouldShow) => {
        this.setState({ showLoadingSearchResult: shouldShow });
    };

    onSearchBooks = (query) => {
        this.showLoadingSearchResult(true);
        BooksAPI.search(query, 10).then((books) => {
            this.showLoadingSearchResult(false);
            if (books && books.length > 0) {
                this.updateSearchedBooks(books);
            }
        });
    };

    onBackPressed = () => {
        this.props.onBackPressed();
    };

    handleBookShelfStateUpdate = (book, shelfState) => {
        this.props.onBookShelfStateChanged(book, shelfState);
    };

    render() {

        const { wantToReadList, currentlyReadingList, readList } = this.props;

        const { searchedBooks, showLoadingSearchResult } = this.state;

        return (
            <div className="search-books">
                <SearchBooksBar
                    onBackPressed={this.onBackPressed}
                    onSearchBooks={this.onSearchBooks} />
                <Loading
                    isLoading={showLoadingSearchResult}
                    width='100px'
                    height='100px'
                    margin='auto'
                    style={{ top: '100px' }} >
                    <SearchBooksResults
                        wantToReadList={wantToReadList}
                        currentlyReadingList={currentlyReadingList}
                        readList={readList}
                        books={searchedBooks}
                        handleBookUpdate={this.handleBookShelfStateUpdate} />
                </Loading>
            </div>
        );
    }
};

export default SearchBooks;
