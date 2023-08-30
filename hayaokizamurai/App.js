// In App.js in a new project
import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./page/home";
import SamuraiScreen from "./page/samurai";
import AddScreen from "./page/add";
import RankScreen from "./page/rank";
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import Shake from "./page/Shake";
import { RecoilRoot } from 'recoil';
import Result from "./page/Result";


function App() {
  const Stack = createNativeStackNavigator();

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync,2000);

  const screenOptions = {
    headerStyle: {
      backgroundColor: "#D0F6FE",
    },
  };



  return (
    <RecoilRoot>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Samurai" component={SamuraiScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Rank" component={RankScreen} />
        <Stack.Screen name="Shake" component={Shake} 
        options={{headerShown: false,}}
        />
        <Stack.Screen name="Result" component={Result} 
          options={{headerShown: false,}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    {/* // <Test/> */}
    </RecoilRoot>
  );
}

export default App;
