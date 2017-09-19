import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BooksGrid extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookShelfStateChanged: PropTypes.func.isRequired,
        wantToReadList: PropTypes.array,
        currentlyReadingList: PropTypes.array,
        readList: PropTypes.array
    };

    updateShelfState = (book, shelfState) => {
        this.props.onBookShelfStateChanged(book, shelfState);
    };

    render() {

        const {
            books,
            wantToReadList,
            currentlyReadingList,
            readList
        } = this.props;

        return (
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book
                            wantToReadList={wantToReadList}
                            currentlyReadingList={currentlyReadingList}
                            readList={readList}
                            book={book}
                            onBookShelfStateChanged={this.updateShelfState} />
                    </li>
                ))}
            </ol>
        );
    }
};

export default BooksGrid;