import React from 'react';
import { shallow, mount } from "enzyme";
import SearchBooksBar from "../SearchBooksBar";

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
    const onSearchBooks = jest.fn();
    shallow(
        <SearchBooksBar
            onSearchBooks={onSearchBooks} />);
});

it("executing onSearchBooks", () => {
    const sinon = require('sinon');
    const onParentClick = sinon.spy();
    const wrapper = shallow(
        <SearchBooksBar
            onSearchBooks={onParentClick} />);

    wrapper.find("input").simulate('change', { target: { value: "test" } });
    expect(onParentClick.callCount).toBe(1);
});


it("executing onSearchBooks, Query is empty", () => {
    const sinon = require('sinon');
    const onParentClick = sinon.spy();
    const wrapper = shallow(
        <SearchBooksBar
            onSearchBooks={onParentClick} />);

    wrapper.find("input").simulate('change', { target: { value: null } });
    expect(onParentClick.callCount).toBe(0);
});

it("executing onBackPressed", () => {
    const onSearchBooks = jest.fn();
    const sinon = require('sinon');
    const onParentClick = sinon.spy();
    const wrapper = shallow(
        <SearchBooksBar
            onBackPressed={onParentClick}
            onSearchBooks={onSearchBooks} />);

    wrapper.find("a").simulate('click');
    expect(onParentClick.callCount).toBe(1);
});