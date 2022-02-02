import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from '../actions';
import { useFirestore } from 'react-redux-firebase';
// import { useStore } from "react-redux";
import { useHistory, Link } from 'react-router-dom';

function EditUserForm(props) {
  const firestore = useFirestore();
  const history = useHistory();
  const { foodItem, userId, loginName, userCity, userState, userFirstName, userLastName } = props;
  console.log('edit', props)

  const handleEditingUser = () => {
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

  function handleEditUserFormSubmission(event) {
    event.preventDefault();
    handleEditingUser();
    console.log("haaaaaaaaaapppppppy")
    const propertiesToUpdate = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      city: event.target.city.value,
      userState: event.target.userState.value
    }
    console.log("userEdit", propertiesToUpdate)
    history.push('/foodlist')
    window.localStorage.setItem('firstName', propertiesToUpdate.firstName)
    window.localStorage.setItem('lastName', propertiesToUpdate.lastName)
    window.localStorage.setItem('userState', propertiesToUpdate.userState)
    window.localStorage.setItem('city', propertiesToUpdate.city)
    return firestore.update({ collection: 'users', doc: userId }, propertiesToUpdate)
  }
  console.log(props)
  return (
    <React.Fragment>
      <h2>Edit Your Account Info</h2>
      <br />
      <form onSubmit={handleEditUserFormSubmission}>
        <p className="pTagForm">First Name:</p>
        <input className="field"
          type='text'
          name='firstName'
          placeholder='Your first name'
          defaultValue={userFirstName !== null ? userFirstName : "loading"}
          required='required' />
        <p className="pTagForm">Last Name:</p>
        <input className="field"
          type='text'
          name='lastName'
          placeholder='Your last name'
          defaultValue={userLastName !== null ? userLastName : "loading"}
          required='required' />
        <p className="pTagForm">Email:</p>
        <input className="field"
          type='text'
          name='email'
          placeholder='Your email'
          defaultValue={loginName !== null ? loginName : "loading"}
          required='required' />
        <p className="pTagForm">City:</p>
        <input className="field"
          type='text'
          name='city'
          placeholder='Your city'
          defaultValue={userCity !== null ? userCity : "loading"}
          required='required' />
        <p className="pTagForm">State:</p>
        <select name="userState" className="field" id="heartburnInput" defaultValue={userState !== undefined ? userState : "AL"}>
          <option value="" disabled>Please Select</option>
          <option value="AK">AK</option>
          <option value="AL">AL</option>
          <option value="AR">AR</option>
          <option value="AZ">AZ</option>
          <option value="CA">CA</option>
          <option value="CO">CO</option>
          <option value="CT">CT</option>
          <option value="DE">DE</option>
          <option value="FL">FL</option>
          <option value="GA">GA</option>
          <option value="HI">HI</option>
          <option value="IA">IA</option>
          <option value="ID">ID</option>
          <option value="IL">IL</option>
          <option value="IN">IN</option>
          <option value="KS">KS</option>
          <option value="KY">KY</option>
          <option value="LA">LA</option>
          <option value="MA">MA</option>
          <option value="MD">MD</option>
          <option value="ME">ME</option>
          <option value="MI">MI</option>
          <option value="MN">MN</option>
          <option value="MO">MO</option>
          <option value="MS">MS</option>
          <option value="MT">MT</option>
          <option value="NC">NC</option>
          <option value="ND">ND</option>
          <option value="NE">NE</option>
          <option value="NH">NH</option>
          <option value="NJ">NJ</option>
          <option value="NM">NM</option>
          <option value="NV">NV</option>
          <option value="NY">NY</option>
          <option value="OH">OH</option>
          <option value="OK">OK</option>
          <option value="OR">OR</option>
          <option value="PA">PA</option>
          <option value="RI">RI</option>
          <option value="SC">SC</option>
          <option value="SD">SD</option>
          <option value="TN">TN</option>
          <option value="TX">TX</option>
          <option value="UT">UT</option>
          <option value="VA">VA</option>
          <option value="VT">VT</option>
          <option value="WA">WA</option>
          <option value="WI">WI</option>
          <option value="WV">WV</option>
          <option value="WY">WY</option>
        </select>
        <br></br><br></br>
        <button className="btn btn-success btn-sm" type='submit'>Submit</button>
      </form>
      <br></br>
      {/* <button className='btn btn-secondary btn-sm' onClick={() => handleClick()} >
        Cancel
      </button> */}

      <Link className="btn btn-sm btn-secondary" to='/'>Cancel</Link>
    </React.Fragment>
  );
}

EditUserForm.propTypes = {
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
  userId: window.localStorage.getItem('uid'),
  firestore2: state.firestore,
  loginName: window.localStorage.getItem('email'),
  userFirstName: window.localStorage.getItem('firstName'),
  userLastName: window.localStorage.getItem('lastName'),
  userCity: window.localStorage.getItem('city'),
  userState: window.localStorage.getItem('userState'),
  selectedFoodItem: state.selectedFoodItem,
  editing: state.editing,
  foodItems: state.firestore.ordered.foodItems,
  masterFoodList: state.masterFoodItemList,
  foodItem: state.selectedFoodItem,
  showModal: state.showModal,
});


export default connect(mapStateToProps)(EditUserForm);