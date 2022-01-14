import * as c from '../actions/ActionTypes';

const historyReducer = (state = { path: null }, action) => {
  const { path } = action;
  switch (action.type) {
    case c.HISTORY:
      return state = {
        path: path,
      };
    default:
      return state;
  }
};

export default historyReducer;