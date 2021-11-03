import * as c from './../actions/ActionTypes';

export const addFoodItem = (foodItem) => {
  const { brand, foodName, ingredients, heartburn, id } = foodItem;
  return {
    type: c.ADD_FOODITEM,
    brand: brand,
    foodName: foodName,
    ingredients: ingredients,
    heartburn: heartburn,
    id: id,
  }
}

export const homepageVisible = () => ({
  type: c.HOMEPAGE
})



export const signOut = () => ({
  type: c.SIGN_OUT
});

export const loginVisible = () => ({
  type: c.LOGIN_VISIBLE
});


export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const deleteFoodItem = (id) => ({
  type: c.DELETE_FOODITEM,
  id
});

export const editing = () => {
  return {
    type: c.EDITING
  }
}

export const showModal = () => {
  return {
    type: c.SHOW_MODAL
  }
}

export const signInName = (input) => {
  const { user } = input;
  console.log("jjj", user, input)
  return {
    type: c.SIGN_IN_NAME,
    user: input,
  }
};

export const selectFoodItem = (foodItem) => {
  const { brand, foodName, ingredients, heartburn, timeOpen, id } = foodItem;
  return {
    type: c.SELECT_FOODITEM,
    brand: brand,
    foodName: foodName,
    ingredients: ingredients,
    heartburn: heartburn,
    timeOpen: timeOpen,
    id: id,
  }
}

export const unSelectFoodItem = () => {
  return {
    type: c.UNSELECT_FOODITEM
  }
}

export const toggleHomepageShowing = () => ({
  type: c.TOGGLE_HOMEPAGE_SHOWING
});

export const togglefooditemlistShowing = () => ({
  type: c.TOGGLE_FOODITEM_LIST_SHOWING
});