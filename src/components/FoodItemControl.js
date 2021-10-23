import React, { useState, useEffect } from 'react';
import NewFoodItemForm from './NewFoodItemForm';
import FoodItemList from './FoodItemList';
import FoodItemDetail from './FoodItemDetail';
import YourStats from './YourStats';
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
    { collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }
  ]);
  // const firestore = useSelector(props => props.firestore)
  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  const editing = useSelector(state => state.editing)
  console.log("mast", editing)
  const showModal = useSelector(state => state.showModal);
  const state = useSelector(state => state);
  const formVisibleOnPage = useSelector(state => state.formVisibleOnPage);
  //const isShowing = useSelector(state => state.showModal);
  const [isShowing, setIsShowing] = useState(useSelector(state => state.showModal));
  // const [state, setState] = useState({ selectedFoodItem: null });
  const [ selectedFoodItem, setSelectedFoodItem ] = useState(null)
  useEffect(() => {

    console.log("component updated!");
  }, [])
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    const { dispatch } = props;
    const action = a.toggleForm();
    const action2 = a.editing();
    console.log("eeee", editing, props)
    if (selectedFoodItem != null) {
      if (editing) {
        dispatch(action2);
      }
      setSelectedFoodItem(null);
      console.log("ppp", selectedFoodItem)
    } else {
      dispatch(action);
      setSelectedFoodItem(null)
      console.log("jjj", selectedFoodItem)
      // dispatch(action3);
    }
  }

  const handleShowingModal = () => {

    const { dispatch } = props;
    const action = a.showModal();
    //console.log("modal", isShowing)
    console.log(selectedFoodItem)
    if (selectedFoodItem != null) {
      if (showModal) {
        dispatch(action);
        console.log("s", state)
      }
    }
    function toggle() {
      setIsShowing(!isShowing);
    }
    return {
      isShowing,
      toggle,
      props,
      useState
    }
  }

  // const useModal = () => {


  //   function toggle() {
  //     setIsShowing(!isShowing);
  //   }

  //   return {
  //     isShowing,
  //     toggle,
  //     props,
  //     useState
  //   }
  // };

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
      setSelectedFoodItem(firestoreFoodItem);
    });
    // setCount(count + 1);
    console.log("joey")
  }

  const handleDeletingFoodItem = (id) => {
    props.firestore.delete({ collection: 'foodItems', doc: id });
    setSelectedFoodItem(null);
  }



  const handleEditingFoodItemInList = () => {
    const { dispatch } = props;
    const action = a.editing();
    dispatch(action);
    setSelectedFoodItem(null);
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
  console.log("mast1", state, props)
  let currentlyVisibleState = null;
  let buttonText = null;

  if (editing) {
    currentlyVisibleState = <EditFoodItemForm foodItem={selectedFoodItem} onEditFoodItem={handleEditingFoodItemInList} />
    buttonText = "Return to Food List";
  } else if (selectedFoodItem != null) {
    currentlyVisibleState = <FoodItemDetail foodItem={selectedFoodItem} onClickingDelete={handleDeletingFoodItem} onClickingModal={handleShowingModal} onClickingEdit={handleEditClick} />
    buttonText = "Return to Food List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={handleAddingNewFoodItemToList} />;
    buttonText = "Return to Food List";
  } else {
    currentlyVisibleState = <FoodItemList foodItemList={foodItems} onFoodItemSelection={handleChangingSelectedFoodItem} />;
    buttonText = "Add Food Item";
  }
  //console.log("state", state, isShowing)

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

// const mapStateToProps = state => {
//   //console.log("state", state)
//   return {
//     //masterFoodItemList: state.masterFoodItemList,
//     //formVisibleOnPage: state.formVisibleOnPage,
//     //editing: state.editing,
//     //selectedFoodItem: {selectedFoodItem},
//     //isShowing: state.isShowing,
//   }
// }

FoodItemControl = connect()(FoodItemControl);

export default withFirestore(FoodItemControl);