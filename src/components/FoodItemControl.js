import React, { useState, useEffect } from 'react';
import NewFoodItemForm from './NewFoodItemForm';
import FoodItemList from './FoodItemList';
import FoodItemDetail from './FoodItemDetail';
import EditFoodItemForm from './EditFoodItemForm';
//import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

function FoodItemControl(props) {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedFoodItem: null,
  //   };
  // }
  const [selectedFoodItem, setSelectectFoodItems] = useState(null)
  useEffect(() => {
    console.log("component updated!");
  })

  const handleClick = () => {
    const { dispatch } = props;
    const action = a.toggleForm();
    const action2 = a.editing();

    if (selectedFoodItem != null) {
      if (props.editing) {
        dispatch(action2);
      }
      setSelectectFoodItems({
        selectedFoodItem: null,
      });
    } else {
      dispatch(action);
      // dispatch(action3);
    }
  }

  const handleAddingNewFoodItemToList = () => {
    const { dispatch } = props;
    const action = a.toggleForm();
    dispatch(action);
  }

  const handleChangingSelectedFoodItem = (id) => {
    props.firestore.get({ collection: 'foodItems', doc: id }).then((foodItem) => {
      const firestoreFoodItem = {
        foodName: foodItem.get("foodName"),
        brand: foodItem.get("brand"),
        ingredients: foodItem.get("ingredients"),
        heartburn: foodItem.get("heartburn"),
        timeOpen: foodItem.get("timeOpen"),
        id: foodItem.id
      }
      setSelectectFoodItems({ selectedFoodItem: firestoreFoodItem });
    });
  }

  const handleDeletingFoodItem = (id) => {
    props.firestore.delete({ collection: 'foodItems', doc: id });
    setSelectectFoodItems({
      selectedFoodItem: null
    });
  }

  const handleEditingFoodItemInList = () => {
    const { dispatch } = props;
    const action = a.editing();
    dispatch(action);
    setSelectectFoodItems({
      selectedFoodItem: null
    });
  }

  const handleEditClick = () => {
    console.log("handleEditClick reached!");
    const { dispatch } = props;
    const action = a.editing();
    dispatch(action);
  }

  //render() {
    // const auth = this.props.firebase.auth();
    // if (!isLoaded(auth)) {
    //   return (
    //     <React.Fragment>
    //       <h1>Loading...</h1>
    //     </React.Fragment>
    //   )
    // }
    // if ((isLoaded(auth)) && (auth.currentUser == null)) {
    //   return (
    //     <React.Fragment>
    //       <h1>You must be signed in to access the queue.</h1>
    //     </React.Fragment>
    //   )
    // }
    // if ((isLoaded(auth)) && (auth.currentUser != null)) {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (props.editing) {
      currentlyVisibleState = <EditFoodItemForm foodItem={selectedFoodItem} onEditFoodItem={handleEditingFoodItemInList} />
      buttonText = "Return to Food List";
    } else if (selectedFoodItem != null) {
      currentlyVisibleState = <FoodItemDetail foodItem={selectedFoodItem} onClickingDelete={handleDeletingFoodItem} onClickingEdit={handleEditClick} />
      buttonText = "Return to Food List";
    } else if (props.formVisibleOnPage) {
      currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={handleAddingNewFoodItemToList} />;
      buttonText = "Return to Food List";
    } else {
      currentlyVisibleState = <FoodItemList foodItemList={props.masterFoodItemList} onFoodItemSelection={handleChangingSelectedFoodItem} />;
      buttonText = "Add Food Item";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <br></br>
        <button className="btn btn-info btn-sm" onClick={handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  //}
}
// }
FoodItemControl.propTypes = {
  masterFoodItemList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool,
  selectedFoodItem: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    masterFoodItemList: state.masterFoodItemList,
    formVisibleOnPage: state.formVisibleOnPage,
    editing: state.editing,
    selectedFoodItem: state.selectedFoodItem
  }
}

FoodItemControl = connect(mapStateToProps)(FoodItemControl);

export default withFirestore(FoodItemControl);