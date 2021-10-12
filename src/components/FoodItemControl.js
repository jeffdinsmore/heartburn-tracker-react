import React, { useState, useEffect } from 'react';
import NewFoodItemForm from './NewFoodItemForm';
import FoodItemList from './FoodItemList';
import FoodItemDetail from './FoodItemDetail';
import YourStats from './yourStats/YourStats';
import EditFoodItemForm from './EditFoodItemForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import Modal from './Modal';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useSelector } from 'react-redux';

function FoodItemControl(props) {
  useFirestoreConnect([
    { collection: 'foodItems' }
  ]);
  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  // const [showModal, setShowModal ] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [state, setState] = useState({selectedFoodItem: null, masterFoodItemList: foodItems});
  
  useEffect(() => {
    
    console.log("component updated!", state);
  }, [])
  const [ count, setCount ] = useState(0);
  const handleClick = () => {
    const { dispatch } = props;
    const action = a.toggleForm();
    const action2 = a.editing();

    if (state.selectedFoodItem != null) {
      if (props.editing) {
        dispatch(action2);
      }
      setState({
        selectedFoodItem: null,
        masterFoodItemList: foodItems
      });
    } else {
      dispatch(action);
      // dispatch(action3);
    }
  }

  const useModal = () => {
    
  
    function toggle() {
      setIsShowing(!isShowing);
    }
  
    return {
      isShowing,
      toggle,
      props,
      useState
    }
  };

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
      setState({ selectedFoodItem: firestoreFoodItem});
    });
    // setCount(count + 1);
    console.log("joey", state)
  }

  const handleDeletingFoodItem = (id) => {
    props.firestore.delete({ collection: 'foodItems', doc: id });
    setIsShowing(!isShowing)
    setState({
      selectedFoodItem: null
    });
  }

  const handleShowingModal = () => {
    function toggle() {
      setIsShowing(!isShowing);
    }
    console.log("j", isShowing)
    return {
      isShowing,
      toggle,
      props,
      useState
    }
  }

  const handleEditingFoodItemInList = () => {
    const { dispatch } = props;
    const action = a.editing();
    dispatch(action);
    setState({
      selectedFoodItem: null, 
      masterFoodItemList: foodItems
    });
  }

  const handleEditClick = () => {
    console.log("handleEditClick reached!");
    const { dispatch } = props;
    const action = a.editing();
    dispatch(action);
  }

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
      currentlyVisibleState = <EditFoodItemForm foodItem={state.selectedFoodItem} onEditFoodItem={handleEditingFoodItemInList} />
      buttonText = "Return to Food List";
    } else if (state.selectedFoodItem != null) {
      currentlyVisibleState = <FoodItemDetail foodItem={state.selectedFoodItem} onClickingDelete={handleDeletingFoodItem} onClickingModal = {handleShowingModal} onClickingEdit={handleEditClick} showModal = {handleShowingModal}/>
      buttonText = "Return to Food List";
    } else if (props.formVisibleOnPage) {
      currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={handleAddingNewFoodItemToList} />;
      buttonText = "Return to Food List";
    // } else if(state.showModal != false) {
    //   currentlyVisibleState = <Modal foodItem={state.selectedFoodItem} showModal={state.showModal} onClickingDelete={handleDeletingFoodItem} />
    //   buttonText = "Cancel"
    } else {
      currentlyVisibleState = <FoodItemList foodItemList={props.masterFoodItemList} onFoodItemSelection={handleChangingSelectedFoodItem} />;
      buttonText = "Add Food Item";
    }
    //console.log(state)
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <br></br>
        <button className="btn btn-info btn-sm" onClick={handleClick}>{buttonText}</button>
      </React.Fragment>
    );
}
// }
FoodItemControl.propTypes = {
  masterFoodItemList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool,
  selectedFoodItem: PropTypes.object,
  isShowing: PropTypes.bool,
};

const mapStateToProps = state => {
  //console.log("state", state)
  return {
    masterFoodItemList: state.masterFoodItemList,
    formVisibleOnPage: state.formVisibleOnPage,
    editing: state.editing,
    selectedFoodItem: state.selectedFoodItem,
    isShowing: state.isShowing,
  }
}

FoodItemControl = connect(mapStateToProps)(FoodItemControl);

export default withFirestore(FoodItemControl);