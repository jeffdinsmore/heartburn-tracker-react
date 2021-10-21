import * as c from './../actions/ActionTypes';

const showModalReducer = (state = false, action) => {
  switch (action.type) {
    case c.SHOW_MODAL:
      return !state;
    default:
      return state;
  }
};

export default showModalReducer;