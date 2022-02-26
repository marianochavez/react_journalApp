import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "GXqEASTTfmZDq",
    name: "Juan Carlo",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe("Sidebar tests", () => {
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call startLogout", () => {
    wrapper.find("button").prop("onClick")();
    expect(startLogout).toHaveBeenCalled();
  });

  test("should call startNewNote", () => {
    wrapper.find(".journal__new-entry").simulate("click");
    expect(startNewNote).toHaveBeenCalled();
  });
});
