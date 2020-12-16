import foodItemListReducer from '../../reducers/foodItem-list-reducer';
import * as c from '../../actions/ActionTypes';

describe('foodItemListReducer', () => {

  // let action;
  const currentState = {
    1: {
      foodName: 'Cookies',
      ingredients: 'flour, sugar, butter, vanilla',
      heartburn: 'Redux action is not working correctly.',
      id: 1
    },
    2: {
      foodName: 'Bread',
      ingredients: 'flour, flaxseed, sugar, granola',
      heartburn: 'Reducer has side effects.',
      id: 2
    }
  };

  let action;
  const foodItemData = {
    foodName: 'Cookies',
    ingredients: 'flour, sugar, butter, vanilla',
    heartburn: 'Redux action is not working correctly.',
    id: 1
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(foodItemListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new food item data to masterFoodItemList', () => {
    const { foodName, ingredients, heartburn, id } = foodItemData;
    action = {
      type: c.ADD_FOODITEM,
      foodName: foodName,
      ingredients: ingredients,
      heartburn: heartburn,
      id: id
    };

    expect(foodItemListReducer({}, action)).toEqual({
      [id]: {
        foodName: foodName,
        ingredients: ingredients,
        heartburn: heartburn,
        id: id
      }
    });
  });

  test('Should successfully delete a food item', () => {
    action = {
      type: c.DELETE_FOODITEM,
      id: 1
    };
    expect(foodItemListReducer(currentState, action)).toEqual({
      2: {
        foodName: 'Bread',
        ingredients: 'flour, flaxseed, sugar, granola',
        heartburn: 'Reducer has side effects.',
        id: 2
      }
    });
  });
});