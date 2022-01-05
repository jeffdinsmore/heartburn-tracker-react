import React from 'react';
// import FoodItem from "./FoodItem";
import { useFirestoreConnect } from 'react-redux-firebase';
import PropTypes from "prop-types";
import Nav from 'react-bootstrap/Nav';
import { createBrowserHistory } from 'history';

function Homepage(props) {
  // useFirestoreConnect([
  //   { collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }
  // ]);
  const history = createBrowserHistory();
    
  return (
    <React.Fragment>
      <br />
      <h2><strong>What if heartburn is caused by a specific ingredient or group of ingredients?</strong></h2>
      <blockquote>
        I had heartburn from a chocolate chip cookie made by a specific company, but when I had a chocolate chip cookie made by a different company, I did not get heartburn.<br /><br />
        -- Jeff Dinsmore, Owner
      </blockquote>
      <p>It is our opinion that heartburn may be caused by a specific ingredient or group of ingredients rather than a type of food a person eats.</p>
      {/* <h3><strong>Reducing heartburn starts with what you eat and what drink!</strong></h3>
      <br /> */}
      <br />
      <h3>How do people have heartburn?</h3>
      <p>Heartburn occurs when the lower esophageal sphincter relaxes and allows stomach fluids (stomach acid and food) back up into the esophagus.</p>
      <br />
      <h3>What triggers heartburn?</h3>
      <p>Many doctors believe there are several foods that are listed to be risk factors in causing heartburn.</p>
      <p>Some of these include:</p>
      <ul>
        <li className="list">Spicy foods</li>
        <li className="list">Citrus foods</li>
        <li className="list">Onions</li>
        <li className="list">Tomatoes and tomato products</li>
        <li className="list">Fried foods</li>
        <li className="list">Alcohol</li>
        <li className="list">Coffee and some teas</li>
        <li className="list">Peppermint</li>
      </ul>
      <br />

      {/* <Nav.Link href="/foodlist" to="/foodlist">Go To Your Food List</Nav.Link> */}
    </React.Fragment>
  );

}

Homepage.propTypes = {
  onFoodItemSelection: PropTypes.func
};

export default Homepage;