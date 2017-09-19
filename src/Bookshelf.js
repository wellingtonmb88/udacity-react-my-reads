import React, { Component } from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

class Bookshelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        bookshelfTitle: PropTypes.string.isRequired,
        handleBookShelfStateUpdate: PropTypes.func.isRequired
    };

    updateBookShelfState = (book, shelfState) => {
        this.props.handleBookShelfStateUpdate(book, shelfState);
    };

    render() {

        const { books, bookshelfTitle } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        books={books}
                        onBookShelfStateChanged={this.updateBookShelfState} />
                </div>
            </div>
        );
    }
};

export default Bookshelf;