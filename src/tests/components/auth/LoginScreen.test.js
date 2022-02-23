import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { LoginScreen } from "../../../components/auth/LoginScreen";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("LoginScreen tests", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch startGoogleLogin action", () => {
    wrapper.find(".google-btn").prop("onClick")();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("should dispatch startLogin with args", () => {
    wrapper.find("form").prop("onSubmit")({
      preventDefault(){},
    });
    expect(startLoginEmailPassword).toHaveBeenLastCalledWith(
        'pepe@gmail.com',
        '123456'
    );

  });
});
