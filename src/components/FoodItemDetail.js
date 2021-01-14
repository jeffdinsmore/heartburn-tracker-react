import React from "react";
import PropTypes from "prop-types";

function FoodItemDetail(props) {
  const { foodItem, onClickingDelete } = props;
  console.log("open", foodItem);
  function convertDate(seconds, nanoseconds) {
    let d = new Date(seconds / 1000000 + nanoseconds * 1000);
    let month = d.toDateString().substring(7, 3);
    let day = d.toDateString().substring(10, 8);
    let year = d.toDateString().substring(15, 11);
    let n = d.toDateString().substring(4);
    return month + "-" + day + "-" + year;
  }
  return (
    <React.Fragment>
      <h2>Food Item Detail</h2>
      <br></br>
      <p><strong>Food:</strong> {foodItem.foodName}</p>
      <p><strong>Brand:</strong> {foodItem.brand}</p>
      <p><strong>Ingredients:</strong> {foodItem.ingredients}</p>
      <p><strong>Heartburn:</strong> <em>{foodItem.heartburn}</em></p>
      <br></br>
      <p><strong>Date Logged:</strong> {convertDate(foodItem.timeOpen.nanoseconds, foodItem.timeOpen.seconds)}</p>
      <br></br>
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