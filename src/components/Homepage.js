import React from 'react';
// import FoodItem from "./FoodItem";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from "prop-types";

function Homepage(props) {
  useFirestoreConnect([
    { collection: 'foodItems' }
  ]);

  const foodItems = useSelector(state => state.firestore.ordered.foodItems);
  let heartburnItems;
  let arrays;
  let matchedItems;
  let matchItems;
  let matchItems2;
  let heartburnArray;
  if (isLoaded(foodItems)) {
    heartburnItems = foodItems.filter(f => f.heartburn == "Yes");
    arrays = [];
    heartburnArray = [];
    for (let i = 0; i < heartburnItems.length; i++) {
      heartburnArray.push(heartburnItems[i].ingredients.split(","))
    }
    let matches;
    function getMatch(a, b) {
      matches = [];
      for (let i = 0; i < a.length; i++) {
        for (let e = 0; e < b.length; e++) {
          if (a[i] === b[e]) matches.push(a[i]);
        }
      }
      return matches;
    }
    let calculateCommonValues = (arrays) => {
      return arrays.reduce((total, currentArray, index) => {
        arrays.map((array, index2) => {
          if (index <= index2) return total;
          let combinedArrays = [...array, ...currentArray];
          let uniqueValuesArray = new Set(combinedArrays);
          let commonCount = combinedArrays.length - uniqueValuesArray.size;
          if (combinedArrays.length - uniqueValuesArray.size > 0)
            total[`array-${index2} array-${index}`] = commonCount;
        });
        return total;
      }, {});
    };
    console.log(calculateCommonValues(heartburnArray));
    matchedItems = calculateCommonValues(heartburnArray);
    matchItems = getMatch(heartburnArray[0], heartburnArray[2]);
    matchItems2 = getMatch(heartburnArray[1], heartburnArray[2]);
    // let count = heartburnArray.length;
    // let count2=0;
    // let count3=0;
    // let element;
    // matchedItems = [];
    // for (let i=0; i < count; i++) {
    //   count--;
    //   count2++;
    //   console.log("count: ", count, count2);
    //   for (let j=0; j < heartburnArray[i].length; j++) {
    //     count3++;
    //     element = heartburnArray[i].filter(input => input.includes(heartburnArray[i][j]));
    //     console.log(element);
    //     heartburnArray[count2].forEach(function(item) {
    //       if (element.includes(item)) {
    //         matchedItems.push(heartburnArray[i][j]);

    //       }
    //     })
    //     console.log(count3);

    // if (heartburnArray[i][j] === heartburnArray[i+1][j]) {
    //   matchedItems.push(heartburnArray[1][j]);

    // for (let k=0; k < heartburnArray[i].length-1; k++) {
    //   if (heartburnArray[i][k] === heartburnArray[j][k]) {
    //     matchedItems.push(heartburnArray[i][k]);
    //   } else {
    //     count++;
    //   }
    // console.log(count);
    // }

  }

  // }
  // // console.log(heartburnArray[0].length, heartburnArray[1].length, heartburnArray[2].length);
  // console.log("match", matchedItems);


  // console.log("output", heartburnItems[2].heartburn);
  function loadingFirestore(foodItems) {
    if (isLoaded(foodItems)) {
      return <strong><em>"{matchItems.join(",")+ matchItems2.join(",")}"</em></strong>;
    } else {
      return <h3>Loading...</h3>;
    }
  }
  return (
    <React.Fragment>
      <br />
      <h2><strong>What if heartburn is caused by a specific ingredient or group of ingredients?</strong></h2>
      <blockquote>
        I had heartburn from a chocolate chip cookie made by a specific company, but when I had a chocolate chip cookie made by a different company, I did not get heartburn.<br /><br />
        -- Jeff Dinsmore, Owner
      </blockquote>
      <p>It is our opinion that heartburn may be caused by a specific ingredient or group of ingredients rather than a type of food a person eats.</p>
      {/* <h3><strong>Reducing heartburn starts with what you eat and what drink!</strong></h3>
      <br /> */}
      <br />
      <h3>How do people have heartburn?</h3>
      <p>Heartburn occurs when the lower esophageal sphincter relaxes and allows stomach fluids (stomach acid and food) back up into the esophagus.</p>
      <br />
      <h3>What triggers heartburn?</h3>
      <p>Many doctors believe there are several foods that are listed to be risk factors in causing heartburn.</p>
      <p>Some of these include:</p>
      <ul>
        <li className="list">Spicy foods</li>
        <li className="list">Citrus foods</li>
        <li className="list">Onions</li>
        <li className="list">Tomatoes and tomato products</li>
        <li className="list">Fried foods</li>
        <li className="list">Alcohol</li>
        <li className="list">Coffee and some teas</li>
        <li className="list">Peppermint</li>
      </ul>
      <br />
      <h3>Your stats</h3>
      <p>Here are the food ingredients that may be causing your heartburn:</p>
      {loadingFirestore(foodItems)}
    </React.Fragment>
  );

}


Homepage.propTypes = {
  onFoodItemSelection: PropTypes.func
};

export default Homepage;