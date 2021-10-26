import formVisibleReducer from './form-visible-reducer';
import foodItemListReducer from './foodItem-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import editingReducer from './editing-reducer';
import showModalReducer from './show-modal-reducer';
import selectFoodItemReducer from './select-foodItem-reducer';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterFoodItemList: foodItemListReducer,
  editing: editingReducer,
  showModal: showModalReducer,
  selectedFoodItem: selectFoodItemReducer,
  firestore: firestoreReducer
});

export default rootReducer;