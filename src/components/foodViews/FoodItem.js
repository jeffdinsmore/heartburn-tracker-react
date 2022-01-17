import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function FoodItem(props) {


  function strong(heartburn) {
    if (heartburn === "Yes") {
      return <strong><em>{heartburn}</em></strong>;
    } else {
      return heartburn;
    }
  }
  return (
    <React.Fragment>
      <tr>
        <td key={props.id}>{props.foodName}</td>
        <td>{props.ingredients}</td>
        <td>{strong(props.heartburn)}</td>
        <td>{props.timeOpen}</td>
        <td><Link className="btn btn-xs btn-info"  onClick={() => props.whenFoodItemClicked(props.id)} to='/foodItem'>Details</Link></td>
      </tr>
    </React.Fragment>
  );
}

FoodItem.propTypes = {
  foodName: PropTypes.string,
  brand: PropTypes.string,
  ingredients: PropTypes.string,
  heartburn: PropTypes.string,
  timeOpen: PropTypes.string,
  id: PropTypes.string,
  whenFoodItemClicked: PropTypes.func,
  isShowing: PropTypes.bool
};

export default FoodItem;