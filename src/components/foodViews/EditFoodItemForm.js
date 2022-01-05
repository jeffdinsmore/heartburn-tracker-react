import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';
import { useStore } from "react-redux";
import { userId } from "../../actions";

function EditFoodItemForm(props) {
  const firestore = useFirestore();
  const { foodItem } = props;
  function handleEditFoodItemFormSubmission(event) {
    event.preventDefault();
    props.onEditFoodItem();
    const propertiesToUpdate = {
      foodName: event.target.foodName.value,
      brand: event.target.brand.value,
      ingredients: event.target.ingredients.value,
      heartburn: event.target.heartburn.value
    }
    return firestore.update({ collection: useStore, doc: props.userId.userId, subcollections: [{ collection: 'foodItems', doc: foodItem.id }]}, propertiesToUpdate)
  }

  // ({ collection: 'users', doc: userId.userId, subcollections: [{ collection: 'foodItems', doc: id }] })

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
          defaultValue={foodItem.foodName}
          required='required' />
        <p className="pTagForm">Brand:</p>
        <input className="field"
          type='text'
          name='brand'
          placeholder='Name brand'
          defaultValue={foodItem.brand}
          required='required' />
        <p className="pTagForm">Ingredients:</p>
        <textarea className="field2"
          type='text'
          name='ingredients'
          placeholder='Separate ingredients with commas'
          defaultValue={foodItem.ingredients}
          required='required' />
        <p className="pTagForm">Heartburn:</p>
        <select name="heartburn" className="field" id="heartburnInput" defaultValue={foodItem.heartburn}>
          <option value="" disabled>Please Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br></br><br></br>
        <button className="btn btn-success btn-sm" type='submit'>Submit</button>
      </form>
    </React.Fragment>
  );
}

EditFoodItemForm.propTypes = {
  masterFoodItemList: PropTypes.object,
  onEditFoodItem: PropTypes.func,
};

export default EditFoodItemForm;