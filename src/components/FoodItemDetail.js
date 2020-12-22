import React from "react";
import PropTypes from "prop-types";

function FoodItemDetail(props) {
  const { foodItem, onClickingDelete } = props;
  return (
    <React.Fragment>
      <h1>Food Item Detail</h1>
      <h4>{foodItem.foodName} - {foodItem.brand}</h4>
      <p>Ingredients: {foodItem.ingredients}</p>
      <p><em>{foodItem.heartburn}</em></p>
      <button className="btn btn-success btn-sm" onClick={props.onClickingEdit}>Update Food Item</button>&nbsp;&nbsp;
      <button className="btn btn-danger btn-sm" onClick={() => onClickingDelete(foodItem.id)}>Delete Food Item</button>
      <hr />
    </React.Fragment>
  );
}

FoodItemDetail.propTypes = {
  foodItem: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default FoodItemDetail;