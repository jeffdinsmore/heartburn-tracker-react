import * as c from './../actions/ActionTypes';

export const addFoodItem = (foodItem) => {
  const { foodName, ingredients, heartburn, id } = foodItem;
  return {
    type: c.ADD_FOODITEM,
    foodName: foodName,
    ingredients: ingredients,
    heartburn: heartburn,
    id: id,
  }
}

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const deleteFoodItem = id => ({
  type: c.DELETE_FOODITEM,
  id
});

export const editing = () => {
  return {
    type: c.EDITING
  }
}

export const editingFalse = () => {
  return {
    type: c.EDITING_FALSE
  }
}

export const selectFoodItem = (foodItem) => {
  const { foodName, ingredients, heartburn, id } = foodItem;
  return {
    type: c.SELECT_FOODITEM,
    foodName: foodName,
    ingredients: ingredients,
    heartburn: heartburn,
    id: id,
  }
}

export const unSelectedFoodItem = () => {
  return {
    type: c.UNSELECT_FOODITEM,
  }
}

export const toggleHomepageShowing = () => ({
  type: c.TOGGLE_HOMEPAGE_SHOWING
});

export const togglefooditemlistShowing = () => ({
  type: c.TOGGLE_FOODITEM_LIST_SHOWING
});