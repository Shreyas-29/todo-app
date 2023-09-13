import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import List from './src/screens/List';
import Details from './src/screens/Details';
import React, { useState, useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase.config';
import Home from './src/screens/Home';
import Welcome from './src/screens/Welcome';

const InsideStack = createNativeStackNavigator();

const Stack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name="Todos" component={List} />
            <InsideStack.Screen name="Details" component={Details} />
            <InsideStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </InsideStack.Navigator>
    )
}

export default function App() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (newUser) => {
            console.log("newUser", newUser);
            setUser(newUser)
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
                {user ? (
                    <Stack.Screen name="Home" component={InsideLayout} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                )}
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
