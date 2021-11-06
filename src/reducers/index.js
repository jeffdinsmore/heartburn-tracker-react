import formVisibleReducer from './form-visible-reducer';
import foodItemListReducer from './foodItem-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import editingReducer from './editing-reducer';
import showModalReducer from './show-modal-reducer';
import selectFoodItemReducer from './select-foodItem-reducer';
import homepageVisibleReducer from './homepage-visible-reducer';
import signInNameReducer from './sign-in-name-reducer';
import loginVisibleReducer from './login-visible-reducer';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterFoodItemList: foodItemListReducer,
  editing: editingReducer,
  showModal: showModalReducer,
  selectedFoodItem: selectFoodItemReducer,
  loginName: signInNameReducer,
  userId: signInNameReducer,
  loginVisible: loginVisibleReducer,
  firestore: firestoreReducer
});

export default rootReducer;