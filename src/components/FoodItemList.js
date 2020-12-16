import React from "react";
import FoodItem from "./FoodItem";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function FoodItemList(props) {
  useFirestoreConnect([
    { collection: 'foodItems' }
  ]);
  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  if (isLoaded(foodItems)) {
    return (
      <React.Fragment>
        <hr />
        {foodItems.map((foodItem) => {
          return <FoodItem
            whenFoodItemClicked={props.onFoodItemSelection}
            foodName={foodItem.foodName}
            ingredients={foodItem.ingredients}
            heartburn={foodItem.heartburn}
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