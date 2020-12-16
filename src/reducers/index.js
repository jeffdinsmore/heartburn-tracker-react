import formVisibleReducer from './form-visible-reducer';
import foodItemListReducer from './foodItem-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterFoodItemList: foodItemListReducer,
  firestore: firestoreReducer
});

export default rootReducer;