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
  //console.log(noHeartburnArrayCombined)
    // flattened is [0, 1, 2, 3, 4, 5]
    // console.log("heartburnArray", heartburnArray)
    //console.log("flattened", [...new Set(heartburnArrayCombined)])
    const intersection = noHeartburnArrayCombined.filter((e) => {
      return heartburnArrayCombined.indexOf(e) > -1;
    });
    //console.log("int", intersection)
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

// function tvRemote(words) {
//   let mode1 = [['a', 'b', 'c', 'd', 'e', 1, 2, 3],['f', 'g', 'h', 'i', 'j', 4, 5, 6],['k', 'l', 'm', 'n', 'o', 7, 8, 9],['p', 'q', 'r', 's', 't', '.', '@', 0],['u', 'v', 'w', 'x', 'y', 'z', '_', '/'], ['aA#', ' ']];
//   let mode2 = [['A', 'B', 'C', 'D', 'E', 1, 2, 3],['F', 'G', 'H', 'I', 'J', 4, 5, 6],['K', 'L', 'M', 'N', 'O', 7, 8, 9],['P', 'Q', 'R', 'S', 'T', '.', '@', 0],['U', 'V', 'W', 'X', 'Y', 'Z', '_', '/'], ['aA#', ' ']];
//   for(let i = 0; i < mode1.length; i++) {
//     for(let j = 0; j < mode1[i].length; j++) {
//       mode2.push(mode1[i][j]);
//     }
//   }
//   let mode3 = [['^', '~', '?', '!', "\'", "\"", '(', ')'], ['-', ':', ';', '+', '&', '%', '*', '='], ['<', '>', '€', '£', '$', '¥', '¤', "\\"], ["1", "2", "3", "4", ",", ".", "|", "@", "§"], ["#", "¿", "¡", 10, 11, 12, "_", "/"], ['aA#', ' ']];
//   let array = [0, 0];
//   let answer = words.length;
//   let count = 0;
//   for(let i = 0; i < words.length; i++) {
//     for(let j = 0; j < mode1.length; j++) {
//       for(let k = 0; k < mode1[j].length; k++) {
//         if(words.charAt(i) === mode1[j][k]) {
//           if(words.charAt(i-1) === mode2[j][k]) {
//             array.push(5);
//             array.push(0);
//           }
//           array.push(j);
//           array.push(k);
//         } else if(words.charAt(i) === mode2[j][k]) {
//           array.push(5);
//           array.push(0);
//           array.push(j);
//           array.push(k);
//           count++;
//         } else if(words.charAt(i) === mode3[j][k]) {
//           array.push(5);
//           array.push(0);
//           array.push(j);
//           array.push(k);
//           count++;
//         }
//       }
//     }
//   }
//   for(let i = 0; i < array.length-2; i+=2) {
//     answer = Math.abs(array[i+2] - array[i]) + answer;
//     answer = Math.abs(array[i+3] - array[i+1]) + answer;
//     if(Math.abs(array[i+2] - array[i]) === 4) {
//       answer = answer - 2;
//     } else if(Math.abs(array[i+2] - array[i]) === 5) {
//       answer = answer - 4;
//     }
//     if(Math.abs(array[i+3] - array[i+1]) === 5) {
//       answer = answer - 2;
//     } else if(Math.abs(array[i+2] - array[i]) === 6) {
//       answer = answer - 4;
//     } else if(Math.abs(array[i+2] - array[i]) === 7) {
//       answer = answer - 6;
//     }
//     //answer = Math.abs(array[i+2] - array[i]) >= 3 ? answer - (mode1.length - 4) : answer;
//     //answer = Math.abs(array[i+3] - array[i+1]) >= 4 ? answer - (mode1[0].length - 4) : answer;
//   }
//   console.log(array)
//   console.log(count)
//   return answer;
// }
// console.log(tvRemote("Too Easy?"))

// //array.push(array[j+2] - array[j] <= 4 ? j : j-4);
// //array.push(array[j+3] - array[j+1] <= 3 ? k : k-3);
// //[1,1,1,3,5,9,17,31,57,105]

// //if(i < 3) {
//     //sum = sum + signature[i];
//     //array.push(signature[i])
//   //} 
//   //if(i >= 3) {
//     //sum = sum + array[i]
//     //array.push(sum);
//     //sum = sum - array[i-3]
//  // }

