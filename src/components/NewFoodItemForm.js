import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase'
import firebase from 'firebase';

function NewFoodItemForm(props) {
  const firestore = useFirestore();

  const getUserId = async () => {
    let uid = "";
    await firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        // console.log("add2", user.uid)
        uid = user.uid;
      }
    })
    return uid;
  }
  
  console.log("add", props, getUserId())
  function addFoodItemToFirestore(event) {
    event.preventDefault();
    props.onNewFoodItemCreation();

    return firestore.collection('users').doc(getUserId()).collection('foodItems').add(
      {
        foodName: event.target.foodName.value,
        brand: event.target.brand.value,
        ingredients: event.target.ingredients.value,
        heartburn: event.target.heartburn.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }

  return (
    <React.Fragment>
      <h2>Add A Food Item To Your Tracker</h2>
      <br />
      <form onSubmit={addFoodItemToFirestore}>
      <p className="pTagForm">Food Name:</p>
        <input className="field"
          type='text'
          name='foodName'
          placeholder='Food name'
          required='required' />
        <p className="pTagForm">Brand:</p>
        <input className="field"
          type='text'
          name='brand'
          placeholder='Name brand'
          required='required' />
        <p className="pTagForm">Ingredients:</p>
        <textarea className="field2"
          type='text'
          name='ingredients'
          placeholder='Separate ingredients with commas'
          required='required' />
        <p className="pTagForm">Heartburn:</p>
        <select name="heartburn" id="heartburnInput" required='required' defaultValue="">
          <option value="" disabled>Please Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br></br><br></br><br></br>
        <button className="btn btn-success btn-sm" type='submit'>Submit</button>
      </form>
    </React.Fragment>
  );
}

NewFoodItemForm.propTypes = {
  onNewFoodItemCreation: PropTypes.func,
};

export default NewFoodItemForm;