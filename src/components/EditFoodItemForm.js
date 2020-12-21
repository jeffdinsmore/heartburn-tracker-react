import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditFoodItemForm(props) {
  const firestore = useFirestore();
  const { foodItem } = props;
  console.log("edit ", props);
  function handleEditFoodItemFormSubmission(event) {
    event.preventDefault();
    props.onEditFoodItem();
    const propertiesToUpdate = {
      foodName: event.target.foodName.value,
      brand: event.target.brand.value,
      ingredients: event.target.ingredients.value,
      heartburn: event.target.heartburn.value
    }
    return firestore.update({ collection: 'foodItems', doc: foodItem.id }, propertiesToUpdate)
  }

  return (
    <React.Fragment>

      <form onSubmit={handleEditFoodItemFormSubmission}>
        <input className="field"
          type='text'
          name='foodName'
          placeholder='Food Item'
          defaultValue={foodItem.foodName}
          required='required' />
        <br></br>
        <input className="field"
          type='text'
          name='brand'
          placeholder='Name brand'
          defaultValue={foodItem.brand}
          required='required' />
        <br></br>
        <textarea className="field2"
          type='text'
          name='ingredients'
          placeholder='Ingredients'
          defaultValue={foodItem.ingredients}
          required='required' />
        <br></br>
        <select name="heartburn" className="field" id="heartburnInput" defaultValue={foodItem.heartburn}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br></br><br></br>
        <button className="btn btn-success btn-sm" type='submit'>Update Food Item</button>
      </form>
    </React.Fragment>
  );
}

EditFoodItemForm.propTypes = {
  masterFoodItemList: PropTypes.object,
  onEditFoodItem: PropTypes.func,
};

export default EditFoodItemForm;