//-------------------------------------------

// function howManyTimes(time1,time2){
//   let newTime1 = new Date(time1).getTime()/1000;
//   let newTime2 = new Date(time2).getTime()/1000;
//   let answer = newTime1;
//   for(let i = 0; i < newTime2 - newTime1; i++) {
//   	answer = answer + 1;
//   	if(i === 1499) {
//     	console.log(new Date(answer * 1000).toString())
//       console.log(answer)
//       console.log(new Date(answer*1000).getHours())
//     }
//   }
//   return new Date(1471204800 * 1000).toString()
  
// }

// console.log(howManyTimes("2016-08-14 11:35:00","2016-08-14 12:05:00"))

// //array.push(array[j+2] - array[j] <= 4 ? j : j-4);
// //array.push(array[j+3] - array[j+1] <= 3 ? k : k-3);
// //[1,1,1,3,5,9,17,31,57,105]

// //if(i < 3) {
//     	//sum = sum + signature[i];
//     	//array.push(signature[i])
//     //} 
//   	//if(i >= 3) {
//     	//sum = sum + array[i]
// 			//array.push(sum);
//       //sum = sum - array[i-3]
//    // }

//---------------------------------------
// function tvRemote(words) {
//   let mode1 = [['a', 'b', 'c', 'd', 'e', 1, 2, 3],['f', 'g', 'h', 'i', 'j', 4, 5, 6],['k', 'l', 'm', 'n', 'o', 7, 8, 9],['p', 'q', 'r', 's', 't', '.', '@', 0],['u', 'v', 'w', 'x', 'y', 'z', '_', '/'], ['aA#', ' ']];
//   let mode2 = [['A', 'B', 'C', 'D', 'E', 1, 2, 3],['F', 'G', 'H', 'I', 'J', 4, 5, 6],['K', 'L', 'M', 'N', 'O', 7, 8, 9],['P', 'Q', 'R', 'S', 'T', '.', '@', 0],['U', 'V', 'W', 'X', 'Y', 'Z', '_', '/'], ['aA#', ' ']];
//   for(let i = 0; i < mode1.length; i++) {
//     for(let j = 0; j < mode1[i].length; j++) {
//       mode2.push(mode1[i][j]);
//     }
//   }
//   let mode3 = [['^', '~', '?', '!', "\'", "\"", '(', ')'], ['-', ':', ';', '+', '&', '%', '*', '='], ['<', '>', '€', '£', '$', '¥', '¤', "\\"], ["1", "2", "3", "4", ",", ".", "|", "@", "§"], ["#", "¿", "¡", 10, 11, 12, "_", "/"], ['aA#', ' ']];
//   let array = [0, 0];
//   let answer = words.length;
//   let count = 0;
//   for(let i = 0; i < words.length; i++) {
//     for(let j = 0; j < mode1.length; j++) {
//       for(let k = 0; k < mode1[j].length; k++) {
//         if(words.charAt(i) === mode1[j][k]) {
//           array.push(j);
//           array.push(k);
//         } else if(words.charAt(i) === mode2[j][k]) {
//           array.push(j <= 4 ? j : j-2);
//           array.push(k <= 3 ? k : k-2);
//           count++;
//         }
//       }
//     }
//   }
//   for(let i = 0; i < array.length-2; i+=2) {
//     answer = Math.abs(array[i+2] - array[i]) + answer;
//     answer = Math.abs(array[i+3] - array[i+1]) + answer;
//     if(Math.abs(array[i+2] - array[i]) === 4) {
//       answer = answer - 2;
//     } else if(Math.abs(array[i+2] - array[i]) === 5) {
//       answer = answer - 4;
//     }
//     if(Math.abs(array[i+3] - array[i+1]) === 5) {
//       answer = answer - 2;
//     } else if(Math.abs(array[i+2] - array[i]) === 6) {
//       answer = answer - 4;
//     } else if(Math.abs(array[i+2] - array[i]) === 7) {
//       answer = answer - 6;
//     }
//     //answer = Math.abs(array[i+2] - array[i]) >= 3 ? answer - (mode1.length - 4) : answer;
//     //answer = Math.abs(array[i+3] - array[i+1]) >= 4 ? answer - (mode1[0].length - 4) : answer;
//   }
//   return answer;
// }