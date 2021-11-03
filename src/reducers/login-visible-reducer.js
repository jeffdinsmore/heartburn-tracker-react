import * as c from './../actions/ActionTypes';

const loginVisibleReducer = (state = false, action) => {
  switch (action.type) {
    case c.LOGIN_VISIBLE:
      return !state;
    default:
      return state;
  }
};

export default loginVisibleReducer;