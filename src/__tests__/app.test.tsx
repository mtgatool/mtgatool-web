/* eslint-env jest */
import React from "react";
import App from "../App";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../redux/stores/webStore";

test("Renders", () => {
  const component = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  /*
  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  */
});
