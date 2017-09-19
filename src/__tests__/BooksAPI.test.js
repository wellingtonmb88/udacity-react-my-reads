import * as BooksAPI from '../BooksAPI';
import * as MockBooks from "../MockBooks";

it("executing getToken", () => {
  expect(BooksAPI.getToken()).toBeDefined()
});

it("executing get", () => {
  window.fetch = MockBooks.fetchWithBookResult;
  BooksAPI.get("000").then(book => {
    expect(book).toEqual(JSON.parse(MockBooks.book));
  })
});

it("executing getAll", () => {
  window.fetch = MockBooks.fetchWithBooksResult;
  BooksAPI.getAll().then(books => {
    expect(books).toHaveLength(1);
    expect(books).toEqual(JSON.parse(MockBooks.books));
  })
});

it("executing update", () => {
  window.fetch = MockBooks.fetchWithBookResult;
  BooksAPI.update({}, "read").then(res => {
    expect(res).toEqual(JSON.parse('{"book":' + MockBooks.book + '}'));
  })
});

it("executing search", () => {
  window.fetch = MockBooks.fetchWithBooksResult;
  BooksAPI.search("test", 10).then(books => {
    expect(books).toHaveLength(1);
    expect(books).toEqual(JSON.parse(MockBooks.books));
  })
});