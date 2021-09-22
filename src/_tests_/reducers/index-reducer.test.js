import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import foodItemListReducer from '../../reducers/foodItem-list-reducer';
import * as c from '../../actions/ActionTypes';
import editingReducer from '../../reducers/editing-reducer';
// import selectFoodItemReducer from '../../reducers/select-foodItem-reducer';

let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      editing: false,
      masterFoodItemList: {},
      formVisibleOnPage: false,
      showModal: false,
      firestore: store.getState().firestore,
      // selectedFoodItem: null
    });
  });

  test('Check that initial state of foodItemListReducer matches root reducer', () => {
    expect(store.getState().masterFoodItemList).toEqual(foodItemListReducer(undefined, { type: null }));
  });

  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });

  test('Check that ADD_FOODITEM action works for foodItemListReducer and root reducer', () => {
    const action = {
      type: c.ADD_FOODITEM,
      foodName: 'Cookies',
      ingredients: 'flour, sugar, butter, vanilla',
      heartburn: 'No',
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().masterFoodItemList).toEqual(foodItemListReducer(undefined, action));
  });

  test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
    const action = {
      type: c.TOGGLE_FORM
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });

  test('Check that default editing state works for editingReducer and rootReducer', () => {
    const action = {
      type: c.EDITING
    };
    store.dispatch(action);
    expect(store.getState().editing).toEqual(editingReducer(false, action));
  });

  test('Check toggle editing state to true with rootReducer', () => {
    const action = {
      type: c.EDITING
    };
    store.dispatch(action);
    expect(store.getState().editing).toEqual(editingReducer(true, action ));
  });
});