import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("auth actions test", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should login and logout create actions", () => {
    const uid = "testing";
    const displayName = "testing";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });
    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("should logout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });
    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("should init startLoginEmailPassword", async () => {
    await store.dispatch(startLoginEmailPassword("test@testing.com", "123456"));
    const actions = store.getActions();
    

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "GXqEASTTfmZDq3x2e6C0LV8BCtr2",
        displayName: null,
      },
    });
  });
});
