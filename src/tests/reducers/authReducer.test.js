import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("authReducer tests", () => {
  
  const loginAction = {
    type: types.login,
    payload: {
      uid: "123",
      displayName: "John Test",
    },
  };

  const logoutAction = {
    type: types.logout,
  };

  test("should return uid name", () => {

    const state = authReducer({}, loginAction);
    expect(state).toEqual({
      uid: "123",
      name: "John Test",
    });

  });

  test('should clear uid and name', () => { 
    
    const state = authReducer({uid: "123", displayName: "John Test"}, logoutAction);
    expect(state).toEqual({});

  });

  test('should return state by default', () => { 
    const state = authReducer({
      uid: '123', 
      displayName: 'John Test'
    }, {});
    expect(state).toEqual({
      uid: '123',
      displayName: 'John Test'
    });
   })
});
