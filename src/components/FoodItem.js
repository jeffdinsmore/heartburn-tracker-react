import React from "react";
import PropTypes from "prop-types";

function FoodItem(props) {
  return (
    <React.Fragment>
      <tr>
      <td>{props.foodName}</td>
      <td>{props.ingredients}</td>
      <td><em>{props.heartburn}</em></td>
      <td><button className="btn btn-sm btn-info" onClick={() => props.whenFoodItemClicked(props.id)}>Details</button></td></tr>
      {/* <hr /> */}
    </React.Fragment>
  );
}

FoodItem.propTypes = {
  foodName: PropTypes.string,
  brand: PropTypes.string,
  ingredients: PropTypes.string,
  heartburn: PropTypes.string,
  id: PropTypes.string,
  whenFoodItemClicked: PropTypes.func
};

export default FoodItem;