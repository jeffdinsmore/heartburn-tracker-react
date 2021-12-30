import React, { useEffect } from 'react';
import NewFoodItemForm from './foodViews/NewFoodItemForm';
import FoodItemList from './foodViews/FoodItemList';
import FoodItemDetail from './foodViews/FoodItemDetail';
import EditFoodItemForm from './foodViews/EditFoodItemForm';
import Homepage from './Homepage';
//import YourStats from './YourStats';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import firebase, { getAuth, onAuthStateChanged } from 'firebase';
//import { propTypes } from 'react-bootstrap/esm/Image';
import { useSelector } from 'react-redux';
import Signin from './auth/Signin';
import Header from './layout/Header';
import Footer from './Footer'
import { createBrowserHistory } from 'history';
import { withRouter, useRouteMatch, useHistory } from 'react-router-dom';
import YourStats from './foodViews/YourStats';


function FoodItemControl(props) {
  const state = useSelector(state => state);
  useEffect(() => {
    (async () => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          const { dispatch } = props;
          //const action = a.signInName();

          if (user) {
            console.log("fdfd", user.email)
            // if (signInName === "Signed out" || signInName === "Not signed in") {
            dispatch(a.signInName(user.email));
            dispatch(a.userId(user.uid));
            console.log("s", state, props)
          }
          // } else {
        })
      } catch (error) {
        alert(error);
        // } finally {
        // }
      }
    })();
  }, [])

  const userId = useSelector(state => state.userId);
  console.log("router", withRouter(FoodItemControl), userId.userId)

  
  // useFirestoreConnect([
  //   {
  //     collection: 'users', doc: userId.userId,
  //     subcollections: [{ collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }], storeAs: 'foodItems'
  //   }
  // ]);
  const history = createBrowserHistory();
  // const firestore = useSelector(props => props.firestore)
  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  const editing = useSelector(state => state.editing)
  //console.log("mast", editing)
  const showModal = useSelector(state => state.showModal);
  
  //const [ state, setState ] = useState({selectedFoodItem: null})
  const formVisibleOnPage = useSelector(state => state.formVisibleOnPage);
  const loginName = useSelector(state => state.loginName.user);
  const loginVisible = useSelector(state => state.loginVisible);
  
  //const isShowing = useSelector(state => state.showModal);
  // const [state, setState] = useState({ selectedFoodItem: null });
  // const [ selectedFoodItem, setSelectedFoodItem ] = useState(null);
  const selectedFoodItem = useSelector(state => state.selectedFoodItem)
  useEffect(() => {
    console.log("component updated!");
  }, [])

  const getUserData = () => {

  }


  

  const handleClick = () => {
    const { dispatch } = props;
    const action = a.toggleForm();
    const action2 = a.editing();
    const action3 = a.unSelectFoodItem();
    //const action4 = a.togglefooditemlistShowing()
    if (loginName === "Not signed in") {
      history.push('/add-food-item')
    } else if (history.location.pathname === '/foodlist') {
      history.push('/add-food-item')
    } else {
      history.push('/foodlist')
    }
    //history.push('/addfooditem')
    //console.log("eeee", editing, props)
    if (selectedFoodItem != null) {
      if (editing) {
        dispatch(action2);
      }
      dispatch(action3);
      //setSelectedFoodItem(null);
      //setState({selectedFoodItem: null})
      //console.log("ppp", state, props, state.selectedFoodItem)
    } else {
      dispatch(action);
      //console.log("jjj", state.selectedFoodItem)
      // dispatch(action3);
    }
  }

  const handleShowingModal = () => {
    const { dispatch } = props;
    const action = a.showModal();
    if (selectedFoodItem !== null) {
      dispatch(action);
      dispatch(a.signInName("sherry"))
    }
  }

  const handleCancelModal = () => {
    const { dispatch } = props;
    const action = a.showModal();
    if (showModal) {
      dispatch(action);
      console.log("s", state)
    }
  }

  const handleAddingNewFoodItemToList = () => {
    const { dispatch } = props;
    const action = a.toggleForm();
    dispatch(action);
    history.push('/')
  }

  const handleChangingSelectedFoodItem = (id) => {
    const { dispatch } = props;
    //const action = a.selectFoodItem();
    props.firestore.get({ collection: 'foodItems', doc: id }).then((foodItem) => {
      const firestoreFoodItem = {
        foodName: foodItem.get("foodName"),
        brand: foodItem.get("brand"),
        ingredients: foodItem.get("ingredients"),
        heartburn: foodItem.get("heartburn"),
        timeOpen: foodItem.get("timeOpen"),
        id: foodItem.id
      }
      dispatch(a.selectFoodItem(firestoreFoodItem))
      // .foodName, firestoreFoodItem.brand, firestoreFoodItem.ingredients, firestoreFoodItem.heartburn, firestoreFoodItem.timeOpen, firestoreFoodItem.id))
      // //setState({selectedFoodItem: firestoreFoodItem});
    });
    // setCount(count + 1);
    //console.log("joey")
  }

  const handleDeletingFoodItem = (id) => {
    const { dispatch } = props;
    const action = a.unSelectFoodItem();
    const action2 = a.showModal();
    props.firestore.delete({ collection: 'foodItems', doc: id });
    dispatch(action);
    dispatch(action2);
    //setState({selectedFoodItem: null});
  }



  const handleEditingFoodItemInList = () => {
    const { dispatch } = props;
    const action = a.editing();
    const action2 = a.unSelectFoodItem();
    dispatch(action);
    dispatch(action2);
    //setState({selectedFoodItem:null});
  }

  const handleEditClick = () => {
    console.log("handleEditClick reached!");
    const { dispatch } = props;
    const action = a.editing();
    dispatch(action);
  }

  const handleClickSignin = () => {
    const { dispatch } = props;
    const action = a.signInName;
    if (loginName === "Signed out" || loginName === "Not signed in") {
      dispatch(action);
      console.log("s", state)
    }
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

  console.log("mast1", history, state, props, loginName)
  let currentlyVisibleState = null;
  let buttonText = null;
  let buttonClass = "btn btn-info btn-sm";
  const auth = props.firebase.auth();
  // if ((isLoaded(auth)) && (auth.currentUser != null)) {
  if (editing) {
    currentlyVisibleState = <EditFoodItemForm foodItem={selectedFoodItem} onEditFoodItem={handleEditingFoodItemInList} />
    buttonText = "Return to Food List";
  } else if (selectedFoodItem != null) {
    currentlyVisibleState = <FoodItemDetail foodItem={selectedFoodItem} onClickingDelete={handleDeletingFoodItem} onClickingModal={handleShowingModal} onClickingEdit={handleEditClick} onClickingCancel={handleCancelModal} showModal={showModal} />
    buttonText = "Return to Food List";
    // } else if (formVisibleOnPage) {
    //   currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={handleAddingNewFoodItemToList} />;
    //   buttonText = "Return to Food List";
  } else if (history.location.pathname === '/') {
    currentlyVisibleState = <Homepage {...props}/>; buttonText = "Go To Your Food List";
  } else if (history.location.pathname === "/add-food-item") {
    currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={handleAddingNewFoodItemToList} userId={userId} />;
    buttonText = "Cancel";
    buttonClass = "btn btn-secondary btn-sm";
  } else if (history.location.pathname === "/yourstats") {
    currentlyVisibleState = <YourStats userId={userId}/>
    buttonText = "See Food List";
  // } else if (history.location.pathname === "/login") {
  //   currentlyVisibleState = <Signin />
  } else {
    currentlyVisibleState = <FoodItemList {...props} foodItemList={foodItems} onFoodItemSelection={handleChangingSelectedFoodItem} userId={userId} />;
    buttonText = "Add Food Item";
  }
  //console.log("state", state, isShowing)

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <br></br>
      <button style={{display: loginName !== "Not signed in" ? 'inline-block' : "none"}} className={buttonClass} onClick={handleClick}>{buttonText}</button>
      {/* <Signin data={state} proppy={props} /> */}
      <Footer data={state} proppy={props} />
    </React.Fragment>
  );
  // } else {
  //   return (
  //     <React.Fragment>
  //     {currentlyVisibleState}
  //     <h3>Please sign in to access your pages</h3>
  //     </React.Fragment>
  //   )
  // }

}
// }
FoodItemControl.propTypes = {
  masterFoodItemList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool,
  selectedFoodItem: PropTypes.object,
  showModal: PropTypes.bool,
  loginName: PropTypes.string
};

const mapStateToProps = state => {
  //console.log("state", state)
  return {
    // masterFoodItemList: state.masterFoodItemList,
    // formVisibleOnPage: state.formVisibleOnPage,
    // editing: state.editing,
    //selectedFoodItem: state.selectedFoodItem,
    // isShowing: state.isShowing,
  }
}

FoodItemControl = withRouter(connect(mapStateToProps)(FoodItemControl));

export default withFirestore(FoodItemControl);