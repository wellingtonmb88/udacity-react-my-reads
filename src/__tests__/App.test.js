import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow, mount } from "enzyme";
import * as MockBooks from "../MockBooks";
import { MemoryRouter } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';

const book = JSON.parse(MockBooks.book);

const ShelfCategory = {
  CurrentlyReading: "currentlyReading",
  WantToRead: "wantToRead",
  Read: "read"
};

let pushedRouterPath = "";

const MountOptions = (path) => {

  return {
    context: {
      router: {
        route: {
          location: { pathname: path, search: '', hash: '', key: 1 },
        },
        history: {
          createHref: (a, b) => { },
          push: (path, state) => { pushedRouterPath = path },
          replace: () => { }
        }
      }
    }, childContextTypes: {
      router: PropTypes.object
    }
  }
};

it("renders without crashing", () => {
  shallow(<App />);
});

it("executing BookList's onBookShelfStateChanged with Books Result", () => {
  window.fetch = MockBooks.fetchWithBooksResult;

  const wrapper = mount(<App />, MountOptions('/'));

  return BooksAPI.getAll().then(() => {

    expect(wrapper.state().wantToReadList.length).toEqual(0);
    expect(wrapper.state().currentlyReadingList.length).toEqual(1);
    expect(wrapper.state().readList.length).toEqual(0);

    wrapper.find("BookList").prop('onBookShelfStateChanged')(book, ShelfCategory.Read);

    expect(wrapper.state().wantToReadList.length).toEqual(0);
    expect(wrapper.state().currentlyReadingList.length).toEqual(0);
    expect(wrapper.state().readList.length).toEqual(1);

  });
});


it("executing BookList's onBookShelfStateChanged with Empty Books Result", () => {

  window.fetch = MockBooks.fetchWithNoResult;

  const wrapper = mount(<App />, MountOptions('/'));

  return BooksAPI.getAll().then(() => {

    expect(wrapper.state().wantToReadList.length).toEqual(0);
    expect(wrapper.state().currentlyReadingList.length).toEqual(0);
    expect(wrapper.state().readList.length).toEqual(0);

    wrapper.find("BookList").prop('onBookShelfStateChanged')(book, ShelfCategory.CurrentlyReading);

    expect(wrapper.state().wantToReadList.length).toEqual(0);
    expect(wrapper.state().currentlyReadingList.length).toEqual(1);
    expect(wrapper.state().readList.length).toEqual(0);

  });
});

it("executing SearchBooks' onBookShelfStateChanged with Empty Books Result", () => {

  window.fetch = MockBooks.fetchWithNoResult;

  const wrapper = mount(<App />, MountOptions('/search'));

  return BooksAPI.getAll().then(() => {

    expect(wrapper.state().wantToReadList.length).toEqual(0);
    expect(wrapper.state().currentlyReadingList.length).toEqual(0);
    expect(wrapper.state().readList.length).toEqual(0);

    wrapper.find("SearchBooks").prop('onBookShelfStateChanged')(book, ShelfCategory.WantToRead);

    expect(wrapper.state().wantToReadList.length).toEqual(1);
    expect(wrapper.state().currentlyReadingList.length).toEqual(0);
    expect(wrapper.state().readList.length).toEqual(0);

  });
});

it("executing SearchBooks' onBookShelfStateChanged with Books Result", () => {

  window.fetch = MockBooks.fetchWithBooksResult;

  const wrapper = mount(<App />, MountOptions('/search'));

  return BooksAPI.getAll().then(() => {

    expect(wrapper.state().wantToReadList.length).toEqual(0);
    expect(wrapper.state().currentlyReadingList.length).toEqual(1);
    expect(wrapper.state().readList.length).toEqual(0);

    wrapper.find("SearchBooks").prop('onBookShelfStateChanged')(book, ShelfCategory.Read);

    expect(wrapper.state().wantToReadList.length).toEqual(0);
    expect(wrapper.state().currentlyReadingList.length).toEqual(0);
    expect(wrapper.state().readList.length).toEqual(1);

  });
});

it("executing SearchBooks' onBackPressed", () => {

  window.fetch = MockBooks.fetchWithBooksResult;

  const wrapper = mount(<App />, MountOptions('/search'));

  wrapper.find("SearchBooks").prop('onBackPressed')({});

  expect(pushedRouterPath).toEqual("/");
});