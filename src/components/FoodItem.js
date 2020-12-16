import React from "react";
import PropTypes from "prop-types";

function FoodItem(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenFoodItemClicked(props.id)}>
        <h3>{props.name} - {props.ingredients}</h3>
        <p><em>{props.heartburn}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

FoodItem.propTypes = {
  name: PropTypes.string,
  ingredients: PropTypes.string,
  heartburn: PropTypes.bool,
  id: PropTypes.string,
  whenFoodItemClicked: PropTypes.func
};

export default FoodItem;