import React from 'react';
//import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <Nav.Link href="/signup" to="/signup">Sign up</Nav.Link>
        <Nav.Link href="/login" to="/signin">Login</Nav.Link>
        <Nav.Link to="/" className='btn btn-warning p-1 rounded-circle btn-sm'>
          JJ
        </Nav.Link>
      </Nav>
    </React.Fragment>
  );
}

export default SignedOutLinks;