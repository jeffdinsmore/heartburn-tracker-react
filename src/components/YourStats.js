import React from 'react';
// import FoodItem from "./FoodItem";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from "prop-types";

function YourStats(props) {
  useFirestoreConnect([
    { collection: 'foodItems' }
  ]);

  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  let heartburnItems;
  let arrays;
  let heartburnArray;
  let count3;
  let count4 = 0;
  let array2;
  
  if (isLoaded(foodItems)) {
    heartburnItems = foodItems.filter(f => f.heartburn == "Yes");
    arrays = [];
    heartburnArray = [];
    array2 = [];
    count3 = heartburnItems.length;
    for (let i = 0; i < heartburnItems.length; i++) {
      heartburnArray.push(heartburnItems[i].ingredients.split(","))
    }
  }
}

YourStats.propTypes = {
  onFoodItemSelection: PropTypes.func
};

export default YourStats;