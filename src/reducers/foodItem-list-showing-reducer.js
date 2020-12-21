import * as c from './../actions/ActionTypes';

export default (state = false, action) => {
  switch (action.type) {
  case c.TOGGLE_FOODITEM_LIST_SHOWING:
    return !state;
  default:
    return state;
  }
};