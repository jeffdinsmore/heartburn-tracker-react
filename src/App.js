import React from 'react';
import Header from './components/nav/Header';
import Footer from './components/Footer';
import Signin from "./components/auth/Signin";
import Signup from './components/auth/Signup';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import styled from 'styled-components';
import ButtonCount from './components/ButtonCount';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import FoodItemList from './components/FoodItemList';
import Homepage from './components/Homepage';
import NewFoodItemForm from './components/NewFoodItemForm';
import FoodItemDetail from './components/FoodItemDetail';
import EditFoodItemForm from './components/EditFoodItemForm';
import YourStats from './components/YourStats';
import EditUserForm from './components/EditUserForm';
import UserAccountInfo from './components/UserAccountInfo';

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
  //console.log("props", props, state)
  return (
      <Router>

        <Header />
        <Switch>
        <Route path="/account-info">
            <BodyStyling>
              <UserAccountInfo />
            </BodyStyling>
          </Route>
        <Route path="/edit-your-account">
            <BodyStyling>
              <EditUserForm />
            </BodyStyling>
          </Route>
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
              <YourStats />
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
              <EditFoodItemForm />
            </BodyStyling>
          </Route>
          <Route path="/foodItem">
            <BodyStyling>
              <FoodItemDetail />
            </BodyStyling>
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
        
      </Router>
  );
}

export default withFirestore(App);
