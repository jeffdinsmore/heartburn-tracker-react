// import React, { useEffect } from 'react';
// import NewFoodItemForm from './foodViews/NewFoodItemForm';
// import FoodItemList from './foodViews/FoodItemList';
// import FoodItemDetail from './foodViews/FoodItemDetail';
// import EditFoodItemForm from './foodViews/EditFoodItemForm';
// import Homepage from './Homepage';
// //import YourStats from './YourStats';
// import { connect } from 'react-redux';
// import PropTypes from "prop-types";
// import * as a from './../actions';
// import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
// import firebase, { db, auth, firebased, analytics, getAuth, onAuthStateChanged } from 'firebase';
// //import { propTypes } from 'react-bootstrap/esm/Image';
// import { useSelector } from 'react-redux';
// import Signin from './auth/Signin';
// import Header from './layout/Header';
// import Footer from './Footer'
// import { createBrowserHistory } from 'history';
// import { withRouter, useRouteMatch, useHistory, Link } from 'react-router-dom';
// import YourStats from './foodViews/YourStats';
// import 'firebase/firestore';
// import Nav from 'react-bootstrap/Nav';
// import { Button, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
// // const firebase = require("firebase/firebase");
// // // Required for side-effects
// // require("firebase/firestore");


// function FoodItemControl(props) {

//   const db = firebase.firestore();
//   const dbFoodItems = [];
//   //const { history } = props;
//   //const history = useHistory();
//   const state = useSelector(state => state);
//   useEffect(() => {
//     (async () => {
//       try {
//         firebase.auth().onAuthStateChanged((user) => {
//           const { dispatch } = props;
//           //const action = a.signInName();

//           if (user) {
//             //console.log("fdfd", user.email)
//             // if (signInName === "Signed out" || signInName === "Not signed in") {
//             dispatch(a.signInName(user.email));
//             dispatch(a.userId(user.uid));
//             getData(user.uid)
//             //console.log("s", state, props)
//           }
//           // } else {
//         })
//       } catch (error) {
//         alert(error);
//         // } finally {
//         // }
//       }
//     })();
//   }, [])

//   useEffect(() => {
//     const subscriber = db.collection('foodItems')
//       .onSnapshot((querySnapshot) => {
//         querySnapshot.forEach((doc, i) => {
//           dbFoodItems.push({
//             ...doc.data(), key: doc.id,
//           })
//         })
//       })

//       ;
//     return () => subscriber();
//   }, [])
//   useEffect(() => {
    
//   })
  
//   const pathName = useSelector(state => state.history.path)
//   const userId = useSelector(state => state.userId);
//   async function getData(userid) {
//     //console.log("get", userid)
//     const ref = await firebase
//       .firestore()
//       // .get({ collection: 'users', doc: userid, subcollections: [{ collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }], storeAs: 'foodItems'
//       //   })
//       // ]);
//     //}
//       .collection("users")
//       .doc(userid)
//       .collection('fooditems')
//       .doc()
//       .get()
//       // .listCollections()
//       // .then(collections => collections.forEach(collection => {
//       //   console.log('Found subcollection with id: ', collection.id)
//       // }))
//       //console.log('get', ref)
//     //const snapshot = await ref.get();
//     console.log('get', ref)
//     // ref.forEach(doc => {
//     //   console.log("11111", doc.id, '=>', doc.data());
//     // });
//   // })
// }

//   const addFoodList = (list) => {
//     const { dispatch } = props;
//     dispatch(a.masterFoodList(list));
//   }
  
