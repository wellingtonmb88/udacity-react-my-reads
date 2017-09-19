import React from 'react';
import { shallow, mount } from "enzyme";
import BookList from "../BookList";

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
    const handleBookShelfStateUpdate = jest.fn();
    shallow(
        <BookList
            showLoading={true}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBookShelfStateChanged={handleBookShelfStateUpdate} />);
});

it("executing onBookShelfStateChanged", () => {
    const sinon = require('sinon');
    const onParentClick = sinon.spy();
    const wrapper = shallow(
        <BookList
            showLoading={true}
            wantToReadList={wantToReadList}
            currentlyReadingList={currentlyReadingList}
            readList={readList}
            onBookShelfStateChanged={onParentClick} />);
    wrapper.find("Bookshelf").at(0).prop('handleBookShelfStateUpdate')({});
    expect(onParentClick.callCount).toBe(1);
});