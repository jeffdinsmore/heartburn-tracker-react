import React from "react";
import FoodItem from "./FoodItem";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function FoodItemList(props) {
  useFirestoreConnect([
    { collection: 'tickets' }
  ]);
  
  const foodItems = useSelector(state => state.firestore.ordered.tickets);
  console.log("food Items: ", foodItems);
  if (isLoaded(foodItems)) {
    return (
      <React.Fragment>
        <hr />
        {foodItems.map((foodItem) => {
          return <FoodItem
            whenFoodItemClicked={props.onFoodItemSelection}
            names={foodItem.names}
            location={foodItem.location}
            issue={foodItem.issue}
            id={foodItem.id}
            key={foodItem.id} />
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

FoodItemList.propTypes = {
  // foodItemList: PropTypes.object,
  onFoodItemSelection: PropTypes.func
};

export default FoodItemList;