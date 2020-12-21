import React from 'react';
import Header from './Header';
import FoodItemControl from './FoodItemControl';
import FoodItemList from './FoodItemList';
import Homepage from './Homepage';
import Footer from './Footer';
import Signin from "./Signin";
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
        <Route path="/signin">
          <BodyStyling>
            <Signin />
          </BodyStyling>
        </Route>
        <Route path="/fooditemlist">
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
