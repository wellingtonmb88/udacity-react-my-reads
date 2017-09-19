import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import BookList from './BookList';
import { Route } from 'react-router-dom';

const ShelfCategory = {
  CurrentlyReading: "currentlyReading",
  WantToRead: "wantToRead",
  Read: "read"
};

class BooksApp extends React.Component {

  state = {
    loading: true,
    books: [],
    wantToReadList: [],
    currentlyReadingList: [],
    readList: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ loading: false });
      this.updateBooks(books);
    });
  }

  updateBooks = (books) => {
    this.setState({ currentlyReadingList: books.filter((book) => book.shelf === ShelfCategory.CurrentlyReading) });
    this.setState({ wantToReadList: books.filter((book) => book.shelf === ShelfCategory.WantToRead) });
    this.setState({ readList: books.filter((book) => book.shelf === ShelfCategory.Read) });
    this.setState({ books });
  };

  handleBookShelfStateUpdate = (book, shelfState) => {
    let targetBook = this.state.books.filter((b) => b.id === book.id)[0];

    let bookList = this.state.books.filter((b) => b.id !== book.id);

    if (!targetBook) {
      book.shelf = shelfState;
      targetBook = book;
    } else {
      targetBook.shelf = shelfState;
    }

    bookList.push(targetBook);

    this.updateBooks(bookList);

    BooksAPI.update(book, shelfState);
  };

  render() {

    const {
      loading,
      wantToReadList,
      currentlyReadingList,
      readList
    } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            showLoading={loading}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBookShelfStateChanged={this.handleBookShelfStateUpdate} />
        )} />
        <Route exact path="/search" render={({ history }) => (
          <SearchBooks
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBackPressed={() => { history.push("/") }}
            onBookShelfStateChanged={this.handleBookShelfStateUpdate} />
        )} />
      </div>
    );
  }
};

export default BooksApp;