//   const history = createBrowserHistory();
//   const firestore = useSelector(props => props.firestore)
//   const foodItems = useSelector(state => state.firestore.ordered.foodItems);
//   const editing = useSelector(state => state.editing)
//   const showModal = useSelector(state => state.showModal);
//   const masterFoodItemList = useSelector(state => state.masterFoodItemList);
//   const formVisibleOnPage = useSelector(state => state.formVisibleOnPage);
//   const loginName = useSelector(state => state.loginName.user);
//   const selectedFoodItem = useSelector(state => state.selectedFoodItem)
//   useEffect(() => {
//     console.log("component updated!");
//   }, [])
//   useEffect(() => {
//     console.log("upadted")
//     const { dispatch } = props;
//     dispatch(a.masterFoodList(foodItems));
//   }, [])

//   const getUserData = () => {

//   }




//   const handleClick = (selected) => {
//     const id = selected ? selected.id : null;
//     console.log("history", history.location.pathname, state)
//     const { dispatch } = props;
//     const action = a.toggleForm();
//     const action2 = a.editing();
//     const action3 = a.unSelectFoodItem();

//     dispatch(a.masterFoodList(foodItems))
//     //const action4 = a.togglefooditemlistShowing()

//     if (loginName === "Not signed in") {
//       history.push('/add-food-item')
//     } else if (history.location.pathname === '/foodlist') {
//       history.push('/add-food-item')
//     } else if (history.location.pathname === '/edit/foodItem/' + id) {
//       console.log("jjjjj")
//       history.push('/foodItem/' + id)
//       dispatch(action2)
//     } else if (history.location.pathname === '/') {
//       history.push('/foodlist')
//     } else if (history.location.pathname === '/yourstats') {
//       history.push('/foodlist')
//     } else if (history.location.pathname == '/foodItem/') {
//       history.push('/foodlist')
//       dispatch(action3);
//     } else if (history.location.pathname === '/add-food-item') {
//       dispatch(action)
//       if (selectedFoodItem !== null) {
//         history.push('/foodlist')
//       } else {
//         if(editing) {
//           history.push('/');
//         } else {
//           history.goBack()
//         }
        
//       }

//     }
//     // else {
//     //   history.push('/foodlist')
//     // }
//     //history.push('/addfooditem')
//     //console.log("eeee", editing, props)
//     if (selectedFoodItem != null) {
//       let id = selectedFoodItem.id
//       if (history.location.pathname === '/edit/foodItem/' + id) {
//         history.push('/add-food-item')
//       }
//       // if (editing) {


//       //   dispatch(action2);
//       // }
//       //dispatch(action3);
//       //setSelectedFoodItem(null);
//       //setState({selectedFoodItem: null})
//       //console.log("ppp", state, props, state.selectedFoodItem)
//     } else {
//       dispatch(action);
//       //console.log("jjj", state.selectedFoodItem)
//       // dispatch(action3);
//     }
//   }

//   const handleShowingModal = () => {
//     const { dispatch } = props;
//     const action = a.showModal();
//     if (selectedFoodItem !== null) {
//       dispatch(action);
//       dispatch(a.signInName("sherry"))
//     }
//   }

//   const handleCancelModal = () => {
//     console.log("Modal canceled")
//     const { dispatch } = props;
//     const action = a.showModal();
//     if (showModal) {
//       dispatch(action);
//     }
//   }

//   const handleAddingNewFoodItemToList = () => {
//     const { dispatch } = props;
//     const action = a.toggleForm();
//     dispatch(action);
//     history.goBack();
//   }

//   const handleChangingSelectedFoodItem = (id) => {
//     // props.firestore.get({ collection: 'foodItems', doc: id }).then((foodItem) => {
//     // {
//     //   collection: 'users', doc: props.userId.userId,
//     //   subcollections: [{ collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }], storeAs: 'foodItems'
//     // }

