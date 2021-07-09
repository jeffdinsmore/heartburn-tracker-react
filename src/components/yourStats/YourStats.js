import React from 'react';
// import FoodItem from "./FoodItem";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from "prop-types";

function YourStats(props) {
  useFirestoreConnect([
    { collection: 'foodItems' }
  ]);
  // Create a reference to the cities collection
const citiesRef = useSelector(state => state.firestore.ordered.foodItems);

// Create a query against the collection

  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  let heartburnItems, noHeartburnItems, heartburnArray, noHeartburnArray, count3, comparison, comparison2, array2, array3, countedIngredients;
  let arrays = [];
  let count4 = 0;
  // let obj = {};

  if (isLoaded(foodItems)) {
    // console.log("state", citiesRef)
    // const queryRef = citiesRef.where('heartburn', '==', 'Yes');
    heartburnItems = foodItems.filter(f => f.heartburn == "Yes");
    noHeartburnItems = foodItems.filter(f => f.heartburn == "No");
    // arrays = [];
    heartburnArray = [];
    noHeartburnArray = [];

    count3 = heartburnItems.length;
    function splitArray(array) {
      return array.map(e => e.ingredients.split(","));
    }
    heartburnArray = splitArray(heartburnItems);
    noHeartburnArray = splitArray(noHeartburnItems);
    const heartburnArrayCombined = heartburnArray.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue)
      },
      []
    )
    const noHeartburnArrayCombined = noHeartburnArray.reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue)
    },
    []
  )
  console.log(noHeartburnArrayCombined)
    // flattened is [0, 1, 2, 3, 4, 5]
    // console.log("heartburnArray", heartburnArray)
    console.log("flattened", [...new Set(heartburnArrayCombined)])
    const intersection = noHeartburnArrayCombined.filter((e) => {
      return heartburnArrayCombined.indexOf(e) > -1;
    });
    console.log("int", intersection)
    countedIngredients = heartburnArrayCombined.reduce((allItems, item) => {
      if(item in allItems) {
        allItems[item]++;
      } else {
        allItems[item] = 1;
      }
      return allItems;
    }, {});
    // console.log("counted", countedIngredients);
  }

  function LoopingMultipleArrays(array) {
    array2 = [];
    if (isLoaded(foodItems)) {
      for (let i = 0; i < array.length; i++) {
        // console.log("i", i);
        count3 = count3 - 1;
        for (let j = 0; j < count3; j++) {
          // console.log("count3", count3);
          if (count4 === array.length - 1) {
            count4 = i + 1;
          } else {
            count4++;
          }
          for (let k = 0; k < array[i].length; k++) {
            // console.log("count4", count4);
            for (let e = 0; e < array[count4].length; e++) {
              if (array[i][k] === array[count4][e]) {
                array2.push(array[i][k]);
              }
            }
          }
        }
      }
      array3 = [...new Set(array2)];
      return array3;
    }
  }

  function combineArrays() {
    if (isLoaded(foodItems)) {
      for (let i = 0; i < heartburnItems.length; i++) {
        let pepper = heartburnItems[i].ingredients.split(",");
        // console.log("pepper", pepper);
        for (let j = 0; j < pepper.length; j++) {
          arrays.push(pepper[j]);
        }
      }
    }
    return arrays;
  }

  
  LoopingMultipleArrays(heartburnArray);
  if (isLoaded(foodItems)) {
    comparison = [];
    for (let e = 0; e < noHeartburnArray.length; e++) {
      for (let i = 0; i < array2.length; i++) {
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

    // console.log(counts);
    let j = array2.indexOf(" spices");
    // console.log("get", j);
  }
  let count5;
  let array4 = [];
  function count2(word) {
    for (let i = 0; i < heartburnItems.length; i++) {
      array4.push(count5);
      count5 = 0;
      for (let j = 0; j < heartburnItems[i].length; j++) {
        if (word === heartburnItems[i][j]) {
          count5++;
        }

      }
    }
  }
  // console.log(array4);
  function myFunction(item, index, arr) {
    arr[index] = <li className="stats"><strong>{item} - {counts[item]}</strong></li>;
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

  // function countArrayIndexes() {
  //   let countOccurrance;
  //   let array5 = [];
  //   for(let i = 0; i < array3.length; i++) {
  //     countOccurrance = 0;
  //     console.log("meme")
  //     console.log(arrays.length);
  //     for(let j = 0; j < 60; j++) {
  //       // console.log("mike");
  //       // console.log("joe", array3[i], arrays[j]);
  //       if(array3[i] === arrays[j]) {
  //         countOccurrance++;
  //         console.log("me", countOccurrance);
  //       }
  //     }
  //     array5.push(countOccurrance);
  //   }
  //   return array5;
  // }
  // console.log("arr", array3);
  // console.log(countArrayIndexes());
  // console.log("combine", combineArrays());
  // console.log("array3", array3);
  return (
    <React.Fragment>
      <h2>Your stats</h2>
      <p>Here are the food ingredients that may be causing your heartburn:</p>
      {loadingFirestore(foodItems, array3)}
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