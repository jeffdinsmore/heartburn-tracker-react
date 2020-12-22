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
    let count=0;
    matchedItems = [];
    for (let i=0; i < heartburnArray.length; i++) {
      for (let j=1; j < heartburnArray.length; j++) {
        for (let k=0; k < heartburnArray[i].length; k++) {
          if (heartburnArray[i][k] === heartburnArray[j][k]) {
            matchedItems.push(heartburnArray[i][k]);
          } else {
            count++;
          }
          console.log(count);
        }
        
      }
      console.log(heartburnArray[0].length, heartburnArray[1].length, heartburnArray[2].length);
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