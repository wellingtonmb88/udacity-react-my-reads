import React from 'react';
import { shallow, mount } from "enzyme";
import BookshelfChanger from "../BookshelfChanger";

it("renders without crashing", () => {
    const bookShelfStateChanged = jest.fn();
    shallow(<BookshelfChanger
        shelfState="none"
        onShelfStateChanged={bookShelfStateChanged} />);
});

it("testing action onChange", () => {
    const sinon = require('sinon');
    const onParentClick = sinon.spy();
    const wrapper = mount(
        <BookshelfChanger
            shelfState="none"
            onShelfStateChanged={onParentClick} />);
    wrapper.find("select").simulate('change', { target: { value: 'Currently Reading' } })
    expect(onParentClick.callCount).toBe(1);
});