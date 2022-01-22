import React from "react";
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as a from '../../actions';
import PropTypes from "prop-types";

// const HeartburnHeader = styled.h1`
//   font-size: 32px;
//   // background-color: lightGray;
//   // text-align: center;
//   // margin-top: 20px;
//   padding: 36px 0px 16px 0px;
//   // border-radius: 20px;
// `;

function Header(props) {
  const { loginName, editing, selectedFoodItem, dispatch } = props;

  const state = useSelector(state => state);
  //const editing = useSelector(state => state.editing);
  //const selectedFoodItem = useSelector(state => state.selectedFoodItem);

  function handleClick() {
    //const { dispatch } = props;
    console.log("handleClick", props)
    if (editing) {
      dispatch(a.editing())
    }
    if (selectedFoodItem !== null) {
      dispatch(a.unSelectFoodItem())
    }

  }
  console.log('head', state, props, loginName)
  const links = loginName === "Not signed in" ? <SignedOutLinks state={state} routerClick={handleClick} {...props} /> : <SignedInLinks routerClick={handleClick} state={state} {...props} />
  return (
    <React.Fragment>
      <Navbar className="nav-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">My Heartburn Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {links}
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
  loginName: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    masterFoodItemList: state.masterFoodItemList,
    editing: state.editing,
    selectedFoodItem: state.selectedFoodItem,
    showModal: state.showModal,
    loginName2: state.loginName.user,
    loginName: !window.localStorage.getItem('email') ? 'Not signed in' : window.localStorage.getItem('email'),
    userId: window.localStorage.getItem('uId'),
  }
}

export default withRouter(connect(mapStateToProps)(Header));