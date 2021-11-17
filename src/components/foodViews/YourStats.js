import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from "prop-types";

const YourStats = (props) => {
  useFirestoreConnect([
    {
      collection: 'users', doc: props.userId.userId,
      subcollections: [{ collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }], storeAs: 'foodItems'
    }
  ]);

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
    console.log("arr", array)
    return array;
  }

  const sortObjectIntoArray = (object) => {
    return Object.entries(object).sort(([,a], [,b]) => b - a);
  }
  

  useEffect(() => {
    console.log("component updated")
  });

  if (isLoaded(foodItems)) {
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
  console.log("comp", comparison, noHeartburnObject)
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