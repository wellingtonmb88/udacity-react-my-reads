
import React from 'react';
import { shallow, mount } from "enzyme";
import SearchBooks from "../SearchBooks";
import * as MockBooks from "../MockBooks";

const sinon = require('sinon');
const onBookShelfStateChanged = jest.fn();
const onBackPressed = jest.fn();

const bookWantToRead = {
    id: "1",
    title: "Book 1",
    imageLinks: "./icons/defbookcover.jpg",
    shelf: "WantToRead",
    authors: ["author_1", "author_2"]
};

const bookCurrentlyReading = {
    id: "2",
    title: "Book 2",
    imageLinks: "./icons/defbookcover.jpg",
    shelf: "CurrentlyReading",
    authors: ["author_1", "author_2"]
};

const bookRead = {
    id: "3",
    title: "Book 3",
    imageLinks: { thumbnail: "./icons/defbookcover.jpg" },
    shelf: "Read",
    authors: ["author_1", "author_2"]
};

const wantToReadList = [bookWantToRead];
const currentlyReadingList = [bookCurrentlyReading];
const readList = [bookRead];

it("renders without crashing", () => {
    shallow(
        <SearchBooks
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBackPressed={onBackPressed}
            onBookShelfStateChanged={onBookShelfStateChanged} />);
});

it("executing handleBookShelfStateUpdate", () => {
    const onParentClick = sinon.spy();
    const wrapper = mount(
        <SearchBooks
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBackPressed={onBackPressed}
            onBookShelfStateChanged={onParentClick} />);

    wrapper.find("SearchBooksResults").prop('handleBookUpdate')({ target: { value: "test" } });
    expect(onParentClick.callCount).toBe(1);
});

it("executing onSearchBooks", () => {
    window.fetch = MockBooks.fetchWithBooksResult;

    const wrapper = mount(
        <SearchBooks
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBackPressed={onBackPressed}
            onBookShelfStateChanged={onBookShelfStateChanged} />);

    wrapper.find("SearchBooksBar").prop('onSearchBooks')("test");
    expect(wrapper.state().showLoadingSearchResult).toBe(true);
});

it("executing onSearchBooks null", () => {
    window.fetch = MockBooks.fetchWithNoResult;

    const wrapper = mount(
        <SearchBooks
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBackPressed={onBackPressed}
            onBookShelfStateChanged={onBookShelfStateChanged} />);

    wrapper.find("SearchBooksBar").prop('onSearchBooks')(null);
    expect(wrapper.state().showLoadingSearchResult).toBe(true);
});

it("executing onBackPressed", () => {
    const onParentClick = sinon.spy();
    const wrapper = shallow(
        <SearchBooks
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBackPressed={onParentClick}
            onBookShelfStateChanged={onBookShelfStateChanged} />);

    wrapper.find("SearchBooksBar").prop('onBackPressed')({});
    expect(onParentClick.callCount).toBe(1);
});