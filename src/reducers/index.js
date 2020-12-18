import formVisibleReducer from './form-visible-reducer';
import foodItemListReducer from './foodItem-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import editingReducer from './editing-reducer';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterFoodItemList: foodItemListReducer,
  editing: editingReducer,
  // firestore: firestoreReducer
});

export default rootReducer;