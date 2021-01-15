import React from "react";
import PropTypes from "prop-types";

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
        <td>{props.foodName}</td>
        <td>{props.ingredients}</td>
        <td>{strong(props.heartburn)}</td>
        <td>{props.timeOpen}</td>
        <td><button className="btn btn-xs btn-info" onClick={() => props.whenFoodItemClicked(props.id)}>Details</button></td></tr>
      {/* <hr /> */}
    </React.Fragment>
  );
}

FoodItem.propTypes = {
  foodName: PropTypes.string,
  brand: PropTypes.string,
  ingredients: PropTypes.string,
  heartburn: PropTypes.string,
  timeOpen: PropTypes.object,
  id: PropTypes.string,
  whenFoodItemClicked: PropTypes.func
};

export default FoodItem;