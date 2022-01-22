import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from '../actions';
import { useFirestore } from 'react-redux-firebase';
// import { useStore } from "react-redux";
import { useHistory, Link } from 'react-router-dom';

function EditFoodItemForm(props) {
  const firestore = useFirestore();
  const history = useHistory();
  const { foodItem, userId } = props;
  console.log('edit', props)

  const handleEditingFoodItemInList = () => {
    const { dispatch } = props;
    const action = a.editing();
    const action2 = a.unSelectFoodItem();
    dispatch(action);
    dispatch(action2);
  }

  // const handleClick = () => {
  //   if (editing) {
  //     dispatch(a.editing())
  //     history.push('/foodlist')
  //   } else if (selectedFoodItem !== null) {
  //     dispatch(a.unSelectFoodItem());
  //     history.push('/foodlist')
  //   } else {
  //     history.goBack();
  //   }
  // }

  // const handleChangingSelectedFoodItem = (id) => {
  //   props.firestore.get({ collection: 'users', doc: userId, subcollections: [{ collection: 'foodItems', doc: id }] }).then((foodItem) => {
  //     const firestoreFoodItem = {
  //       foodName: foodItem.get("foodName"),
  //       brand: foodItem.get("brand"),
  //       ingredients: foodItem.get("ingredients"),
  //       heartburn: foodItem.get("heartburn"),
  //       timeOpen: foodItem.get("timeOpen"),
  //       id: foodItem.id
  //     }
  //     const path = '/foodItem/' + firestoreFoodItem.id;
  //     dispatch(a.selectFoodItem(firestoreFoodItem))
  //     dispatch(a.history(path))
  //     console.log('aaaaaaaaaa', firestoreFoodItem)
  //     console.log("updatedddddddddddddddd", props)
  //   });
  // }

  function handleEditFoodItemFormSubmission(event) {
    event.preventDefault();
    handleEditingFoodItemInList();
    const propertiesToUpdate = {
      foodName: event.target.foodName.value,
      brand: event.target.brand.value,
      ingredients: event.target.ingredients.value,
      heartburn: event.target.heartburn.value
    }
    history.push('/foodlist')
    return firestore.update({ collection: 'users', doc: userId, subcollections: [{ collection: 'foodItems', doc: foodItem.id }] }, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <h2>Edit The Selected Food Item</h2>
      <br />
      <form onSubmit={handleEditFoodItemFormSubmission}>
        <p className="pTagForm">Food Name:</p>
        <input className="field"
          type='text'
          name='foodName'
          placeholder='Food name'
          defaultValue={foodItem !== null ? foodItem.foodName : "loading"}
          required='required' />
        <p className="pTagForm">Brand:</p>
        <input className="field"
          type='text'
          name='brand'
          placeholder='Name brand'
          defaultValue={foodItem !== null ? foodItem.brand : "loading"}
          required='required' />
        <p className="pTagForm">Ingredients:</p>
        <textarea className="field2"
          type='text'
          name='ingredients'
          placeholder='Separate ingredients with commas'
          defaultValue={foodItem !== null ? foodItem.ingredients : "loading"}
          required='required' />
        <p className="pTagForm">Heartburn:</p>
        <select name="heartburn" className="field" id="heartburnInput" defaultValue={foodItem !== null ? foodItem.heartburn : "loading"}>
          <option value="" disabled>Please Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br></br><br></br>
        <button className="btn btn-success btn-sm" type='submit'>Submit</button>
      </form>
      <br></br>
      {/* <button className='btn btn-secondary btn-sm' onClick={() => handleClick()} >
        Cancel
      </button> */}

      <Link className="btn btn-sm btn-secondary" to='/foodItem'>Cancel</Link>
    </React.Fragment>
  );
}

EditFoodItemForm.propTypes = {
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
  masterFoodItemList: PropTypes.object,
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


export default connect(mapStateToProps)(EditFoodItemForm);