import React from 'react';
import { shallow, mount } from "enzyme";
import Book from "../Book";

const sinon = require('sinon');

const bookShelfStateChanged = jest.fn();

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
        <Book
            book={bookWantToRead}
            onBookShelfStateChanged={bookShelfStateChanged} />);
});

it("renders with WantToRead", () => {
    shallow(
        <Book
            book={bookWantToRead}
            onBookShelfStateChanged={bookShelfStateChanged}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList} />);
});

it("renders with CurrentlyReading", () => {
    shallow(
        <Book
            book={bookCurrentlyReading}
            onBookShelfStateChanged={bookShelfStateChanged}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList} />);
});

it("renders with Read", () => {
    shallow(
        <Book
            book={bookRead}
            onBookShelfStateChanged={bookShelfStateChanged}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList} />);
});

it("executing onShelfStateChanged", () => {
    const onParentClick = sinon.spy();
    const wrapper = mount(
        <Book
            book={bookRead}
            onBookShelfStateChanged={onParentClick}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList} />);
    wrapper.find("BookshelfChanger").prop('onShelfStateChanged')({ bookRead });
    expect(onParentClick.callCount).toBe(1);
});

const book = {
    id: "0",
    title: "Book",
    imageLinks: { thumbnail: "./icons/defbookcover.jpg" }
};

it("renders book without shelf and authors", () => {
    shallow(
        <Book
            book={book}
            onBookShelfStateChanged={bookShelfStateChanged}
            wantToReadList={[]}
            currentlyReadingList={[]}
            readList={[]} />);
});