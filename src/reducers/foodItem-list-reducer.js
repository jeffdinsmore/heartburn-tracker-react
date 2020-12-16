import * as c from './../actions/ActionTypes';


export default (state = {}, action) => {
  const { foodName, ingredients, heartburn, id, formattedWaitTime, timeOpen } = action;
  switch (action.type) {
  case c.ADD_FOODITEM:
    return Object.assign({}, state, {
      [id]: {
        foodName: foodName,
        ingredients: ingredients,
        heartburn: heartburn,
        id: id,
        timeOpen: timeOpen,
        formattedWaitTime: formattedWaitTime
      }
    });
  case c.DELETE_FOODITEM:
    const newState = { ...state };
    delete newState[id];
    return newState;
  
  case c.UPDATE_TIME:
    const newFoodItem = Object.assign({}, state[id], {formattedWaitTime});
    const updatedState = Object.assign({}, state, {
      [id]: newFoodItem
    });
    return updatedState;
    default: 
      return state;
  }
};