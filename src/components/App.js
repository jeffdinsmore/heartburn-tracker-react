import React from 'react';
import Header from './Header';
import FoodItemControl from './FoodItemControl';
import Homepage from './Homepage';
import YourStats from './YourStats';
import Footer from './Footer';
import Signin from "./Signin";
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import ButtonCount from './ButtonCount';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import Routes from "./Routes";

const BodyStyling = styled.div`
  // background-color: lightGray;
  // text-align: center;
  padding: 6px 0px 16px 0px;
  padding-left: 10%;
  padding-right: 10%;
  // border-radius: 20px;
`;

function App(props) {
  const auth = props.firebase.auth();
  if ((isLoaded(auth)) && (auth.currentUser != null)) {
  }
  const state = useSelector(state => state);
  console.log("props", props, state)
  return (
    <Router>

      <Header />
      <Switch>
        <Route path="/login">
          <BodyStyling>
            <Signin />
          </BodyStyling>
        </Route>
        <Route path="/signup">
          <BodyStyling>
            <Signup />
          </BodyStyling>
        </Route>
        <Route path="/yourstats">
          <BodyStyling>
            <FoodItemControl />
          </BodyStyling>
        </Route>
        <Route path="/foodlist">
          <BodyStyling>
            <FoodItemControl />
          </BodyStyling>
        </Route>
        <Route path="/buttoncount">
          <BodyStyling>
            <ButtonCount />
          </BodyStyling>
        </Route>
        <Route path="/">
          <BodyStyling>
            <FoodItemControl />
          </BodyStyling>
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default withFirestore(App);
