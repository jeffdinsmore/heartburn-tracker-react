import React from "react";
import PropTypes from "prop-types";

function FoodItem(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenFoodItemClicked(props.id)}>
        <p><strong>Food:</strong> {props.foodName}</p>
        <p><strong>Indgredients:</strong> {props.ingredients}</p>
        <p><em><strong>Heartburn:</strong> {props.heartburn}</em></p>
        <hr />
      </div>
    </React.Fragment>
  );
}

FoodItem.propTypes = {
  foodName: PropTypes.string,
  ingredients: PropTypes.string,
  heartburn: PropTypes.bool,
  id: PropTypes.string,
  whenFoodItemClicked: PropTypes.func
};

export default FoodItem;