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

  async function getUserData() {
    const user = firebase.auth().currentUser;

  }

  useEffect(() => {
    (async () => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          const { dispatch } = props;
          if (user) {
            // dispatch(a.signInName(user.email));
            // dispatch(a.userId(user.uid));
            console.log(user)
            window.localStorage.setItem('uid', user.uid);
            window.localStorage.setItem('creationTime', user.metadata.creationTime)
            window.localStorage.setItem('lastSignInTime', user.metadata.lastSignInTime)
            // window.localStorage.setItem('')
          }
        })
      } catch (error) {
        alert(error);
      }
      console.log("Home component did mount")
    })();
  }, [])

  const user = firebase.auth().currentUser;
  //console.log('userAccount', user);
  const history = useHistory();
  const state = useSelector(state => state)
  console.log('detail', state, props)
  const { lastName, firstName, lastSignInTime, creationTime,userState, city, email, uid } = props;


  const handleEditClick = (foodItem) => {
    console.log("handleEditClick reached!");
    const { dispatch } = props;
    console.log("handleEdit", state, props, foodItem)
    const action = a.editing();
    dispatch(action);

    history.push('/edit/foodItem')
  }


  function convertDate(seconds, nanoseconds) {
    let d = new Date(seconds / 1000000 + nanoseconds * 1000);
    let month = d.toDateString().substring(7, 3);
    let day = d.toDateString().substring(10, 8);
    let year = d.toDateString().substring(15, 11);
    return month + "-" + day + "-" + year;
  }
  console.log("Detail component did mount");
  return (
    <React.Fragment>

      <h2>Your Account Details</h2>
      <br></br>
      <div className="detail">
        <p><strong>Name:</strong> {firstName && lastName ? firstName + " " + lastName : "loading"}</p>
        <p><strong>Email:</strong> {email ? email : "loading"}</p>
        <p><strong>City/State:</strong> {city && userState ? city + ', ' + userState : "loading"}</p>
        
        <p><strong>Last Sign in:</strong> <em>{lastSignInTime ? lastSignInTime : "loading"}</em></p>
        <br></br>
        <p><strong>Length of membership:</strong> {creationTime ? creationTime : 'loading'}</p>
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
  foodItem: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingModal: PropTypes.func,
  onClickingCancel: PropTypes.func,
  userId: PropTypes.string,
  firestore2: PropTypes.object,
  //loginName: PropTypes.string,
  selectedFoodItem: PropTypes.object,
  editing: PropTypes.bool,
  foodItems: PropTypes.array,
  masterFoodList: PropTypes.object,
  showModal: PropTypes.bool,
};

const mapStateToProps = state => ({
  userId: window.localStorage.getItem('uid'),
  firestore2: state.firestore,
  email: window.localStorage.getItem('email'),
  selectedFoodItem: state.selectedFoodItem,
  editing: state.editing,
  foodItems: state.firestore.ordered.foodItems,
  masterFoodList: state.masterFoodItemList,
  foodItem: state.selectedFoodItem,
  showModal: state.showModal,
  firstName: window.localStorage.getItem('firstName'),
  lastName: window.localStorage.getItem('lastName'),
  city: window.localStorage.getItem('city'),
  userState: window.localStorage.getItem('userState'),
  creationTime: localStorage.getItem('creationTime'),
  lastSignInTime: localStorage.getItem('lastSignInTime'),
});

//UserAccountInfo = connect(mapStateToProps)(UserAccountInfo);

export default withFirestore(connect(mapStateToProps)(UserAccountInfo));
