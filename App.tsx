import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { StyleSheet } from 'react-native';
import TodoDetails from './src/screens/TodoDetails';
import Todos from './src/screens/Todos';
import Welcome from './src/screens/Welcome';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  let [fontLoaded] = useFonts({
    "DMRegular": require('./assets/fonts/DMSans-Regular.ttf'),
    "DMMedium": require('./assets/fonts/DMSans-Medium.ttf'),
    "DMBold": require('./assets/fonts/DMSans-Bold.ttf'),
  });

  if (!fontLoaded) {
    SplashScreen.preventAutoHideAsync()
      .then(() => {
        SplashScreen.hideAsync();
      });
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Todos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TodoDetails"
          // @ts-ignore
          component={TodoDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
