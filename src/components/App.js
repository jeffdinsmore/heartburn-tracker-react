import React from 'react';
import Header from './Header';
import FoodItemControl from './FoodItemControl';
import Footer from './Footer';
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';

const BodyStyling = styled.p`
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

export default App;