//     const { dispatch } = props;
//     //const action = a.selectFoodItem();
//     props.firestore.get({ collection: 'users', doc: userId.userId, subcollections: [{ collection: 'foodItems', doc: id }] }).then((foodItem) => {
//       const firestoreFoodItem = {
//         foodName: foodItem.get("foodName"),
//         brand: foodItem.get("brand"),
//         ingredients: foodItem.get("ingredients"),
//         heartburn: foodItem.get("heartburn"),
//         timeOpen: foodItem.get("timeOpen"),
//         id: foodItem.id
//       }
//       // const name = firestoreFoodItem.foodName.split(" ").join("");
//       const path = '/foodItem/' + firestoreFoodItem.id;
//       //console.log('ppppppppppppp', path)
//       dispatch(a.selectFoodItem(firestoreFoodItem))
//       dispatch(a.history(path))
//       //history.push('/foodItem/' + firestoreFoodItem.id)
//       console.log(state)
//       // .foodName, firestoreFoodItem.brand, firestoreFoodItem.ingredients, firestoreFoodItem.heartburn, firestoreFoodItem.timeOpen, firestoreFoodItem.id))
//       // //setState({selectedFoodItem: firestoreFoodItem});
//     });
//     history.push('/foodItem/')
//     // setCount(count + 1);
//     //console.log("joey")
//   }

//   const handleDeletingFoodItem = (id) => {
//     const { dispatch } = props;
//     const action = a.unSelectFoodItem();
//     const action2 = a.showModal();
//     props.firestore.delete({ collection: 'users', doc: userId.userId, subcollections: [{ collection: 'foodItems', doc: id }] });
//     dispatch(action);
//     dispatch(action2);
//     //setState({selectedFoodItem: null});
//   }


//   const handleEditingFoodItemInList = () => {
//     const { dispatch } = props;
//     const action = a.editing();
//     const action2 = a.unSelectFoodItem();
//     dispatch(action);
//     dispatch(action2);
//     //history.push()
//     //setState({selectedFoodItem:null});
//   }

//   const handleEditClick = (foodItem) => {
//     console.log("handleEditClick reached!");
//     const { dispatch } = props;
//     console.log("handleEdit", state, props, foodItem)
//     const action = a.editing();
//     dispatch(action);

//     history.push('/edit/foodItem/' + foodItem.id)
//   }

//   const handleClickSignin = () => {
//     const { dispatch } = props;
//     const action = a.signInName;
//     if (loginName === "Signed out" || loginName === "Not signed in") {
//       dispatch(action);
//     }
//   }

//   const handleUnselectFoodItem = () => {
//     const { dispatch } = props;
//     const action = a.unSelectFoodItem;
//     dispatch(action);
//   }
//   // const auth = this.props.firebase.auth();
//   // if (!isLoaded(auth)) {
//   //   return (
//   //     <React.Fragment>
//   //       <h1>Loading...</h1>
//   //     </React.Fragment>
//   //   )
//   // }
//   // if ((isLoaded(auth)) && (auth.currentUser == null)) {
//   //   return (
//   //     <React.Fragment>
//   //       <h1>You must be signed in to access the queue.</h1>
//   //     </React.Fragment>
//   //   )
//   // }
//   console.log("mast1", state, props, pathName, history.location.pathname)
//   let currentlyVisibleState = null;
//   let buttonText = null;
//   let buttonClass = "btn btn-info btn-sm";
//   let buttonNav = '/foodlist';
//   let buttonWidth = '111px';
//   //const auth = props.firebase.auth();
//   // if ((isLoaded(auth)) && (auth.currentUser != null)) {
//   console.log(isLoaded(db))
//   //if (isLoaded(db)) {
//   if(userId.userId !== null) {

