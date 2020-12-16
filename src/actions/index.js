import * as c from './../actions/ActionTypes';

export const addFoodItem = (foodItem) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = foodItem;
  return {
    type: c.ADD_FOODITEM,
    names: names,
    location: location,
    issue: issue,
    id: id,
    formattedWaitTime,
    timeOpen: timeOpen
  }
}

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const deleteFoodItem = id => ({
  type: c.DELETE_FoodItem,
  id
});