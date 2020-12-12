import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
// import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// import { createFirestoreInstance } from 'redux-firestore';
// import firebase from "./firebase";
// import { firestoreReducer } from 'redux-firestore';

// const rootReducer = combineReducers({
//   formVisibleOnPage: formVisibleReducer,
//   masterFoodList: foodListReducer,
//   firestore: firestoreReducer
// });

// const rrfProps = {
//   firebase,
//   config: {
//         userProfile: "users"
//     },
//   dispatch: store.dispatch,
//   createFirestoreInstance
// }
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <Provider store={store}>
//     <ReactReduxFirebaseProvider {...rrfProps}>
//       <App />
//     </ReactReduxFirebaseProvider>
//   </Provider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
