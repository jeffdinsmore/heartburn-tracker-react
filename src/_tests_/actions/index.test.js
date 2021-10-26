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

  it('unSelectFoodItem should be null action', () => {
    expect(actions.unSelectFoodItem()).toEqual({type: c.UNSELECT_FOODITEM});
  });

  it('selectFoodItem should create SELECT_FOODITEM action', () => {
    expect(actions.selectFoodItem({brand: "j", foodName: 'Cookies', ingredients: 'flour, sugar, butter, vanilla', heartburn: 'Redux not working!', timeOpen: "jf", id: 1})).toEqual({
      type: c.SELECT_FOODITEM,
      brand: "j",
      foodName: 'Cookies',
      ingredients: 'flour, sugar, butter, vanilla',
      heartburn: 'Redux not working!',
      timeOpen: 'jf',
      id: 1
    });
  });
    
  });
