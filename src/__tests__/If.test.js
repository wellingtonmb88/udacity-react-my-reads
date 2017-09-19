// src/__tests__/If.test.js
import React from 'react';
import { shallow } from "enzyme";
import If from "../If";

it("renders without crashing", () => {
  shallow(<If />);
});

it("testing the rest of the conditional", () => {
  shallow(
    <If test={true}>
      <span>Test</span>
    </If>
  );
});