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
  function howManyTimes(time1, time2) {
    let answer2 = new Date(time1);
    let answer = (new Date(time2) - new Date(time1));
    return answer2;
  }
  // console.log();
  // let seconds = foodItems.timeOpen.seconds;
  // console.log("Joe", foodItems[0].timeOpen.seconds);
  let time = new Date("2016-08-14 11:35:00");
  let time2 = new Date("2016-08-14 12:05:00");
  //console.log("Joey", howManyTimes("2016-08-14 11:35:00", "2016-08-15 11:35:00"));
  if (isLoaded(foodItems)) {
    console.log("list", props)
    function convertDate(nanoseconds, seconds) {
      let d = new Date(nanoseconds / 1000000 + seconds * 1000);
      let month = d.toDateString().substring(7, 3);
      let day = d.toDateString().substring(10, 8);
      let year = d.toDateString().substring(15, 11);
      let n = d.toDateString().substring(15, 3);
      return month + "-" + day + "-" + year;
    }
    const convertDate2 = (date) => {
      let month = date.toDateString().substring(7, 3);
      let day = date.toDateString().substring(10, 8);
      let year = date.toDateString().substring(15, 11);
      let n = date.toDateString().substring(15, 3);
      return month + "-" + day + "-" + year;
    }

    //console.log()
    // console.log(foodItems);

    let todd = foodItems.map((foodItem) => {
      //console.log(foodItem);
      let date = foodItem.timeOpen === null ? new Date() : new Date((foodItem.timeOpen.nanoseconds / 1000000) + (foodItem.timeOpen.seconds * 1000));
      return <FoodItem
      // whenFoodItemClicked={props.onFoodItemSelection}
      foodName={foodItem.foodName}
      ingredients={foodItem.ingredients}
      heartburn={foodItem.heartburn}
      timeOpen={date}
      // jane={joe(foodItem.timeOpen.nanoseconds, foodItem.timeOpen.seconds)}
      id={foodItem.id}
      key={foodItem.id} /> 
      
  })
    // let todd2 = [];
    // for(let i=0; i < foodItems.length; i++) {
    //   let p = ((foodItems[i].timeOpen.nanoseconds / 1000000) + (foodItems[i].timeOpen.seconds * 1000));
    //   todd2.push(new Date(p));
    // }
    // console.log('todd2', todd2.sort((a, b) => b - a));
    //console.log("todd", todd.sort((a, b) => b.props.timeOpen - a.props.timeOpen));
    // const byTimeOpen = foodItems.orderBy('timeOpen').get();
    // console.log("Go", byTimeOpen);
    // const sortedList = foodItems.sort((a, b) => b.(timeOpen.seconds / 1000000 + timeOpen.nanoseconds * 1000) - a.(timeOpen.seconds / 1000000 + timeOpen.nanoseconds* 1000));
    // function joe(seconds, nanoseconds) {
    //   console.log(convertDate(seconds, nanoseconds))
      
    // }
    return (
      <React.Fragment>
        <h2>Your Recorded Food List</h2>
        {/* <hr /> */}
        <table className="Table-mobile-large">
          <tr className="tableHeader">
            <th className="headerName">Food Item</th>
            <th className="headerIngredients">Ingredients</th>
            <th className="headerHeartburn">Heartburn</th>
            <th className="headerDate">Date Opened</th>
            <th className="headerDetails">Details</th>
          </tr>
          {todd.map((foodItem) => {
            // console.log("hey", foodItem.props.timeOpen);
            return <FoodItem
              whenFoodItemClicked={props.onFoodItemSelection}
              foodName={foodItem.props.foodName}
              ingredients={foodItem.props.ingredients}
              heartburn={foodItem.props.heartburn}
              timeOpen={convertDate2(foodItem.props.timeOpen)}
              id={foodItem.props.id}
              key={foodItem.props.id} />
          })}
        </table>
        <hr />
        {/* // {foodItems.map((foodItem) => {
        //   return <FoodItem
        //     whenFoodItemClicked={props.onFoodItemSelection}
        //     foodName={foodItem.foodName}
        //     ingredients={foodItem.ingredients}
        //     heartburn={foodItem.heartburn}
        //     id={foodItem.id}
        //     key={foodItem.id} />
        // })} */}

        {/* jane={joe(foodItem.timeOpen.nanoseconds, foodItem.timeOpen.seconds)} */}
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
  onFoodItemSelection: PropTypes.func
};

export default FoodItemList;

// function howManyTimes(time1, time2) {
// 	let arrayChime = [];
//   let chime = -1;
//   let chime2 = -1;
//   let array = [];
//   let array2 = [];
//   let array3 = [];
//   let array4 = [];
//   let onHour = false;
//   let onHour2 = false;
//   let answer = 0;
//   for ( let i=0; i < 24; i++) {
//     array.push(time1.substr(0,11) + i.toString() + ":00:00");
//     array2.push(new Date(array[i])/1000 - new Date(time1)/1000);
//     if (i === 0) {
//     arrayChime.push(12);
//     } else if (i < 13) {
//     	arrayChime.push(i);
//     } else {
//     	arrayChime.push(i-12);
//     } 
//   }
  
//   for ( let i=0; i < 24; i++) {
//     array3.push(time2.substr(0,11) + i.toString() + ":00:00");
//     array4.push(new Date(array[i])/1000 - new Date(time2)/1000);
//   }
  
//   console.log(array2);
//   for (let i = 0; i <= array2.length; i++) {
//     if (array2[i] >= -12 && array2[i] < 0) {
//       onHour = true;
//       chime = i;
//     }
//   }
//   for (let i = 0; i <= array4.length; i++) {
//     if (array4[i] >= -12 && array4[i] < 0) {
//       onHour2 = true;
//       chime2 = i;
//     }
//   }
//   let checkTime = time1.substr(0, 11) + "12:00:03";
//   let differenceInSeconds = ((new Date(time2) - new Date(time1)))/1000;
//   let hours = Math.floor(differenceInSeconds/60/60);
//   let minutes = Math.floor(differenceInSeconds/60);
//   let minute2 = minutes * 60;
//   let seconds = differenceInSeconds - (minutes * 60);
//   let sum = 0;
//   let j = 0;
//   for (let i = 0; i <= hours; i++) {
//     if (i > 12) {
//       j = i - 12;
//       sum = j + sum;
//     } else {
//       sum = i + sum;
//     }
//   }
//   if (onHour === true && onHour2 === true) {
//   	answer = (new Date(time2) - new Date(time1))/1000;
//     if (answer >= 3600) {
//     	answer = (answer - answer % 3600) / 3600 
//     }
//   }
  
//   return chime2;
// }
// console.log(howManyTimes("2016-08-14 00:35:11","2016-08-14 02:00:12"))








// function howManyTimes(time1, time2) {
// 	let arrayChime = [];
//   let arrayTime = [];
//   let output = 0;
//   for ( let i=0; i < 24; i++) {
//   	if(i < 10) {
//     	arrayTime.push("0" + i.toString());
//     } else if (i >=10) {
//     	arrayTime.push(i.toString());
//     }
//     if (i === 0) {
//     arrayChime.push(12);
//     } else if (i < 13) {
//     	arrayChime.push(i);
//     } else {
//     	arrayChime.push(i-12);
//     } 
//   }
//   function checkHour (input) {
//   	let answer = false;
//   	let minutes = parseInt(input.substr(14,2));
//     let seconds = parseInt(input.substr(17,2));
//   	if (minutes >= 0 && seconds > 0) {
//     	answer = true;
//     }
//   	return answer;
//   }
//   function checkSeconds (input) {
//   	let answer = false;
//     let minutes = parseInt(input.substr(14,2));
//     let seconds = parseInt(input.substr(17,2));
//     if (seconds >= 12 | minutes > 0) {
//      answer = true;
//     }
//     return answer;
//   }
  
//   console.log(checkSeconds(time2));
//   console.log(checkHour(time2));
//   if (checkSeconds(time2) === true && checkHour(time2) === true) {
//   	output = 2;
//   }
  
// 	let differenceInSeconds = ((new Date(time2) - new Date(time1)))/1000;
//   if (differenceInSeconds >= 3600) {
//   	if(checkSeconds(time2) === true && parseInt(time2.substr(12,2)) <= parseInt(time2.substr(17,2))) {
//     	output = arrayChime[parseInt(time2.substr(12,2))];
      
    
//     }
//   	time2.substr(12,13);
//   }
//   output = arrayChime[parseInt(time2.substr(12,2))];
//   return output;
// }

// console.log(howManyTimes("2016-08-13 01:00:00","2016-08-14 03:00:04"))






// bonus = function(arr, s) {
//   // Your code
//   let a = 1;
//   let b = 1;
//   let c = 0;
//   let array = [];
//   let array2 = [];
//   let array3 = [];
//   let count = 0;
  
//   for (let i=0; i < arr.length; i++) {
//   	a = arr[i] * a;
//     for (let j = 0; j < arr.length; j++) {
//     	if(i !==  j) {
//       	array.push(arr[j])
//       	array2.push(arr[j])
//       }
//     }
//   }

//   for (let i = 0; i < array2.length; i++) {
//   	b = b * array2[i]
//     count++
//     if ((arr.length -1) === count) {
//     	count = 0;
//       array3.push(b);
//       b = 1;
//     }
//   }
  
//   for (let i=0; i < array3.length; i++) {
//   	c = array3[i] + c;
//   }
  
//   let y = (s*a)/c;
//   let array4 = arr.map(e => y / e)
//   return array4;
// }
// console.log(bonus([30, 27, 8, 14, 7], 34067));
