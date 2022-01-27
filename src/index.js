import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from "./firebase";
import 'firebase/auth';
import firebaseConfig from './firebase';
import thunk from 'redux-thunk';

// let firebase = require('firebase');
// let firebaseui = require('firebaseui');

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// compose(
//   applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//   reduxFirestore(firebaseConfig),
//   reactReduxFirebase(firebaseConfig)
// )
);

store.subscribe(() =>
  //console.log("store: ", store.getState())
  store.getState()
);

const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}


ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
