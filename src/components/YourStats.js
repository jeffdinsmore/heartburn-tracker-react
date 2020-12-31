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

    for (let i = 0; i <= heartburnArray.length; i++) {
      count3 = count3 - 1;
      for (let j = 0; j < count3; j++) {
        console.log("car", count4);
        if (count4 === heartburnArray.length) {
          count4 = heartburnArray.length - 1;
        } else {
          count4++;
        }
        for (let k = 0; k < heartburnArray[i].length; k++) {
          console.log("count4", count4);
          if (count4 >= heartburnArray.length) {
            count4 = heartburnArray.length - 1;
          } else {
            for (let e = 0; e < heartburnArray[count4].length; e++) {
              if (heartburnArray[i][k] === heartburnArray[count4][e]) {
                array2.push(heartburnArray[i][k]);
              }
            }
          }
        }
      }
    }
  }

  function myFunction(item, index, arr) {
    arr[index] = item + ",";
  }

  function loadingFirestore(foodItems) {
    if (isLoaded(foodItems)) {
      console.log(array2.forEach(myFunction));
      // for (let i = 0; i < boom.length; i++) {
      return array2;
      // }
    } else {
      return <h3>Loading...</h3>;
    }
  }

  return (
    <React.Fragment>
      <h2>Your stats</h2>
      <p>Here are the food ingredients that may be causing your heartburn:</p>
      {loadingFirestore(foodItems)}
    </React.Fragment>
  );
}

YourStats.propTypes = {
  onFoodItemSelection: PropTypes.func
};

export default YourStats;