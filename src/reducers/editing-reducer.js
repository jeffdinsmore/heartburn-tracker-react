import * as c from '../actions/ActionTypes';

const editingReducer = (state = false, action) => {
  switch (action.type) {
    case c.EDITING:
      return !state;
    default:
      return state;
  };
}

export default editingReducer;