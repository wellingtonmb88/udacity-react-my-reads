import React from 'react';
import { shallow, mount } from "enzyme";
import Bookshelf from "../Bookshelf";

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
        <Bookshelf
            bookshelfTitle="bookshelfTitle"
            books={books}
            handleBookShelfStateUpdate={bookShelfStateChanged} />);
});

it("executing handleBookShelfStateUpdate", () => {
    const sinon = require('sinon');

    const onParentClick = sinon.spy();
    const wrapper = mount(
        <Bookshelf
            bookshelfTitle="bookshelfTitle"
            books={books}
            handleBookShelfStateUpdate={onParentClick} />);
    wrapper.find("BooksGrid").prop('onBookShelfStateChanged')({});
    expect(onParentClick.callCount).toBe(1);
});