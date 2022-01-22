import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withFirestore, useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function YourStats(props) {
  const { userId } = props;
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       firebase.auth().onAuthStateChanged((user) => {
  //         const { dispatch } = props;
  //         if (user) {
  //           dispatch(a.signInName(user.email));
  //           dispatch(a.userId(user.uid));
  //           //getData(user.uid)
  //           console.log("s", state, props)
  //         }
  //       })
  //     } catch (error) {
  //       alert(error);
  //     }
  //   })();
  // }, [])
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       firebase.auth().onAuthStateChanged((user) => {
  //         if (user) {
  //           dispatch(a.signInName(user.email));
  //           dispatch(a.userId(user.uid));
  //         }
  //       })
  //     } catch (error) {
  //       alert(error);
  //     }
  //     console.log("Home component did mount")
  //   })();
  // }, []);

  useFirestoreConnect([
    {
      collection: 'users', doc: userId,
      subcollections: [{ collection: 'foodItems', orderBy: [['timeOpen', 'desc']] }], storeAs: 'foodItems'
    }
  ]);

  const state = useSelector(state => state);
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
    return array;
  }

  const sortObjectIntoArray = (object) => {
    return Object.entries(object).sort(([, a], [, b]) => b - a);
  }


  useEffect(() => {
    console.log("Yourstats component updated")
  });
  console.log('stats', props, state, foodItems, isEmpty(foodItems))
  if (foodItems !== undefined) {
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
    if (foodItems !== undefined && !isEmpty(foodItems)) {
      array.forEach(createList);
      return array;
    }
    if (!isLoaded(foodItems)) {
      return <h3>Loading...</h3>;
    }
    if (isEmpty(foodItems)) {
      return <h3>You have not entered any food items yet.</h3>;
    }
  }
  function sortArray(array) {
    if (isLoaded(foodItems)) {
      return array.sort(([, a], [, b]) => b - a);
    } else {
      return array;
    }
  }

  if(foodItems && foodItems.length > 1) {

  
  return (
    <React.Fragment>
      <h2>Your stats</h2>
      <p>Here are the food ingredients that may be causing your heartburn:</p>
      {loadingFirestore(foodItems, sortObjectIntoArray(heartburnObject))}
      <br />
      <p>Ingredients that are unlikely to give you heartburn from the list above. They are in your food list that did not give you heartburn:</p>
      {loadingFirestore(foodItems, sortArray(comparison))}
      <br></br><br></br>
      <Link className='btn btn-info btn-sm' to='/foodlist'>
        See Food List
      </Link>
    </React.Fragment>
  );
} else if(foodItems && foodItems.length > 0) {
  return (
<React.Fragment>
    <h3>It appears there is no correlation between your food ingredients and heartburn. Add more foods to add more data.</h3>
    <hr></hr>
    <br />
    <Link className='btn btn-info btn-sm' to='/add-food-item'>
        Add Food Item
      </Link>
  </React.Fragment>
  );
} else if(foodItems && foodItems.length === 0) {
  return (
  <React.Fragment>
    <h3>You have no food Items in your list. Add food Items below.</h3>
    <hr></hr>
    <br />
    <Link className='btn btn-info btn-sm' to='/add-food-item'>
        Add Food Item
      </Link>
  </React.Fragment>
  );
} else {
  return (
    <React.Fragment>
      <h3>Loading...</h3>
    </React.Fragment>
  );
}
}



YourStats.propTypes = {
  userId: PropTypes.string,
  firestore2: PropTypes.object,
  loginName: PropTypes.string,
  selectedFoodItem: PropTypes.object,
  editing: PropTypes.bool,
  foodItems: PropTypes.array,
  masterFoodList: PropTypes.object,
};

const mapStateToProps = state => ({
  userId: window.localStorage.getItem('uId'),
  firestore2: state.firestore,
  loginName: window.localStorage.getItem('email'),
  selectedFoodItem: state.selectedFoodItem,
  editing: state.editing,
  foodItems: state.firestore.ordered.foodItems,
  masterFoodList: state.masterFoodItemList,
});

export default withFirestore(connect(mapStateToProps)(YourStats));

