import React, { useEffect } from 'react';
import FoodItem from "./FoodItem";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty, withFirestore } from 'react-redux-firebase';
import { masterFoodList } from "../../actions";
import { propTypes } from "react-bootstrap/esm/Image";
import * as a from '../../actions';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import firebase from 'firebase';


function FoodItemList(props) {
  const { userId, loginName, dispatch } = props;
  
  console.log('list', props, )
  const history = createBrowserHistory();
  //const userId = useSelector(state => state.userId.userId);
  const state = useSelector(state => state);
  // const ref = firebase.firestore().collections('users').doc(userId).collections('foodItems');

  // function getFoodItems() {
  //   ref.onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     console.log(items)
  //     dispatch(a.masterFoodList(items))
  //   })
  // }

  useEffect(() => {
    //getFoodItems();
  }, [])
  
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
    //const { dispatch } = props;
    dispatch(a.masterFoodList(list));
  };

  const handleChangingSelectedFoodItem = (id) => {
    //const { dispatch } = props;
    //const action = a.selectFoodItem();
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
      //console.log('ppppppppppppp', path)
      dispatch(a.selectFoodItem(firestoreFoodItem))
      dispatch(a.history(path))
      console.log('aaaaaaaaaa', firestoreFoodItem)
      //history.push('/foodItem/' + firestoreFoodItem.id)
      
      // .foodName, firestoreFoodItem.brand, firestoreFoodItem.ingredients, firestoreFoodItem.heartburn, firestoreFoodItem.timeOpen, firestoreFoodItem.id))
      // //setState({selectedFoodItem: firestoreFoodItem});
      console.log("updatedddddddddddddddd", state, props)
    //history.push('/foodItem')
    });
    
    // setCount(count + 1);
    //console.log("joey")
  }
  console.log("listy", props, state, foodItems);
  console.log("loaded", isLoaded(foodItems))

  //if (loginName === "Not signed in") {
    if(foodItems === undefined) {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }

  //   if (!isLoaded(foodItems)) {
  //   return (
  //     <React.Fragment>
  //       <h3>Loading...</h3>
  //     </React.Fragment>
  //   )
  // }

  //else if (isLoaded(foodItems)) {
  else if(userId !== null && foodItems !== undefined) {
    let mapFoodItems = foodItems.map((foodItem) => {
      let date = foodItem.timeOpen === null ? new Date() : new Date((foodItem.timeOpen.nanoseconds / 1000000) + (foodItem.timeOpen.seconds * 1000));
      return <FoodItemList
        // whenFoodItemClicked={props.onFoodItemSelection}
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
                userId={userId}
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
      </React.Fragment>
    );
  }

  if (isEmpty(foodItems)) {
    return (
      <React.Fragment><span>No food items have been entered in your list.</span>
      </React.Fragment>
    )
  }
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
  userId: state.userId.userId,
  firestore2: state.firestore,
  loginName: state.loginName.user,
  selectedFoodItem: state.selectedFoodItem,
  editing: state.editing,
  foodItems: state.firestore.ordered.foodItems,
  masterFoodList: state.masterFoodItemList,
  history: state.history,
});

FoodItemList = connect(mapStateToProps)(FoodItemList);

export default withFirestore(FoodItemList);
