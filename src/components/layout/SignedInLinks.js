import React from 'react';
//import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const SignedInLinks = () => {
  return (
    <React.Fragment>

      <Nav className="mr-auto">
        <Nav.Link href="/foodlist" to="/fooditemcontrol">Food List</Nav.Link>
        <Nav.Link href="/add-food-item" to="/fooditemcontrol">Add Food</Nav.Link>
        <Nav.Link href="/yourstats" to="/fooditemcontrol">Your Stats</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link to="/">Logout</Nav.Link>
        <Nav.Link to="/" className='btn btn-warning p-1 rounded-circle btn-sm'>
          JJ
        </Nav.Link>
      </Nav>
    </React.Fragment>
  );
}

export default SignedInLinks;