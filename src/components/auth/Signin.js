import React from "react";
import firebase from "firebase";
import { useHistory } from "react-router";
import PropTypes from 'prop-types';
import { withFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

function Signin(props) {
  const { firestore } = props;
  // useFirestoreConnect([
  //   { collection: 'users' }
  // ]);
  console.log(props)
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
    let userId;
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
      console.log("Successfully signed in!",data.user);
      window.localStorage.setItem('uid', data.user.uid);
      window.localStorage.setItem('email', data.user.email);
      window.localStorage.setItem('firstName', data.user.firstName);
      window.localStorage.setItem('lastName', data.user.lastName);
      window.localStorage.setItem('city', data.user.city);
      window.localStorage.setItem('userState', data.user.userState);
      window.localStorage.setItem('creationTime', data.user.metadata.creationTime);
      window.localStorage.setItem('lastSignInTime', data.user.metadata.lastSignInTime);

      userId = window.localStorage.getItem('uid')
      // setTimeout(() => {
      //   history.push("/");
      // }, 800);
    }).catch((error) => {
      alert(error.message);
      console.log(error)
    });

    // props.firestore.get({ collection: 'users', doc: userId }).then((user) => {
    //   console.log('made it here', user)
    //   const userInfo = {
    //     city: user.get('city'),
    //     email: user.get('email'),
    //     firstName: user.get('firstName'),
    //     lastName: user.get('lastName'),
    //     userState: user.get('userState'),
    //   };
    //   console.log("user", userInfo)
    //   window.localStorage.setItem('lastName', userInfo.lastName);
    //   window.localStorage.setItem('firstName', userInfo.firstName);
    //   window.localStorage.setItem('city', userInfo.city);
    //   window.localStorage.setItem('userState', userInfo.userState);
    // }).catch((error) => {
    //   alert(error.message);
    //   console.log(error)
      //     const firestoreFoodItem = {
      //       foodName: foodItem.get("foodName"),
      //       brand: foodItem.get("brand"),
      //       ingredients: foodItem.get("ingredients"),
      //       heartburn: foodItem.get("heartburn"),
      //       timeOpen: foodItem.get("timeOpen"),
      //       id: foodItem.id
      //     }
      //     const path = '/foodItem/' + firestoreFoodItem.id;
      //     dispatch(a.selectFoodItem(firestoreFoodItem))
      //     dispatch(a.history(path))
      //     console.log('aaaaaaaaaa', firestoreFoodItem)
      //     console.log("updatedddddddddddddddd", props)
      //   });
      //});
    
    setTimeout(() => {
      history.push("/");
    }, 800);
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

const mapStateToProps = (state) => {
  return {
    masterFoodItemList: state.masterFoodItemList,
    editing: state.editing,
    selectedFoodItem: state.selectedFoodItem,
    showModal: state.showModal,
    firestore2: state.firestore,
    loginName: !window.localStorage.getItem('email') ? 'Not signed in' : window.localStorage.getItem('email'),
    userId: window.localStorage.getItem('uid'),
  }
}

Signin = connect(mapStateToProps)(Signin);

export default withFirestore(Signin);