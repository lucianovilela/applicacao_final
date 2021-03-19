import * as React from "react";
import { useState, useContext } from "react";

import { View, Text, FlatList } from "react-native";
import { Input, Button, SocialIcon, ListItem } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";

import ContextAuth from "./AuthProvider";

import ReservaScreen from "./ReservaScreen";

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  const authContext = useContext(ContextAuth);
  return (
    <View>
      <FlatList
        style={{ flex: 1 }}
        data={authContext.state.userInfo}
        renderItem={({ item }) => (
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>{item.data} </ListItem.Title>
              <ListItem.Subtitle>Horas:{item.hora} </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={(item) => `${item.data}-${item.hora}`}
      />
    </View>
  );
};

function HomeScreen({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Reservas",
          headerRight: () => (
            <Button
              title="reservar"
              onPress={() => {
                navigation.navigate("Reserva");
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="Reserva" component={ReservaScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
