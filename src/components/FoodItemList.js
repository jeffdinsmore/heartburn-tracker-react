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
  
  console.log();
  // let seconds = foodItems.timeOpen.seconds;
  // console.log("Joe", foodItems[0].timeOpen.seconds);
  if (isLoaded(foodItems)) {

    function convertDate(seconds, nanoseconds) {
      let d = new Date(seconds / 1000000 + nanoseconds * 1000);
      let month = d.toDateString().substring(7, 3);
      let day = d.toDateString().substring(10, 8);
      let year = d.toDateString().substring(15, 11);
      let n = d.toDateString().substring(15, 3);
      return month + "-" + day + "-" + year;
    }
    // const byTimeOpen = foodItems.orderBy('timeOpen').get();
    // console.log("Go", byTimeOpen);
    // const sortedList = foodItems.sort((a, b) => b.(timeOpen.seconds / 1000000 + timeOpen.nanoseconds * 1000) - a.(timeOpen.seconds / 1000000 + timeOpen.nanoseconds* 1000));
    function joe(seconds, nanoseconds) {
      console.log(convertDate(seconds, nanoseconds))

    }
    return (
      <React.Fragment>
        <h2>Your Recorded Food List</h2>
        {/* <hr /> */}
        <table className="Table-mobile-large">
          <tr className="tableHeader">
            <th>Food Item</th>
            <th>Ingredients</th>
            <th>Heartburn</th>
            <th>Details</th>
          </tr>
          {foodItems.map((foodItem) => {
            return <FoodItem
              whenFoodItemClicked={props.onFoodItemSelection}
              foodName={foodItem.foodName}
              ingredients={foodItem.ingredients}
              heartburn={foodItem.heartburn}
              timeOpen={convertDate(foodItem.timeOpen.nanoseconds, foodItem.timeOpen.seconds)}
              jane={joe(foodItem.timeOpen.nanoseconds, foodItem.timeOpen.seconds)}
              id={foodItem.id}
              key={foodItem.id} />
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