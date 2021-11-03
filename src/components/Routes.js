import EditFoodItemForm from "./EditFoodItemForm";
import FoodItemDetail from "./FoodItemDetail";
import FoodItemList from "./FoodItemList";
import Homepage from "./Homepage";
import NewFoodItemForm from "./NewFoodItemForm";
import sendPasswordResetEmail from "./PasswordReset";
import Signin from "./Signin";
import Signup from "./Signup";
import YourStats from "./YourStats";


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