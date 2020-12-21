import formVisibleReducer from './form-visible-reducer';
import foodItemListReducer from './foodItem-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import editingReducer from './editing-reducer';
import homepageVisibleReducer from './homepage-visible-reducer';
import foodItemListShowingReducer from './fooditem-list-showing-reducer'

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterFoodItemList: foodItemListReducer,
  editing: editingReducer,
  fooditemlistshowing: foodItemListShowingReducer,
  homepageShowing: homepageVisibleReducer,
  firestore: firestoreReducer
});

export default rootReducer;