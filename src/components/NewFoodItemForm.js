import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
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
      <ReusableForm
        formSubmissionHandler={addFoodItemToFirestore}
        buttonText="Submit" />
    </React.Fragment>
  );
}

NewFoodItemForm.propTypes = {
  onNewFoodItemCreation: PropTypes.func
};

export default NewFoodItemForm;