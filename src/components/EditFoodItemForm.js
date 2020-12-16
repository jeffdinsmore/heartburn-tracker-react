import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditFoodItemForm(props) {
  const firestore = useFirestore();
  const { foodItem } = props;

  function handleEditFoodItemFormSubmission(event) {
    event.preventDefault();
    props.onEditFoodItem();
    const propertiesToUpdate = {
      foodName: event.target.foodName.value,
      ingredients: event.target.ingredients.value,
      heartburn: event.target.heartburn.value
    }
    return firestore.update({ collection: 'foodItems', doc: foodItem.id }, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleEditFoodItemFormSubmission}
        buttonText="Update FoodItem"
        nameText={props.foodName} />
    </React.Fragment>
  );
}

EditFoodItemForm.propTypes = {
  masterFoodItemList: PropTypes.object,
  onEditFoodItem: PropTypes.func
};

export default EditFoodItemForm;