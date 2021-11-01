import signInNameReducer from '../../reducers/sign-in-name-reducer';
import * as c from '../../actions/ActionTypes';

const item = {user: "Joey"};
let action;

describe("signInNameReducer", () => {

  test('Should return default state if no action type is recognized', () => { 
  const { user } = item;
  action = {
    type: c.SIGN_IN_NAME,
    user: user
  };
    expect(signInNameReducer({}, action )).toEqual({user: user});
  });

  test('Should toggle showModal state and return true', () => {
    expect(signInNameReducer({}, { type: c.SIGN_OUT })).toEqual({user: "Signed out"});
  });

  test('Should return default state if no action type is recognized', () => {

    expect(signInNameReducer({user: "Not signed in"}, { type: null })).toEqual({ user: "Not signed in" });
  });

});