//     //if (history.location.pathname.slice(0,15) === '/edit/foodItem/') {
//       if(editing) {
//       console.log('aaaaaaaaaa')
//       currentlyVisibleState = <EditFoodItemForm foodItem={selectedFoodItem} onEditFoodItem={handleEditingFoodItemInList} userId={userId} />
//       buttonClass = "btn btn-secondary btn-sm";
//       buttonText = "Cancel";
//       console.log("current", currentlyVisibleState)
//     } else if (history.location.pathname === '/foodItem/' && selectedFoodItem !== null) {
//       console.log('bbbbbbbbb')
//     //} else if(pathName !== null && pathName.slice(0,10) === '/foodItem/') {
//       currentlyVisibleState = <FoodItemDetail foodItem={selectedFoodItem} onClickingDelete={handleDeletingFoodItem} onClickingModal={handleShowingModal} onClickingEdit={handleEditClick} onClickingCancel={handleCancelModal} showModal={showModal} />
//       buttonText = "Return to Food List";
//       buttonWidth = '145px';
//       // } else if (formVisibleOnPage) {
//       //   currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={handleAddingNewFoodItemToList} />;
//       //   buttonText = "Return to Food List";
//     } else if (history.location.pathname === '/foodlist') {
//       console.log('s,s', showModal, selectedFoodItem)
//       if(showModal) {
//         console.log("s", showModal)
//         {handleCancelModal()}
//       }
//       if(selectedFoodItem !== null) {
//         console.log(selectedFoodItem)
//         {handleUnselectFoodItem()}
//       }
//       currentlyVisibleState = <FoodItemList {...props} foodItemList={foodItems} onFoodItemSelection={handleChangingSelectedFoodItem} userId={userId} addMasterFoodList={addFoodList} foodItems={foodItems} />;
//       buttonText = "Add Food Item";
//       buttonNav = '/add-food-item';
//     } else if (history.location.pathname === "/add-food-item") {
//       console.log('cccccccccccc')
//       currentlyVisibleState = <NewFoodItemForm onNewFoodItemCreation={handleAddingNewFoodItemToList} userId={userId} />;
//       buttonText = "Cancel";
//       buttonClass = "btn btn-secondary btn-sm";
//       buttonWidth = '59px';
//     } else if (history.location.pathname === "/yourstats") {
//       console.log('ddddddddddddddddd')
//       currentlyVisibleState = <YourStats userId={userId} masterFoodList={foodItems} />
//       buttonText = "See Food List";
//       // } else if (history.location.pathname === "/login") {
//       //   currentlyVisibleState = <Signin />
//     } else {
//       console.log('eeeeeeeeeeeeeeeee')
//       currentlyVisibleState = <Homepage {...props} />; 
//       buttonText = "Go To Your Food List";
//       buttonWidth = '145px';
//     }
//   } else {
//     currentlyVisibleState = "Loading"
//   }
//   //console.log("state", state, isShowing)
//   console.log("button", buttonNav)
//   return (
//     <React.Fragment>
//       {currentlyVisibleState}
//       <br></br>
//       <button style={{ display: loginName !== "Not signed in" ? 'inline-block' : "none" }} className={buttonClass} onClick={() => handleClick(selectedFoodItem)}>{buttonText}</button>
//       {/* <Signin data={state} proppy={props} /> */}

//       <Nav.Link as={Link} className={buttonClass} style={{color:'white', marginLeft: "10px", padding: '4px 10px', display: loginName !== "Not signed in" ? 'inline-block' : "none" }} to={buttonNav}>
//         {buttonText}
// </Nav.Link>
//       <Footer data={state} proppy={props} />
//     </React.Fragment>
//   );
//   // } else {
//   //   return (
//   //     <React.Fragment>
//   //     {currentlyVisibleState}
//   //     <h3>Please sign in to access your pages</h3>
//   //     </React.Fragment>
//   //   )
//   // }

// }
// // }
// FoodItemControl.propTypes = {
//   masterFoodItemList: PropTypes.object,
//   formVisibleOnPage: PropTypes.bool,
//   editing: PropTypes.bool,
//   selectedFoodItem: PropTypes.object,
//   showModal: PropTypes.bool,
//   loginName: PropTypes.string,
//   history: PropTypes.string
// };

// const mapStateToProps = () => {
//   return {
//   }
// }

// FoodItemControl = connect(mapStateToProps)(FoodItemControl);

// export default withFirestore(FoodItemControl);