import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./../pages/Home";
import DetailScreen from "./../pages/Detail";

const baseDefaultNavigationOptions = {
  headerBackTitle: "Voltar",
  headerStyle: {
    backgroundColor: "#D42026"
  },
  headerBackColor: "#fff",
  headerTintColor: "#fff",
  headerLayoutPreset: "center"
};

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Detail: DetailScreen
  },
  { defaultNavigationOptions: baseDefaultNavigationOptions }
);

export default createAppContainer(AppNavigator);
