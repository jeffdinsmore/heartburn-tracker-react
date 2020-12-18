import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import foodItemListReducer from '../../reducers/foodItem-list-reducer';
import * as c from '../../actions/ActionTypes';
import editingReducer from '../../reducers/editing-reducer';
// import selectFoodItemReducer from '../../reducers/select-foodItem-reducer';
import { firestoreReducer } from 'redux-firestore';

let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      editing: false,
      masterFoodItemList: {},
      formVisibleOnPage: false,
      // firestore: firestoreReducer,
      // selectedFoodItem: null
    });
  });

});