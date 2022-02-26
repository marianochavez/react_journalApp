import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { act } from "react-dom/test-utils";

import { AppRouter } from "../../routers/AppRouter";
import { login } from "../../actions/auth";
import { firebase } from "../../firebase/firebase-config";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "ABC",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("AppRouter tests", () => {
  test("should login if is authenticated", async () => {
    let user;

    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword("test@testing.com", "123456");

      user = userCred.user;

      const wrapper = mount(
        <Provider store={store}>
          <AppRouter />
        </Provider>
      );
    });

    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith('GXqEASTTfmZDq3x2e6C0LV8BCtr2',null);
  });
});
