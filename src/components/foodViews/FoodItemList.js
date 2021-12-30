import React from "react";
import FoodItem from "./FoodItem";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function FoodItemList(props) {
  
  //console.log("listy", props);
  useFirestoreConnect([
    {
      collection: 'users', doc: props.userId.userId,
      subcollections: [{ collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }], storeAs: 'foodItems'
    }
  ]);

  // useFirestoreConnect([
  //   { collection: 'foodItems', orderBy: ['timeOpen', 'desc'] }
  // ]);
  //console.log("item", props)
  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  const firestate = useSelector(state => state.firestore);
  console.log("fire", firestate, props)
  const convertDate = (date) => {
    let month = date.toDateString().substring(7, 4);
    let day = date.toDateString().substring(10, 8);
    let year = date.toDateString().substring(15, 11);
    let n = date.toDateString().substring(15, 3);
    return month + "-" + day + "-" + year;
  }

  if (!isLoaded(foodItems)) {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }

  if (isLoaded(foodItems)) {
    console.log("list", props, foodItems)
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
              //console.log("hey", foodItem.props.timeOpen);
              return <FoodItem
                whenFoodItemClicked={props.onFoodItemSelection}
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
  onFoodItemSelection: PropTypes.func
};

export default FoodItemList;
