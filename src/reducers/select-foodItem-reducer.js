import * as c from './../actions/ActionTypes';

const selectFoodItemReducer = (state = null, action) => {
  const { brand, foodName, ingredients, heartburn, id } = action;
  switch (action.type) {
    case c.SELECT_FOODITEM:
      return Object.assign({}, state, {
        [id]: {
          brand: brand,
          foodName: foodName,
          ingredients: ingredients,
          heartburn: heartburn,
          id: id,
        }
      });
    case c.UNSELECT_FOODITEM:
      return state = null;
    default:
      return state;
  }
};

// const firestoreFoodItem = {
//   foodName: foodItem.get("foodName"),
//   ingredients: foodItem.get("ingredients"),
//   heartburn: foodItem.get("heartburn"),
//   timeOpen: foodItem.get("timeOpen"),
//   id: foodItem.id
// }

export default selectFoodItemReducer;