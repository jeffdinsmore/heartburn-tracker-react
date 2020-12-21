import React from 'react';
import FoodItem from "./FoodItem";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from "prop-types";

function Homepage(props) {
  useFirestoreConnect([
    { collection: 'foodItems' }
  ]);
  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  let heartburnItems;
  if (isLoaded(foodItems)) {
    heartburnItems =  foodItems.filter(f => f.heartburn == "Yes");
  }
  
  console.log("output", heartburnItems);
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

Homepage.propTypes = {
  onFoodItemSelection: PropTypes.func
};

export default Homepage;