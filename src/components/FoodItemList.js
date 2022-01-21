import React, { useEffect, useState } from 'react';
import FoodItem from "./FoodItem";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty, withFirestore } from 'react-redux-firebase';
import { masterFoodList } from "../actions";
import { propTypes } from "react-bootstrap/esm/Image";
import * as a from '../actions';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Link, useHistory } from 'react-router-dom';


function FoodItemList(props) {
  const { userId, loginName, dispatch } = props;
  const [uId, setUId] = useState(null);
  const [login, setLogin] = useState("Not signed in");
  const u = window.localStorage.getItem('uId')
  console.log('list', props, u)
  const history = useHistory();
  const state = useSelector(state => state);

  useEffect(() => {
    (async () => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          const { dispatch } = props;
          if (user) {
            dispatch(a.signInName(user.email));
            dispatch(a.userId(user.uid));
            window.localStorage.setItem('uId', user.uid);
          }
        })
      } catch (error) {
        alert(error);
      }
      console.log("Home component did mount")
    })();
  }, [])

  useEffect(() => {
    try {
      setUId(JSON.parse(window.localStorage.getItem('uId')));
      setLogin(JSON.parse(window.localStorage.getItem('email')));
    } catch(error) {
      console.log(error);
      return undefined;
    }
  }, []);
  
  async function getUserId() {
    const answer = await JSON.parse(window.localStorage.getItem('uId'));
    return answer;
  }
  // useEffect(() => {
  //   window.localStorage.setItem('uId', uId);
  // }, [uId]);

  useFirestoreConnect([
    {
      collection: 'users', doc: userId,
      subcollections: [{ collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }], storeAs: 'foodItems'
    }
  ]);
  const foodItems = useSelector(state => state.firestore.ordered.foodItems);

  const convertDate = (date) => {
    let month = date.toDateString().substring(7, 4);
    let day = date.toDateString().substring(10, 8);
    let year = date.toDateString().substring(15, 11);
    let n = date.toDateString().substring(15, 3);
    return month + "-" + day + "-" + year;
  }
  useEffect(() => {
    addMasterFoodList(foodItems);
  }, []);

  const addMasterFoodList = (list) => {

    dispatch(a.masterFoodList(list));
  };

  const handleChangingSelectedFoodItem = (id) => {
    props.firestore.get({ collection: 'users', doc: userId, subcollections: [{ collection: 'foodItems', doc: id }] }).then((foodItem) => {
      const firestoreFoodItem = {
        foodName: foodItem.get("foodName"),
        brand: foodItem.get("brand"),
        ingredients: foodItem.get("ingredients"),
        heartburn: foodItem.get("heartburn"),
        timeOpen: foodItem.get("timeOpen"),
        id: foodItem.id
      }
      const path = '/foodItem/' + firestoreFoodItem.id;
      dispatch(a.selectFoodItem(firestoreFoodItem))
      dispatch(a.history(path))
      console.log('aaaaaaaaaa', firestoreFoodItem)
      console.log("updatedddddddddddddddd", state, props)
    });
  }

  console.log("listy", props, state, foodItems, typeof u);
  console.log("loaded", isLoaded(foodItems))



  //   if (!isLoaded(foodItems)) {
  //   return (
  //     <React.Fragment>
  //       <h3>Loading...</h3>
  //     </React.Fragment>
  //   )
  // }

  //else if (isLoaded(foodItems)) {
    console.log('id', uId, userId, login, foodItems, isLoaded(foodItems) && foodItems && foodItems.length === 0)
  if (userId !== null && foodItems !== undefined) {
    let mapFoodItems = foodItems.map((foodItem) => {
      let date = foodItem.timeOpen === null ? new Date() : new Date((foodItem.timeOpen.nanoseconds / 1000000) + (foodItem.timeOpen.seconds * 1000));
      return <FoodItemList
        foodName={foodItem.foodName}
        ingredients={foodItem.ingredients}
        heartburn={foodItem.heartburn}
        timeOpen={date}
        id={foodItem.id}
        key={foodItem.id} />
    })
    
    return (
      <React.Fragment>
        <h2>Your Recorded Food List</h2>
        <table className="Table-mobile-large">
          <tbody>
            <tr className="tableHeader">
              <th className="headerName">Food Item</th>
              <th className="headerIngredients">Ingredients</th>
              <th className="headerHeartburn">Heartburn</th>
              <th className="headerDate">Date Opened</th>
              <th className="headerDetails">Details</th>
            </tr>

            {mapFoodItems.map((foodItem) => {
              return <FoodItem
                whenFoodItemClicked={handleChangingSelectedFoodItem}
                userId={uId}
                foodName={foodItem.props.foodName}
                ingredients={foodItem.props.ingredients}
                heartburn={foodItem.props.heartburn}
                timeOpen={convertDate(foodItem.props.timeOpen)}
                id={foodItem.props.id}
                key={foodItem.props.id} />
            })}
          </tbody>
        </table>
        <hr />
        <Link className='btn btn-info btn-sm' to='/add-food-item'>
          Add Food Item
        </Link>
      </React.Fragment>
    );
  // } else if(isLoaded(foodItems) && foodItems && foodItems.length === 0) {
  //   return (
  //     <React.Fragment>
  //     <h3>Add food items to see them in the list.</h3>
  //     </React.Fragment>
  //   )
  // }
          }  if (isEmpty(foodItems)) {
            return (
              <React.Fragment><span>No food items have been entered in your list.</span>
              </React.Fragment>
            )
          }
  else {
    // if (foodItems === undefined || userId === null) {
      return (
        <React.Fragment>
          <h3>Loading...</h3>
        </React.Fragment>
      )
    }
  

  // if (isEmpty(foodItems)) {
  //   return (
  //     <React.Fragment><span>No food items have been entered in your list.</span>
  //     </React.Fragment>
  //   )
  // }
}

FoodItemList.propTypes = {
  userId: PropTypes.string,
  firestore2: PropTypes.object,
  loginName: PropTypes.string,
  selectedFoodItem: PropTypes.object,
  editing: PropTypes.bool,
  foodItems: PropTypes.array,
  masterFoodList: PropTypes.object,
  history: PropTypes.string,
};

const mapStateToProps = state => ({
  userId: window.localStorage.getItem('uId'),
  firestore2: state.firestore,
  loginName: window.localStorage.getItem('email'),
  selectedFoodItem: state.selectedFoodItem,
  editing: state.editing,
  foodItems: state.firestore.ordered.foodItems,
  masterFoodList: state.masterFoodItemList,
  //history: state.history,
});

FoodItemList = connect(mapStateToProps)(FoodItemList);

export default withFirestore(FoodItemList);
