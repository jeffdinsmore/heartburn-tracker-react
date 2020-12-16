import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase'

function NewFoodItemForm(props){
  const firestore = useFirestore();
  function addFoodItemToFirestore(event) {
    event.preventDefault();
    props.onNewFoodItemCreation();
  
    return firestore.collection('foodItems').add(
      {
        names: event.target.names.value,
        location: event.target.location.value, 
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addFoodItemToFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewFoodItemForm.propTypes = {
  onNewFoodItemCreation: PropTypes.func
};

export default NewFoodItemForm;