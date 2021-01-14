import React from 'react';
import NewFoodItemForm from './NewFoodItemForm';
import FoodItemList from './FoodItemList';
import FoodItemDetail from './FoodItemDetail';
import EditFoodItemForm from './EditFoodItemForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

class FoodItemControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFoodItem: null,
    };
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  handleClick = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    const action2 = a.editing();

    if (this.state.selectedFoodItem != null) {
      if (this.props.editing) {
        dispatch(action2);
      }
      this.setState({
        selectedFoodItem: null,
      });
    } else {
      dispatch(action);
      // dispatch(action3);
    }
  }

  handleAddingNewFoodItemToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleChangingSelectedFoodItem = (id) => {
    this.props.firestore.get({ collection: 'foodItems', doc: id }).then((foodItem) => {
      const firestoreFoodItem = {
        foodName: foodItem.get("foodName"),
        brand: foodItem.get("brand"),
        ingredients: foodItem.get("ingredients"),
        heartburn: foodItem.get("heartburn"),
        timeOpen: foodItem.get("timeOpen"),
        nanoseconds: foodItem.get("timeOpen.nanoseconds"),
        id: foodItem.id
      }
      this.setState({ selectedFoodItem: firestoreFoodItem });
    });
  }

  handleDeletingFoodItem = (id) => {
    this.props.firestore.delete({ collection: 'foodItems', doc: id });
    this.setState({
      selectedFoodItem: null
    });
  }

  handleEditingFoodItemInList = () => {
    const { dispatch } = this.props;
    const action = a.editing();
    dispatch(action);
    this.setState({
      selectedFoodItem: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    const { dispatch } = this.props;
    const action = a.editing();
    dispatch(action);
  }

  render() {
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
    if (this.props.editing) {
      currentlyVisibleState = <EditFoodItemForm foodItem={this.state.selectedFoodItem} onEditFoodItem={this.handleEditingFoodItemInList} />
      buttonText = "Return to Food List";
    } else if (this.state.selectedFoodItem != null) {
      currentlyVisibleState = <FoodItemDetail foodItem={this.state.selectedFoodItem} onClickingDelete={this.handleDeletingFoodItem} onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Food List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={this.handleAddingNewFoodItemToList} />;
      buttonText = "Return to Food List";
    } else {
      currentlyVisibleState = <FoodItemList foodItemList={this.props.masterFoodItemList} onFoodItemSelection={this.handleChangingSelectedFoodItem} />;
      buttonText = "Add Food Item";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <br></br>
        <button className="btn btn-info btn-sm" onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
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