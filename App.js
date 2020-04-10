import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import "react-native-gesture-handler";

import ScreenOne from "./src/screens/ScreenOne";
import ScreenTwo from "./src/screens/ScreenTwo";
import ScreenThree from "./src/screens/ScreenThree";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Screen Two" //Change to default page. This is probably self evident but wanted to make sure people didn't miss it.
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // Get icons from https://expo.github.io/vector-icons/ Look for Icons from the feather pack as that's what I'm using
            let iconName;

            if (route.name === "Screen One") {
              iconName = "settings";
            } else if (route.name === "Screen Two") {
              iconName = "home";
              // iconName = focused ? 'home' : 'anchor' // Use to change icon depending if that screen is currently selected or not
            } else if (route.name === "Screen Three") {
              iconName = "github";
            }

            // You can return any component that you like here
            return <Feather name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          // Changes the color of tabs depending if they're active or not
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Screen One" component={ScreenOne} />
        <Tab.Screen name="Screen Two" component={ScreenTwo} />
        <Tab.Screen name="Screen Three" component={ScreenThree} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
