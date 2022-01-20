import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function SignedOutLinks() {
  return (
    <React.Fragment>
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
        <Nav.Link to="/" className='btn btn-warning p-1 rounded-circle btn-sm'>
          Not Signed In
        </Nav.Link>
      </Nav>
    </React.Fragment>
  );
}

export default SignedOutLinks;