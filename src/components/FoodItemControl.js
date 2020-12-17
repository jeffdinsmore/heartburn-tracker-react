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
    console.log(props);
    this.state = {
      selectedFoodItem: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateFoodItemElapsedWaitTime(),
      60000
    );
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount() {
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateFoodItemElapsedWaitTime = () => {
    console.log("tick");
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
        ingredients: foodItem.get("ingredients"),
        heartburn: foodItem.get("heartburn"),
        id: foodItem.id
      }
      this.setState({ selectedFoodItem: firestoreFoodItem });
    });
  }

  handleClick = () => {
    if (this.state.selectedFoodItem != null) {
      this.setState({
        selectedFoodItem: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleDeletingFoodItem = (id) => {
    this.props.firestore.delete({ collection: 'foodItems', doc: id });
    this.setState({
      selectedFoodItem: null
    });
  }

  handleEditingFoodItemInList = () => {
    // const { dispatch } = this.props;
    // const action = a.addFoodItem(foodItemToEdit);
    // dispatch(action);
    this.setState({
      editing: false,
      selectedFoodItem: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  }

  // handleClick = () => {
  //   this.setState(prevState => {
  //     return { count: prevState.count + 1 }
  //   })
  // }

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
      if (this.state.editing) {
        currentlyVisibleState = <EditFoodItemForm foodItem={this.state.selectedFoodItem} onEditFoodItem={this.handleEditingFoodItemInList} />
        buttonText = "Return to FoodItem List";
      } else if (this.state.selectedFoodItem != null) {
        currentlyVisibleState = <FoodItemDetail foodItem={this.state.selectedFoodItem} onClickingDelete={this.handleDeletingFoodItem} onClickingEdit={this.handleEditClick} />
        buttonText = "Return to Food Item List";
        // }
        // else if (this.state.count === 1) {
        //   currentlyVisibleState = <Steps />
        //   buttonText = "Yes";
        // } else if (this.state.count === 2) {
        //   currentlyVisibleState = <Help />
        //   buttonText = "Yes";
        // } else if (this.state.count === 3) {
        //   currentlyVisibleState = <Question />
        //   buttonText = "Go to Form";
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={this.handleAddingNewFoodItemToList} />;
        buttonText = "Return to FoodItem List";
      } else {
        currentlyVisibleState = <FoodItemList foodItemList={this.props.masterFoodItemList} onFoodItemSelection={this.handleChangingSelectedFoodItem} />;
        buttonText = "Add FoodItem";
      }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    // }
  }
}
FoodItemControl.propTypes = {
  masterFoodItemList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    masterFoodItemList: state.masterFoodItemList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

FoodItemControl = connect(mapStateToProps)(FoodItemControl);

export default withFirestore(FoodItemControl);