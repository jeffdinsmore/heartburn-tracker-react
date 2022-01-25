import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from './Modal';
import { useSelector } from "react-redux";
import * as a from '../actions';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { withFirestore } from 'react-redux-firebase';
import firebase from 'firebase';

function UserAccountInfo(props) {

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       firebase.auth().onAuthStateChanged((user) => {
  //         const { dispatch } = props;
  //         if (user) {
  //           // dispatch(a.signInName(user.email));
  //           // dispatch(a.userId(user.uid));
  //           console.log(user)
  //           window.localStorage.setItem('uid', user.uid);
  //           window.localStorage.setItem('creationTime', user.metadata.creationTime)
  //           window.localStorage.setItem('lastSignInTime', user.metadata.lastSignInTime)
  //           // window.localStorage.setItem('')
  //         }
  //       })
  //     } catch (error) {
  //       alert(error);
  //     }
  //     console.log("Home component did mount")
  //   })();
  // }, [])

  //console.log('userAccount', user);
  const history = useHistory();
  const state = useSelector(state => state)
  console.log('detail', state, props)
  const { lastName, firstName, lastSignInTime, creationTime,userState, city, email, uid } = props;

  const convertDate = (date) => {
    console.log(new Date(date))
    date = new Date(date);
    let today = new Date();
    let time = today - date;
    let month = date.toDateString().substring(7, 4);
    let day = date.toDateString().substring(10, 8);
    let year = date.toDateString().substring(15, 11);
    //let n = date.toDateString().substring(15, 3);
    return month + "-" + day + "-" + year;
    //return time;
  }

  const handleEditClick = () => {
    console.log("handleEditClick reached!");
    // const { dispatch } = props;
    // console.log("handleEdit", state, props, foodItem)
    // const action = a.editing();
    // dispatch(action);

    history.push('/edit-your-account')
  }

  //console.log("Detail component did mount");
  return (
    <React.Fragment>

      <h2>Your Account Details</h2>
      <br></br>
      <div className="detail">
        <p><strong>Name:</strong> {firstName && lastName ? firstName + " " + lastName : "loading"}</p>

        <p><strong>Email:</strong> {email ? email : "loading"}</p>

        <p><strong>City/State:</strong> {city && userState ? city + ', ' + userState : "loading"}</p>
        
        <p><strong>Last Sign in:</strong> {lastSignInTime ? convertDate(lastSignInTime) : "loading"}</p>

        <p><strong>Account Created:</strong> {creationTime ? convertDate(creationTime) : 'loading'}</p>
        <br></br>
        <Link className="btn btn-success btn-sm" onClick={() => handleEditClick(uid)} to="/edit-your-account">Update Account</Link>&nbsp;&nbsp;
      </div>
      <hr />
      <Link as={Link} className='btn btn-info btn-sm' to='/foodlist'>
        See Food List
      </Link>
    </React.Fragment>
  );
}

UserAccountInfo.propTypes = {
  userId: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  userState: PropTypes.string,
  creationTime: PropTypes.string,
  lastSignInTime: PropTypes.string,
};

const mapStateToProps = state => ({
  userId: window.localStorage.getItem('uid'),
  email: window.localStorage.getItem('email'),
  firstName: window.localStorage.getItem('firstName'),
  lastName: window.localStorage.getItem('lastName'),
  city: window.localStorage.getItem('city'),
  userState: window.localStorage.getItem('userState'),
  creationTime: localStorage.getItem('creationTime'),
  lastSignInTime: localStorage.getItem('lastSignInTime'),
});

//UserAccountInfo = connect(mapStateToProps)(UserAccountInfo);

export default withFirestore(connect(mapStateToProps)(UserAccountInfo));
