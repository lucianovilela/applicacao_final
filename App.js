import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';

import Constants from 'expo-constants';
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig.json';
import { AuthProvider } from './components/AuthProvider';
const Tab = createBottomTabNavigator( );

export default function App() {
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

  }
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home" options={{headerShown:true}}>
          <Tab.Screen name="Home" component={HomeScreen} options={{title:'home', headerShown:true}} />
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
