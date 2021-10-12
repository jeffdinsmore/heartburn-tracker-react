import React from 'react';
import Header from './Header';
import FoodItemControl from './FoodItemControl';
// import FoodItemList from './FoodItemList';
import Homepage from './Homepage';
import YourStats from './yourStats/YourStats';
import Footer from './Footer';
import Signin from "./Signin";
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import ButtonCount from './ButtonCount';
import Modal from './Modal';
import useModal from './useModal';


const BodyStyling = styled.div`
  // background-color: lightGray;
  // text-align: center;
  padding: 6px 0px 16px 0px;
  padding-left: 10%;
  padding-right: 10%;
  // border-radius: 20px;
`;
  const onClose = null;
function App() {
  //const {isShowing, toggle} = useModal()
  return (
    <Router>
      
      <Header />
      {/* <div className="modal">
      <div className="modal-conent">
        <div className="modal-header">
          <h4 className="modal-title">Modal title</h4>
        </div>
        <div className="modal-body">
          This is modal content
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="button">close</button>
        </div>
      </div>
    </div> */}
    {/* <div className="App">
      <button className="button-default" onClick={toggle}>Show Modal</button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
    </div> */}
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
        <Route path="/buttoncount">
          <BodyStyling>
            <ButtonCount />
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
