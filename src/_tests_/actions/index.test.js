import * as actions from './../../actions';
import * as c from '../../actions/ActionTypes';

describe('heartburn tracker actions', () => {
it('deleteFoodItem should create DELETE_FOODITEM action', () => {
    expect(actions.deleteFoodItem(1)).toEqual({
      type: c.DELETE_FOODITEM,
      id: 1
    });
  });

  it('toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: c.TOGGLE_FORM
    });
  });

  it('addFoodItem should create ADD_FOODITEM action', () => {
    expect(actions.addFoodItem({foodName: 'Cookies', ingredients: 'flour, sugar, butter, vanilla', heartburn: 'Redux not working!', id: 1})).toEqual({
      type: c.ADD_FOODITEM,
      foodName: 'Cookies',
      ingredients: 'flour, sugar, butter, vanilla',
      heartburn: 'Redux not working!',
      id: 1
    });
  });
});