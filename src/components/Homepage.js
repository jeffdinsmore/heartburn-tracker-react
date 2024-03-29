import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import * as a from '../actions';
import firebase from 'firebase';
import { withFirestore, useFirestoreConnect, useFirestore } from 'react-redux-firebase';

function Homepage(props) {
  const { loginName, firestore } = props;
  // const user = firebase.auth().currentUser;
  // console.log('userAccount', user, user.metadata.creationTime, user.metadata.lastSignInTime);

  useFirestoreConnect([
    { collection: 'users', doc: window.localStorage.getItem('uid') }
  ]);

  useEffect(() => {
    (async () => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          const { dispatch } = props;
          if (user) {
            dispatch(a.signInName(user.email));
            dispatch(a.userId(user.uid));
            console.log("user", user)
          }
        })
      } catch (error) {
        alert(error);
      }
      console.log("Home component did mount")
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if(firestore.ordered.users) {
        const lastName = await firestore.ordered.users[0].lastName;
        const firstName = await firestore.ordered.users[0].firstName;
        const city = await firestore.ordered.users[0].city;
        const userState = await firestore.ordered.users[0].userState;
        window.localStorage.setItem('lastName', lastName);
        window.localStorage.setItem('firstName', firstName);
        window.localStorage.setItem('city', city);
        window.localStorage.setItem('userState', userState);
      }
    })();
  }, [firestore.ordered.users]);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       props.firestore.get({ collection: 'users', doc: window.localStorage.getItem('uid') }).then((user) => {
  //         console.log('made it here', user)
  //         const userInfo = {
  //           city: user.get('city'),
  //           email: user.get('email'),
  //           firstName: user.get('firstName'),
  //           lastName: user.get('lastName'),
  //           userState: user.get('userState'),
  //         };
  //         console.log("user", userInfo)
  //         window.localStorage.setItem('lastName', userInfo.lastName);
  //         window.localStorage.setItem('firstName', userInfo.firstName);
  //         window.localStorage.setItem('city', userInfo.city);
  //         window.localStorage.setItem('userState', userInfo.userState);
  //       }).catch((error) => {
  //         alert(error.message);
  //         console.log(error)
  //       })
  //     } catch (error) {
  //       alert(error)
  //     }
  //   })();
  //   }, [])


    // useEffect(() => {
    //   if(!window.localStorage.getItem('uid') || window.localStorage.getItem('uid') === null) {
    //     window.localStorage.setItem('uid', userId);
    //   } else if(userId === null) {
    //     window.localStorage.setItem('uid', userId);
    //   }


    // }, [userId]);

    // useEffect(() => {
    //   if(!window.localStorage.getItem('email') || window.localStorage.getItem('email') === 'Not signed in') {
    //     window.localStorage.setItem('email', loginName);
    //   }

    // }, [loginName]);

    console.log("home", props)
    return (
      <React.Fragment>
        <br />
        <h2><strong>What if heartburn is caused by a specific ingredient or group of ingredients?</strong></h2>
        <blockquote>
          I had heartburn from a chocolate chip cookie made by a specific company, but when I had a chocolate chip cookie made by a different company, I did not get heartburn.<br /><br />
          -- Jeff Dinsmore, Owner
        </blockquote>
        <p>It is our opinion that heartburn may be caused by a specific ingredient or group of ingredients rather than a type of food a person eats.</p>
        {/* <h3><strong>Reducing heartburn starts with what you eat and what drink!</strong></h3>
      <br /> */}
        <br />
        <h3>How do people have heartburn?</h3>
        <p>Heartburn occurs when the lower esophageal sphincter relaxes and allows stomach fluids (stomach acid and food) back up into the esophagus.</p>
        <br />
        <h3>What triggers heartburn?</h3>
        <p>Many doctors believe there are several foods that are listed to be risk factors in causing heartburn.</p>
        <p>Some of these include:</p>
        <ul>
          <li className="list">Spicy foods</li>
          <li className="list">Citrus foods</li>
          <li className="list">Onions</li>
          <li className="list">Tomatoes and tomato products</li>
          <li className="list">Fried foods</li>
          <li className="list">Alcohol</li>
          <li className="list">Coffee and some teas</li>
          <li className="list">Peppermint</li>
        </ul>
        <br />

        <Link className='btn btn-info btn-sm' style={{ display: loginName !== "Not signed in" ? 'inline-block' : "none" }} to='/foodlist'>
          See Food List
        </Link>
      </React.Fragment>
    );
  }

Homepage.propTypes = {
      userId: PropTypes.string,
      firestore: PropTypes.object,
      loginName: PropTypes.string,
      selectedFoodItem: PropTypes.object,
      editing: PropTypes.bool
    };

  const mapStateToProps = (state) => ({
    userId: state.userId.userId,
    firestore: state.firestore,
    loginName: state.loginName.user,
    selectedFoodItem: state.selectedFoodItem,
    editing: state.editing,
    firestore2: state.firestore,
  });

  Homepage = connect(mapStateToProps)(Homepage);

  export default withFirestore(Homepage);