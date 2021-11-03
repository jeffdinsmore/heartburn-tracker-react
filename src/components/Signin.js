import React, { useEffect } from "react";
import firebase, { auth, signInWithEmailAndPassword, signInWithGoogle, GoogleAuthProvider } from "firebase";
import { Redirect, Route, useHistory } from "react-router";
import PropTypes from 'prop-types';
import * as a from './../actions';
import { useSelector } from 'react-redux';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';


function Signin(props) {
  useFirestoreConnect([
    { collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }
  ]);
  const loginName = useSelector(state => state.loginName)
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     const { dispatch } = props;
  //     //const action = a.signInName();
      
  //     if(user) {
  //       console.log("fdfd", user.email)
  //       // if (loginName === "Signed out" || loginName === "Not signed in") {
  //         dispatch(a.signInName(user.email));
  //         console.log("s", state)
  //       }
  //     // } else {
  
  //     //}
  //   })
  // }, [])

  const history = useHistory();
  //const loginName = useSelector(state => state.loginName.user)
  const state = useSelector(state => state);
  // const googleProvider = new firebase.auth.GoogleAuthProvider();
  //const auth = getAuth();
  console.log("pppf", props, state)
  const handleClickSignin = () => {
    //const { dispatch } = props;
    //const action = a.signInName;
    // if (loginName === "Signed out" || loginName === "Not signed in") {
      //dispatch(action);
      console.log("s", state)
    //}
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      console.log("Successfully signed in!");
      //handleClickSignin()
      setTimeout(() => {
        history.push("/");
      }, 800);
      
      //const user = userCredential.user;
    }).catch((error) => {
      alert(error.message);
      console.log(error)
    });
  }


  // const signInWithGoogle = async () => {
  //   try {
  //     const res = await firebase.auth.signInWithPopup(googleProvider);
  //     const user = res.user;
  //     const query = await firebase.firestore()
  //       .collection("users")
  //       .where("uid", "==", user.uid)
  //       .get();
  //     if (query.docs.length === 0) {
  //       await firebase.firestore().collection("users").add({
  //         uid: user.uid,
  //         name: user.displayName,
  //         authProvider: "google",
  //         email: user.email,
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };

  function doSignOut() {
    firebase.auth().signOut().then(function () {
      alert("Successfully signed out!");
      console.log("Joey");
      return (<Redirect to="/" />);
    }).catch(function (error) {
      alert(error.message);
    });
  }

  return (
    <React.Fragment>
      <h2>Login</h2>
      <br />
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />&nbsp;&nbsp;&nbsp;
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />&nbsp;&nbsp;&nbsp;
        <button className="btn btn-sm btn-success" type='submit'>Login</button>
      </form>
      <br></br>
      <p>Already signed in? Logout here:</p>

      <button className="btn btn-info btn-sm" onClick={doSignOut}>Logout</button>
    </React.Fragment>
  );
}

Signin.propTypes = {
  onSigningIn: PropTypes.func,
  masterFoodItemList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool,
  selectedFoodItem: PropTypes.object,
  showModal: PropTypes.bool,
  loginName: PropTypes.string
};

export default withFirestore(Signin);