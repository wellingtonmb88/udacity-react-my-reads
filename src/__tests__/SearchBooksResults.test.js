import React from 'react';
import { shallow, mount } from "enzyme";
import SearchBooksResults from "../SearchBooksResults";

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

const books = [bookRead];

it("renders without crashing", () => {
    const handleBookUpdate = jest.fn();
    shallow(
        <SearchBooksResults
            books={books}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            handleBookUpdate={handleBookUpdate} />);
});

it("executing onShelfStateChanged", () => {
    const sinon = require('sinon');
    const onParentClick = sinon.spy();
    const wrapper = mount(
        <SearchBooksResults
            books={books}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            handleBookUpdate={onParentClick} />);
    wrapper.find("BooksGrid").prop('onBookShelfStateChanged')({});
    expect(onParentClick.callCount).toBe(1);
});