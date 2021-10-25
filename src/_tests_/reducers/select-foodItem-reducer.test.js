import selectFoodItemReducer from '../../reducers/select-foodItem-reducer';
import * as c from '../../actions/ActionTypes';

describe('selectFoodItemReducer', () => {

  let action;
  // [{
  //   name: "Pepsi",
  //   brand: "Pepsi",
  //   sugarContent: "55",
  //   pints: 123,
  //   price: "4",
  //   id:"1" 
  // }]
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
  }

  const foodItemData = {
    foodName: 'Cookies',
    ingredients: 'flour, sugar, butter, vanilla',
    heartburn: 'Redux action is not working correctly.',
    id: 1
  };

  test('Should return default state if no action type is recognized', () => {
    expect(selectFoodItemReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully update selected foodItem', () => {
    const { foodName, ingredients, heartburn, id } = foodItemData;
    action = {
      type: c.SELECT_FOODITEM,
      foodName: foodName,
      ingredients: ingredients,
      heartburn: heartburn,
      id: id
    };
    expect(selectFoodItemReducer({}, action)).toEqual({
      foodName: foodName,
      ingredients: ingredients,
      heartburn: heartburn,
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