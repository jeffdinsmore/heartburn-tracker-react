import React from "react";
import PropTypes from "prop-types";
import Modal from '../Modal';
import { useSelector } from "react-redux";

function FoodItemDetail(props) {
  const state = useSelector(state => state)
  console.log('detail', state, props)
  const { foodItem, onClickingModal, onClickingDelete, onClickingEdit, showModal, onClickingCancel} = props;
  //const {isShowing, toggle} = useModal(foodItem.id)
  function convertDate(seconds, nanoseconds) {
    let d = new Date(seconds / 1000000 + nanoseconds * 1000);
    let month = d.toDateString().substring(7, 3);
    let day = d.toDateString().substring(10, 8);
    let year = d.toDateString().substring(15, 11);
    return month + "-" + day + "-" + year;
  }
  return (
    <React.Fragment>
      
      <h2>Food Item Detail</h2>
      <br></br>
      <div className="detail">
      <p><strong>Food:</strong> {foodItem.foodName}</p>
      <p><strong>Brand:</strong> {foodItem.brand}</p>
      <p><strong>Ingredients:</strong> {foodItem.ingredients}</p>
      <p><strong>Heartburn:</strong> <em>{foodItem.heartburn}</em></p>
      <br></br>
      <p><strong>Date Logged:</strong> {convertDate(foodItem.timeOpen.nanoseconds, foodItem.timeOpen.seconds)}</p>
      <br></br>
      <button className="btn btn-success btn-sm" onClick={() => onClickingEdit(foodItem)}>Update Item</button>&nbsp;&nbsp;
      <button className="btn btn-danger btn-sm" onClick={onClickingModal}>Delete Item</button>
      <Modal
        foodItem={foodItem}
        onClickingDelete={onClickingDelete}
        onClickingCancel={onClickingCancel}
        showModal={showModal}
      />
      </div>
      <hr />
    </React.Fragment>
  );
}

FoodItemDetail.propTypes = {
  foodItem: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingModal: PropTypes.func,
  onClickingCancel: PropTypes.func
};

export default FoodItemDetail;