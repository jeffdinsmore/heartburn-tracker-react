import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from "prop-types";

const YourStats = (props) => {
  const id = useSelector(state => state.userId.userId) 

  // useFirestoreConnect([
  //   {
  //     collection: 'users', doc: props.userId.userId,
  //     subcollections: [{ collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }], storeAs: 'foodItems'
  //   }
  // ]);

  // Create a query against the collection
  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  let heartburnItems, noHeartburnItems, heartburnArray, noHeartburnArray, comparison, heartburnArrayCombined, noHeartburnArrayCombined;
  let heartburnObject = {};
  let noHeartburnObject = {};

  const splitArray = (array) => {
    return array.map(e => e.ingredients.split(",")).map(f => f.map(g => {
      if (g.charAt(0) === " ") {
        return g.slice(1);
      } else {
        return g;
      }
    }));
  }
  
  const objectFilter = (array, value) => {
    let object = {};
    for (let i = 0; i < array.length; i++) {
      if (object[array[i]]) {
        object[array[i]] += 1;
      } else {
        object[array[i]] = 1;
      }
    }
    let keys = Object.keys(object);
    let values = Object.values(object)
    for (let i = 0; i < keys.length; i++) {
      if (values[i] === 1 && value === 1) {
        delete object[keys[i]];
      }
    }
    return object;
  }

  const flatten = (array) => {
    return array.reduce((acc, curVal) => {
      return acc.concat(curVal)
    }, []);
  }

  const compareArrays = (heartburnArray, noHeartburnArray, heartburnObject) => {
    let array = [];
    for (let i = 0; i < heartburnArray.length; i++) {
      if (noHeartburnArray.indexOf(heartburnArray[i]) !== -1) {
        array.push([heartburnArray[i], heartburnObject[heartburnArray[i]]]);
      }
    }
    // return [...new Set(array)];
    return array;
  }

  const sortObjectIntoArray = (object) => {
    return Object.entries(object).sort(([,a], [,b]) => b - a);
  }
  

  useEffect(() => {
    console.log("component updated")
  });

  if (props.masterFoodList !== undefined) {
    heartburnItems = foodItems.filter(f => f.heartburn === "Yes");
    noHeartburnItems = foodItems.filter(f => f.heartburn === "No");
    heartburnArray = splitArray(heartburnItems);
    noHeartburnArray = splitArray(noHeartburnItems);
    heartburnArrayCombined = flatten(heartburnArray);
    noHeartburnArrayCombined = flatten(noHeartburnArray);
    heartburnObject = objectFilter(heartburnArrayCombined, 1);
    noHeartburnObject = objectFilter(noHeartburnArrayCombined, 2);
    comparison = compareArrays(Object.keys(heartburnObject), noHeartburnArrayCombined, noHeartburnObject);
  }

  function createList(item, index, arr) {
    arr[index] = <li key={index} className="stats"><strong>{item[0]} - {item[1]}</strong></li>;
  }

  function loadingFirestore(foodItems, array) {
    if (isLoaded(foodItems)) {
      array.forEach(createList);
      return array;
    } 
    if(!isLoaded(foodItems)) {
      return <h3>Loading...</h3>;
    }
    if(isEmpty(foodItems)) {
      return <h3>You have not entered any food items yet.</h3>;
    } 
  }
  function sortArray(array) {
    if (isLoaded(foodItems)) {
      return array.sort(([,a], [,b]) => b - a);
    } else {
      return array;
    }
  }
  return (
    <React.Fragment>
      <h2>Your stats</h2>
      <p>Here are the food ingredients that may be causing your heartburn:</p>
      {loadingFirestore(foodItems, sortObjectIntoArray(heartburnObject))}
      {/* {loadingFirestore(foodItems, Object.keys(heartburnObject))} */}
      <br />
      <p>Ingredients that are unlikely to give you heartburn from the list above. They are in your food list that did not give you heartburn:</p>
      {/* {LoopingMultipleArrays(heartburnArray)} */}
      {loadingFirestore(foodItems, sortArray(comparison))}
      {/* .sort(([,a], [,b]) => b - a) */}
    </React.Fragment>
  );
}

YourStats.propTypes = {
  onFoodItemSelection: PropTypes.func
};

export default YourStats;

