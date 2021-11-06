import * as c from './../actions/ActionTypes';

const signInNameReducer = (state = { user: "Not signed in" }, action) => {
  const { user } = action;
  switch (action.type) {
    case c.SIGN_IN_NAME:
      return state = {
        user: user,
      };
    case c.SIGN_OUT:
      return state = { user: "Signed out" };
    default:
      return state;
  }
};

// const foodItemListReducer = (state = {}, action) => {
//   const { foodName, ingredients, heartburn, timeOpen, id } = action;
//   switch (action.type) {
//     case c.ADD_FOODITEM:
//       return Object.assign({}, state, {
//         [id]: {
//           foodName: foodName,
//           ingredients: ingredients,
//           heartburn: heartburn,
//           timeOpen: timeOpen,
//           id: id,
//         }
//       });
//     case c.DELETE_FOODITEM:
//       const newState = { ...state };
//       delete newState[id];
//       return newState;
//     default:
//       return state;
//   }
// };



export default signInNameReducer;