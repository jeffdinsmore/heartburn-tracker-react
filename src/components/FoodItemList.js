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
  
  // console.log();
  // let seconds = foodItems.timeOpen.seconds;
  // console.log("Joe", foodItems[0].timeOpen.seconds);
  if (isLoaded(foodItems)) {

    function convertDate(nanoseconds, seconds) {
      let d = new Date(nanoseconds / 1000000 + seconds * 1000);
      let month = d.toDateString().substring(7, 3);
      let day = d.toDateString().substring(10, 8);
      let year = d.toDateString().substring(15, 11);
      let n = d.toDateString().substring(15, 3);
      return month + "-" + day + "-" + year;
    }
    function convertDate2(date) {
      let month = date.toDateString().substring(7, 3);
      let day = date.toDateString().substring(10, 8);
      let year = date.toDateString().substring(15, 11);
      let n = date.toDateString().substring(15, 3);
      return month + "-" + day + "-" + year;
    }
    // console.log(foodItems);

    let todd = foodItems.map((foodItem) => {
      console.log(foodItem.timeOpen.nanoseconds);
      let date = new Date((foodItem.timeOpen.nanoseconds / 1000000) + (foodItem.timeOpen.seconds * 1000));;
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
    console.log("todd", todd.sort((a, b) => b.props.timeOpen - a.props.timeOpen));
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
              // jane={joe(foodItem.timeOpen.nanoseconds, foodItem.timeOpen.seconds)}
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