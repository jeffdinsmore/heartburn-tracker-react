import React, { useEffect, useState } from 'react';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import * as a from './../actions';

function Footer(props) {
  const auth = props.firebase.auth();
  const email = !window.localStorage.getItem('email') ? 'Not signed in' : window.localStorage.getItem('email');
  const currentUser = useSelector(state => state.loginName.user)
  const { data } = props;

  useEffect(() => {
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
    }
    console.log("component updated!", currentUser);
  }, [])
  return (
    <React.Fragment>
      <div id="footer">
        <ul id="footerUl">
          <li id="footerLi">{email}</li>
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