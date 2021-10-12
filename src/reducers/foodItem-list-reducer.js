import * as c from './../actions/ActionTypes';

const foodItemListReducer = (state = {}, action) => {
  const { foodName, ingredients, heartburn, timeOpen, id } = action;
  switch (action.type) {
    case c.ADD_FOODITEM:
      return Object.assign({}, state, {
        [id]: {
          foodName: foodName,
          ingredients: ingredients,
          heartburn: heartburn,
          timeOpen: timeOpen,
          id: id,
        }
      });
    case c.DELETE_FOODITEM:
      const newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
};

export default foodItemListReducer;