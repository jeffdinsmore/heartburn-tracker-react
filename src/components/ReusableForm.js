import React from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useFirestore } from 'react-redux-firebase';

// function FoodItemList() {


function ReusableForm(props) {
  // const firestore = useFirestore();
  const { foodItem } = props;
  // useFirestoreConnect([
  //   { collection: 'foodItems' }
  // ]);
  console.log("props: ", props);

  // const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  console.log("food: ", foodItem);
  if (isLoaded(foodItem)) {
    let formHandle;
    if (props.foodItem) {
      formHandle = <form onSubmit={props.formSubmissionHandler}>
        <input className="field"
          type='text'
          name='foodName'
          placeholder='Food Item'
          defaultValue={foodItem.foodName}
          required='required' />
        <br></br>
        <input className="field"
          type='text'
          name='ingredients'
          placeholder='Ingredients'
          defaultValue={props.foodItem.ingredients}
          required='required' />
        <br></br>
        <input className="field"
          type="text"
          name='heartburn'
          placeholder='Heartburn Yes/No'
          defaultValue={props.foodItem.heartburn}
          required='required' />
        <br></br>
        <button className="btn-success" type='submit'>{props.buttonText}</button>
      </form>
    } else {
      formHandle = <form onSubmit={props.formSubmissionHandler}>
        <input className="field"
          type='text'
          name='foodName'
          placeholder='Food Item' />
        <br></br>
        <input className="field"
          type='text'
          name='ingredients'
          placeholder='Ingredients' />
        <br></br>
        <input className="field"
          type="text"
          name='heartburn'
          placeholder='Heartburn Yes/No' />
        <button className="Submit" type='submit'>{props.buttonText}</button>
      </form>
    }
    
    return (
      <React.Fragment>
        {formHandle}
      </React.Fragment>
    );
} else {
  return (
    <React.Fragment>
      <h3>Loading...</h3>
    </React.Fragment>
  )
}
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
  // masterFoodItemList: PropTypes.object,
  // foodItem: PropTypes.object
};

export default ReusableForm;