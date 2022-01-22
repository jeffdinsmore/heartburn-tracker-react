import React, { useEffect } from 'react';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';


function Footer(props) {
  const auth = props.firebase.auth();
  const email = !window.localStorage.getItem('email') ? 'Not signed in' : window.localStorage.getItem('email');
  const currentUser = useSelector(state => state.loginName.user);

  useEffect(() => {
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
    }
    console.log("component updated!", currentUser);
  }, []);

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