import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase'
import firebase from 'firebase';
import * as a from '../actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


function NewFoodItemForm(props) {
  const firestore = useFirestore();
  const history = useHistory();
  const { userId, selectedFoodItem, editing, dispatch } = props;
  useEffect(() => {
    (async () => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          const { dispatch } = props;
          if (user) {
            dispatch(a.signInName(user.email));
            dispatch(a.userId(user.uid));
          }
        })
      } catch (error) {
        alert(error);
      }
      console.log("Home component did mount")
    })();
  }, [])

  const handleAddingNewFoodItemToList = () => {
    const { dispatch } = props;
    const action = a.toggleForm();
    dispatch(action);
    history.goBack();
  }

  const handleClick = () => {
    if (editing) {
      dispatch(a.editing())
      history.push('/foodlist')
    } else if (selectedFoodItem !== null) {
      dispatch(a.unSelectFoodItem());
      history.push('/foodlist')
    } else {
      history.goBack();
    }

  }

  function addFoodItemToFirestore(event) {
    event.preventDefault();
    handleAddingNewFoodItemToList();
    //let timestamp = {seconds: 1640835181, nanoseconds: 19000000}
    return firestore.collection('users').doc(userId).collection('foodItems').add(
      Object.assign({}, {
        foodName: event.target.foodName.value,
        brand: event.target.brand.value,
        ingredients: event.target.ingredients.value,
        heartburn: event.target.heartburn.value,
        //timeOpen: timestamp
        timeOpen: firestore.FieldValue.serverTimestamp()
      })

    );
  }
  console.log("newfood item", props)
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
      <br></br>
      <button className='btn btn-secondary btn-sm' onClick={() => handleClick()} >
        Cancel
      </button>
    </React.Fragment>
  );
}

NewFoodItemForm.propTypes = {
  userId: PropTypes.string,
  firestore: PropTypes.object,
  loginName: PropTypes.string,
  selectedFoodItem: PropTypes.object,
  editing: PropTypes.bool
};

const mapStateToProps = state => ({
  userId: window.localStorage.getItem('uid'),
  firestore: state.firestore,
  loginName: window.localStorage.getItem('email'),
  selectedFoodItem: state.selectedFoodItem,
  editing: state.editing,

});

export default connect(mapStateToProps)(NewFoodItemForm);