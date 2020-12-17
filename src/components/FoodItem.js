import React from "react";
import PropTypes from "prop-types";

function FoodItem(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenFoodItemClicked(props.id)}>
        <h3>{props.names} - {props.location}</h3>
        <p><em>{props.issue}</em></p>
        <hr />
      </div>
    </React.Fragment>
  );
}

FoodItem.propTypes = {
  foodName: PropTypes.string,
  ingredients: PropTypes.string,
  heartburn: PropTypes.string,
  id: PropTypes.string,
  whenFoodItemClicked: PropTypes.func
};

export default FoodItem;