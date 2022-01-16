import React from 'react';
import Header from './components/layout/Header';
import FoodItemControl from './components/FoodItemControl';
import Footer from './components/Footer';
import Signin from "./components/auth/Signin";
import Signup from './components/auth/Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import ButtonCount from './components/ButtonCount';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import Routes from "./components/Routes";
import { HashRouter } from 'react-router-dom';
import FoodItemList from './components/foodViews/FoodItemList';
import Homepage from './components/Homepage';
import NewFoodItemForm from './components/foodViews/NewFoodItemForm';

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
  //console.log("props", props, state)
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
          <Route path="/add-food-item">
            <BodyStyling>
              <NewFoodItemForm />
            </BodyStyling>
          </Route>
          {/* <Route path="/foodlist" component={FoodItemList}> */}
          <Route path="/foodlist">
            <BodyStyling>
              <FoodItemList />
            </BodyStyling>
          </Route>
          <Route path="/buttoncount">
            <BodyStyling>
              <ButtonCount />
            </BodyStyling>
          </Route>
          <Route exact path="/">
            <BodyStyling>
              <Homepage />
            </BodyStyling>
          </Route>
          <Route path="/edit/foodItem">
            <BodyStyling>
              <FoodItemControl />
            </BodyStyling>
          </Route>
          <Route path="/foodItem">
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
