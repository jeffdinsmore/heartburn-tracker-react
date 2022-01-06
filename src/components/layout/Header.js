import React from "react";
import { Link, withRouter } from 'react-router-dom';
//import { Link } from "react-router-dom";
import styled from 'styled-components';
//import firebase from "firebase/app";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as a from '../../actions';
import PropTypes from "prop-types";
// import { Navbar } from 'react-bootstrap/Navbar'

// const HeartburnHeader = styled.h1`
//   font-size: 32px;
//   // background-color: lightGray;
//   // text-align: center;
//   // margin-top: 20px;
//   padding: 36px 0px 16px 0px;
//   // border-radius: 20px;

// `;

function Header (props) {
  const state = useSelector(state => state);
  const editing = useSelector(state => state.editing);
  const selectedFoodItem = useSelector(state => state.selectedFoodItem);
  function handleClick() {
    const { dispatch } = props;
    console.log("handleClick", props)
    if(editing) {
      dispatch(a.editing())
    }
    if(selectedFoodItem !== null) {
      dispatch(a.unSelectFoodItem())
    }
    
  }
  
  //console.log(props)
  const links = state.loginName.user === "Not signed in" ? <SignedOutLinks state={state} routerClick={handleClick} /> : <SignedInLinks routerClick={handleClick} state={state} {...props} /> 
  return (
    <React.Fragment>
      <Navbar className="nav-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">My Heartburn Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {links}
          {/* <SignedInLinks /> */}
        </Navbar.Collapse>
      </Navbar>
      <br /><br />
    </React.Fragment>
  );
}

Header.propTypes = {
  masterFoodItemList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool,
  selectedFoodItem: PropTypes.object,
  showModal: PropTypes.bool,
  loginName: PropTypes.string
};

const mapStateToProps = state => {
  //console.log("state", state)
  return {
    // masterFoodItemList: state.masterFoodItemList,
    // formVisibleOnPage: state.formVisibleOnPage,
    // editing: state.editing,
    //selectedFoodItem: state.selectedFoodItem,
    // isShowing: state.isShowing,
  }
}
Header = withRouter(connect(mapStateToProps)(Header));

export default Header;