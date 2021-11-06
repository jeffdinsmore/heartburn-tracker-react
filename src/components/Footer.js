import React, { useEffect, useState } from 'react';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import * as a from './../actions';

function Footer(props) {
  const auth = props.firebase.auth();
  const state = useSelector(state => state);
  //const { dispatch } = props;
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

  const currentUser = useSelector(state => state.loginName.user)
  const { data } = props;
  console.log("footer", state, props)
  //const [ currentUser, setCurrentUser ] = useState("Not signed in")
  useEffect(() => {
  if ((isLoaded(auth)) && (auth.currentUser != null)) {
    //setCurrentUser("Signed in as:" + auth.currentUser.email);
    console.log("user", currentUser)
  }
    //setCurrentUser("Signed in as:");
    console.log("component updated!", currentUser);
  }, [])
  return (
    <React.Fragment>
      <div id="footer">
        <ul id="footerUl">
          <li id="footerLi">{currentUser}</li>
          <li id="footerLi">Created by: Jeff Dinsmore</li>
        </ul>
      </div>

    </React.Fragment>
  );
}

Footer.propTypes = {
  data: PropTypes.object,
};

export default withFirestore(Footer);