import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const HelpQueueHeader = styled.h1`
  font-size: 32px;
  background-color: lightGray;
  text-align: center;
  padding: 6px 0px 16px 0px;
  border-radius: 20px;
`;

function Header() {
  return (
    <React.Fragment>
      <HelpQueueHeader>
        <h1> Heartburn Tracker</h1>
      </HelpQueueHeader>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;