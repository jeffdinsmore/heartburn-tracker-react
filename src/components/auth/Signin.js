import React from "react";
import firebase from "firebase";
import { useHistory } from "react-router";
import PropTypes from 'prop-types';
import { withFirestore } from 'react-redux-firebase';

function Signin(props) {

  const createAccount = () => {
    history.push('/signup');
  }
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
  // const googleProvider = new firebase.auth.GoogleAuthProvider();
  //const auth = getAuth();


  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      console.log("Successfully signed in!", user.user);
      window.localStorage.setItem('uId', user.user.uid)
      window.localStorage.setItem('email', user.user.email)
      window.localStorage.setItem('name', user.user.name)
      setTimeout(() => {
        history.push("/");
      }, 800);
    }).catch((error) => {
      alert(error.message);
      console.log(error)
    });
    console.log("ddddddddddddd")
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
      <p>Don't have an account?</p>
      <button className="btn btn-info btn-sm" onClick={() => createAccount()}>Sign up</button>
      {/* <button className="btn btn-info btn-sm" onClick={doSignOut}>Logout</button> */}
    </React.Fragment>
  );
}

Signin.propTypes = {
  onSigningIn: PropTypes.func,
  doSignOut: PropTypes.func,
  masterFoodItemList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool,
  selectedFoodItem: PropTypes.object,
  showModal: PropTypes.bool,
  loginName: PropTypes.string
};

export default withFirestore(Signin);