import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase'

function NewFoodItemForm(props) {
  const firestore = useFirestore();
  function addFoodItemToFirestore(event) {
    event.preventDefault();
    props.onNewFoodItemCreation();

    return firestore.collection('foodItems').add(
      {
        foodName: event.target.foodName.value,
        ingredients: event.target.ingredients.value,
        heartburn: event.target.heartburn.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={addFoodItemToFirestore}>
        <input className="field"
          type='text'
          name='foodName'
          placeholder='Food Item'
          required='required' />
        <br></br>
        <input className="field"
          type='text'
          name='ingredients'
          placeholder='Ingredients'
          required='required' />
        <br></br>
        <input className="field"
          type="text"
          name='heartburn'
          placeholder='Heartburn Yes/No'
          required='required' />
          <br></br>
        <button className="btn btn-success btn-sm" type='submit'>Submit</button>
      </form>
    </React.Fragment>
  );
}

NewFoodItemForm.propTypes = {
  onNewFoodItemCreation: PropTypes.func
};

export default NewFoodItemForm;