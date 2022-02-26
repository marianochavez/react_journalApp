import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
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
    active: {
      id: 123,
      title: "Some awesome title",
      body: "What happened today",
      date: 0,
    },
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe("NoteScreen tests", () => {
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call activeNote", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "updated title",
      },
    });

    expect(activeNote).toHaveBeenCalled();
    expect(activeNote).toHaveBeenLastCalledWith(123, {
      id: 123,
      title: "updated title",
      body: "What happened today",
      date: 0,
    });
  });
});
