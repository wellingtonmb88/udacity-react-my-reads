import React, { Component } from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookShelfStateChanged: PropTypes.func.isRequired,
        wantToReadList: PropTypes.array,
        currentlyReadingList: PropTypes.array,
        readList: PropTypes.array
    };

    state = {
        updatedBook: {}
    };

    componentWillMount() {
        this.updateBook();
    }

    updateBook = () => {
        const wantToReadList = this.props.wantToReadList;
        const currentlyReadingList = this.props.currentlyReadingList;
        const readList = this.props.readList;

        const { book } = this.props;

        if (wantToReadList && currentlyReadingList && readList) {
            let bookFoundAtWantToRead = wantToReadList.filter((b) => b.id === book.id)[0];
            let bookFoundAtCurrentlyReading = currentlyReadingList.filter((b) => b.id === book.id)[0];
            let bookFoundAtRead = readList.filter((b) => b.id === book.id)[0];

            if (bookFoundAtWantToRead) {
                book.shelf = bookFoundAtWantToRead.shelf;
            } else if (bookFoundAtCurrentlyReading) {
                book.shelf = bookFoundAtCurrentlyReading.shelf;
            } else if (bookFoundAtRead) {
                book.shelf = bookFoundAtRead.shelf;
            }
        }

        this.setState({ updatedBook: book });
    };

    updateShelfState = (state) => {
        this.props.onBookShelfStateChanged(this.state.updatedBook, state);
    };

    getThumbnail = (book) => {
        if (book.imageLinks && book.imageLinks.thumbnail) {
            return `url("${book.imageLinks.thumbnail}")`;
        } else {
            return "./icons/defbookcover.jpg";
        }
    };

    render() {

        const { updatedBook } = this.state;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{ width: 128, height: 193, backgroundImage: this.getThumbnail(updatedBook) }} />
                    <BookshelfChanger
                        shelfState={(updatedBook.shelf ? updatedBook.shelf : "none")}
                        onShelfStateChanged={this.updateShelfState} />
                </div>
                <div className="book-title">{updatedBook.title}</div>
                {updatedBook.authors ? (updatedBook.authors.map((author) => (
                    <div key={author} className="book-authors">{author}</div>
                ))
                ) : (<div />)
                }
            </div>
        );
    }
};

export default Book;