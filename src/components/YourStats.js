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
  let noHeartburnItems;
  let arrays;
  let heartburnArray;
  let noHeartburnArray;
  let count3;
  let count4 = 0;
  let array2;
  let comparison;
  let comparison2;

  if (isLoaded(foodItems)) {
    heartburnItems = foodItems.filter(f => f.heartburn == "Yes");
    noHeartburnItems = foodItems.filter(f => f.heartburn == "No");
    
    arrays = [];
    heartburnArray = [];
    noHeartburnArray = [];

    count3 = heartburnItems.length;
    function splitArray(array) {
      return array.map(e => e.ingredients.split(","));
    }
    heartburnArray = splitArray(heartburnItems);
    noHeartburnArray = splitArray(noHeartburnItems);

  }
  
  function LoopingMultipleArrays(array) {
    array2 = [];
    if (isLoaded(foodItems)) {
      for (let i = 0; i < array.length; i++) {
        console.log("i", i);
        count3 = count3 - 1;
        for (let j = 0; j < count3; j++) {
          console.log("count3", count3);
          if (count4 === array.length-1) {
            count4 = i + 1;
          } else {
            count4++;
          }
          for (let k = 0; k < array[i].length; k++) {
            console.log("count4", count4);
            for (let e = 0; e < array[count4].length; e++) {
                if (array[i][k] === array[count4][e]) {
                  array2.push(array[i][k]);
                }
              }
            }
          }
        }
      return array2;
    }
  }
  LoopingMultipleArrays(heartburnArray);
  if (isLoaded(foodItems)) {
    comparison = [];
  for (let e = 0; e < noHeartburnArray.length; e++) {
    for(let i = 0; i < array2.length; i++) {
      for (let j = 0; j < noHeartburnArray[e].length; j++) {
        if (array2[i] === noHeartburnArray[e][j]) {
          comparison.push(array2[i]);
        }
      }
    }
  }
  comparison2 = [...new Set(comparison)];
  }
  let counts = {};
  if (isLoaded(foodItems)) {
    
    for (var i = 0; i < array2.length; i++) {
      let num = array2[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    
    console.log(counts);
    let j = array2.indexOf(" spices");
  console.log("get", j);
  }
  
  
  function myFunction(item, index, arr) {
    arr[index] = <li className="stats"><strong>{item}</strong></li>;
  }

  function loadingFirestore(foodItems, array) {
    if (isLoaded(foodItems)) {
      array.forEach(myFunction);
      // for (let i = 0; i < boom.length; i++) {
      return array;
      // }
    } else {
      return <h3>Loading...</h3>;
    }
  }
  
  return (
    <React.Fragment>
      <h2>Your stats</h2>
      <p>Here are the food ingredients that may be causing your heartburn:</p>
      {loadingFirestore(foodItems, array2)}
      <br />
      <p>Ingredients that are unlikely to give you heartburn on the list above:</p>
      {/* {LoopingMultipleArrays(heartburnArray)} */}
      {loadingFirestore(foodItems, comparison2)}
    </React.Fragment>
  );
}

YourStats.propTypes = {
  onFoodItemSelection: PropTypes.func
};

export default YourStats;