import EditFoodItemForm from "./foodViews/EditFoodItemForm";
import FoodItemDetail from "./foodViews/FoodItemDetail";
import FoodItemList from "./foodViews/FoodItemList";
import Homepage from "./Homepage";
import NewFoodItemForm from "./foodViews/NewFoodItemForm";
import sendPasswordResetEmail from "./PasswordReset";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import YourStats from "./foodViews/YourStats";


const Routes = [
  {
    path: '/edit-food-item',
    component: EditFoodItemForm,

  },
  {
    path: '/food-item-detail',
    component: FoodItemDetail,
  },
  {
    path: '/food-list',
    component: FoodItemList,
  },
  {
    path: '/',
    component: Homepage,
  },
  {
    path: '/add-food-item',
    component: NewFoodItemForm,
  },
  {
    path: '/password-reset',
    component: sendPasswordResetEmail,
  },
  {
    path: '/signin',
    component: Signin,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/yourstats',
    component: YourStats,
  }
]

export default Routes;