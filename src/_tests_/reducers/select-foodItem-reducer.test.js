import selectFoodItemReducer from '../../reducers/select-foodItem-reducer';
import * as c from '../../actions/ActionTypes';

describe('selectFoodItemReducer', () => {

  let action;
  const currentState = {
    1: {
      brand: "Newman's Own2",
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
  }

  const foodItemData = {
    brand: "Newman's Own",
    foodName: 'Cookies',
    ingredients: 'flour, sugar, butter, vanilla',
    heartburn: 'Redux action is not working correctly.',
    id: 1
  };

  test('Should return default state if no action type is recognized', () => {
    expect(selectFoodItemReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully update selected foodItem', () => {
    const { brand, foodName, ingredients, heartburn, timeOpen, id } = foodItemData;
    action = {
      type: c.SELECT_FOODITEM,
      brand: brand,
      foodName: foodName,
      ingredients: ingredients,
      heartburn: heartburn,
      timeOpen: timeOpen,
      id: id
    };
    expect(selectFoodItemReducer({}, action)).toEqual({
      brand: brand,
      foodName: foodName,
      ingredients: ingredients,
      heartburn: heartburn,
      timeOpen: timeOpen,
      id: id
    });
  });

  test('Should successfully update selected foodItem to null when unselecting', () => {
    action = {
      type: c.UNSELECT_FOODITEM,
    };
    expect(selectFoodItemReducer({}, action)).toEqual(null);
  });
});