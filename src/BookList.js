import React from 'react';
import Bookshelf from './Bookshelf';
import If from './If';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Loading = require('react-loading-animation');

class BookList extends React.Component {

    static propTypes = {
        showLoading: PropTypes.bool.isRequired,
        wantToReadList: PropTypes.array.isRequired,
        currentlyReadingList: PropTypes.array.isRequired,
        readList: PropTypes.array.isRequired,
        onBookShelfStateChanged: PropTypes.func.isRequired
    };

    onBookShelfStateChanged = (book, shelfState) => {
        this.props.onBookShelfStateChanged(book, shelfState);
    };

    render() {

        const {
            showLoading,
            wantToReadList,
            currentlyReadingList,
            readList
        } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Loading
                        isLoading={showLoading}
                        width='100px'
                        height='100px'
                        margin='auto' style={{ top: '100px' }} >
                        <div>
                            <If test={currentlyReadingList.length > 0}>
                                <Bookshelf
                                    handleBookShelfStateUpdate={this.onBookShelfStateChanged}
                                    books={currentlyReadingList}
                                    bookshelfTitle="Currently Reading" />
                            </If>
                            <If test={wantToReadList.length > 0}>
                                <Bookshelf
                                    handleBookShelfStateUpdate={this.onBookShelfStateChanged}
                                    books={wantToReadList}
                                    bookshelfTitle="Want to Read" />
                            </If>
                            <If test={readList.length > 0}>
                                <Bookshelf
                                    handleBookShelfStateUpdate={this.onBookShelfStateChanged}
                                    books={readList}
                                    bookshelfTitle="Read" />
                            </If>
                        </div>
                    </Loading>
                </div>
                <div className="open-search">
                    <Link to="/search" className="add-contact">Add a book</Link>
                </div>
            </div>
        );
    }
};

export default BookList;
