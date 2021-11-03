import * as c from './../actions/ActionTypes';

const homepageVisibleReducer = (state = true, action) => {
  switch (action.type) {
  case c.HOMEPAGE:
    return !state;
  default:
    return state;
  }
};

export default homepageVisibleReducer;