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
  let heartburnArray;
  let matchedItems;
  if (isLoaded(foodItems)) {
    heartburnItems =  foodItems.filter(f => f.heartburn == "Yes");
    heartburnArray = [];
    for(let i=0; i < heartburnItems.length; i++) {
      heartburnArray.push(heartburnItems[i].ingredients.split(","))
    }
    matchedItems = [];
    for (let i=0; i < heartburnArray.length -1; i++) {
      for (let j=0; j < heartburnArray[i].length; j++) {
        if (heartburnArray[i][j] === heartburnArray[i+1][j]) {
          matchedItems.push(heartburnArray[i][j]);
        }
        console.log(heartburnArray[i+1][j]);
      }
      // console.log(heartburnArray[i].length);
    }
    console.log("match", matchedItems);
  }
  
  // console.log("output", heartburnItems[2].heartburn);
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