import React from 'react';
import Header from './Header';
import FoodItemControl from './FoodItemControl';
// import FoodItemList from './FoodItemList';
import Homepage from './Homepage';
import YourStats from './YourStats';
import Footer from './Footer';
import Signin from "./Signin";
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';

const BodyStyling = styled.div`
  // background-color: lightGray;
  // text-align: center;
  padding: 6px 0px 16px 0px;
  padding-left: 10%;
  padding-right: 10%;
  // border-radius: 20px;
`;

function App() {
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
            <YourStats />
          </BodyStyling>
        </Route>
        <Route path="/foodlist">
          <BodyStyling>
            <FoodItemControl />
          </BodyStyling>
        </Route>
        <Route path="/">
          <BodyStyling>
            <Homepage />
          </BodyStyling>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
