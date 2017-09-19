import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

class SearchBooksResults extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        handleBookUpdate: PropTypes.func.isRequired,
        wantToReadList: PropTypes.array,
        currentlyReadingList: PropTypes.array,
        readList: PropTypes.array
    };

    updateBookShelfState = (book, shelfState) => {
        this.props.handleBookUpdate(book, shelfState);
    };

    render() {

        const {
            books,
            wantToReadList,
            currentlyReadingList,
            readList
        } = this.props;

        return (
            <div className="search-books-results">
                <BooksGrid
                    wantToReadList={wantToReadList}
                    currentlyReadingList={currentlyReadingList}
                    readList={readList}
                    books={books}
                    onBookShelfStateChanged={this.updateBookShelfState} />
            </div>
        );
    }
};

export default SearchBooksResults;