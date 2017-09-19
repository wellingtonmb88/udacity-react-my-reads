import React from 'react';
import { shallow, mount } from "enzyme";
import BooksGrid from "../BooksGrid";

const bookRead = {
    id: "3",
    title: "Book 3",
    imageLinks: { thumbnail: "./icons/defbookcover.jpg" },
    shelf: "Read",
    authors: ["author_1", "author_2"]
};

const books = [bookRead];

it("renders without crashing", () => {
    const bookShelfStateChanged = jest.fn();
    shallow(
        <BooksGrid
            books={books}
            onBookShelfStateChanged={bookShelfStateChanged} />);
});

it("executing onShelfStateChanged", () => {
    const sinon = require('sinon');
    const onParentClick = sinon.spy();
    const wrapper = mount(
        <BooksGrid
            books={books}
            onBookShelfStateChanged={onParentClick} />);
    wrapper.find("Book").prop('onBookShelfStateChanged')({});
    expect(onParentClick.callCount).toBe(1);
});