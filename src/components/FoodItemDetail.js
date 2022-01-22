import React from "react";
import PropTypes from "prop-types";
import Modal from './Modal';
import { useSelector } from "react-redux";
import * as a from '../actions';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { withFirestore } from 'react-redux-firebase';

function FoodItemDetail(props) {

  const history = useHistory();
  const state = useSelector(state => state)
  console.log('detail', state, props)
  const { foodItem, showModal, userId, selectedFoodItem } = props;

  const handleDeletingFoodItem = (id) => {
    const { dispatch } = props;
    const action = a.unSelectFoodItem();
    const action2 = a.showModal();
    props.firestore.delete({ collection: 'users', doc: userId, subcollections: [{ collection: 'foodItems', doc: id }] });
    dispatch(action);
    dispatch(action2);
    history.push('/foodlist')
  }

  const handleShowingModal = () => {
    const { dispatch } = props;
    const action = a.showModal();
    if (selectedFoodItem !== null) {
      dispatch(action);
    }
  }

  const handleEditClick = (foodItem) => {
    console.log("handleEditClick reached!");
    const { dispatch } = props;
    console.log("handleEdit", state, props, foodItem)
    const action = a.editing();
    dispatch(action);

    history.push('/edit/foodItem')
  }

  const handleCancelModal = () => {
    console.log("Modal canceled")
    const { dispatch } = props;
    const action = a.showModal();
    if (showModal) {
      dispatch(action);
    }
  }

  function convertDate(seconds, nanoseconds) {
    let d = new Date(seconds / 1000000 + nanoseconds * 1000);
    let month = d.toDateString().substring(7, 3);
    let day = d.toDateString().substring(10, 8);
    let year = d.toDateString().substring(15, 11);
    return month + "-" + day + "-" + year;
  }
  console.log("Detail component did mount");
  return (
    <React.Fragment>

      <h2>Food Item Detail</h2>
      <br></br>
      <div className="detail">
        <p><strong>Food:</strong> {foodItem !== null ? foodItem.foodName : "loading"}</p>
        <p><strong>Brand:</strong> {foodItem !== null ? foodItem.brand : "loading"}</p>
        <p><strong>Ingredients:</strong> {foodItem !== null ? foodItem.ingredients : "loading"}</p>
        <p><strong>Heartburn:</strong> <em>{foodItem !== null ? foodItem.heartburn : "loading"}</em></p>
        <br></br>
        <p><strong>Date Logged:</strong> {convertDate(foodItem !== null ? foodItem.timeOpen.nanoseconds : 0, foodItem !== null ? foodItem.timeOpen.seconds : 0)}</p>
        <br></br>
        <Link className="btn btn-success btn-sm" onClick={() => handleEditClick(foodItem)} to='/edit/foodItem'>Update Item</Link>&nbsp;&nbsp;
        <button className="btn btn-danger btn-sm" onClick={handleShowingModal}>Delete Item</button>
        <Modal
          foodItem={foodItem}
          onClickingDelete={handleDeletingFoodItem}
          onClickingCancel={handleCancelModal}
          showModal={showModal}
        />
      </div>
      <hr />
      <Link as={Link} className='btn btn-info btn-sm' to='/foodlist'>
        See Food List
      </Link>
    </React.Fragment>
  );
}

FoodItemDetail.propTypes = {
  foodItem: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingModal: PropTypes.func,
  onClickingCancel: PropTypes.func,
  userId: PropTypes.string,
  firestore2: PropTypes.object,
  loginName: PropTypes.string,
  selectedFoodItem: PropTypes.object,
  editing: PropTypes.bool,
  foodItems: PropTypes.array,
  masterFoodList: PropTypes.object,
  showModal: PropTypes.bool,
};

const mapStateToProps = state => ({
  userId: window.localStorage.getItem('uId'),
  firestore2: state.firestore,
  loginName: window.localStorage.getItem('email'),
  selectedFoodItem: state.selectedFoodItem,
  editing: state.editing,
  foodItems: state.firestore.ordered.foodItems,
  masterFoodList: state.masterFoodItemList,
  foodItem: state.selectedFoodItem,
  showModal: state.showModal,
});

//FoodItemDetail = connect(mapStateToProps)(FoodItemDetail);

export default withFirestore(connect(mapStateToProps)(FoodItemDetail));
