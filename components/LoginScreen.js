import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import style from "./AppStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, SocialIcon, Divider } from "react-native-elements";

import ContextAuth from "./AuthProvider";

function LoginSreen({ navigation }) {
  const authContext = useContext(ContextAuth);

  const login = () => {
    authContext.action.signIn(info).then((user) => {
      console.log(user);
    });
  };
  const assinar = () => {
    authContext.action
      .signUp(info)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    authContext.action
      .signOut()
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [info, setInfo] = useState({ email: undefined, password: undefined });
  return (
    <View style={style.container}>
      <View style={{ alignContent: "center" }}>
        <Text>{authContext.state?.user?.email}</Text>
        <Text>{authContext.state.isSignout}</Text>
      </View>
      <View style={{display:authContext.state.isSignout?'':'none'}}>
        <Input 
          placeholder="email"
          leftIcon={<Icon name="user" size={24} color="black" />}
          style={{paddingLeft:15}}
          onChangeText={(text) => {
            setInfo({ ...info, email: text });
          }}
        />
        <Input
          placeholder="password"
          style={{paddingLeft:15}}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={24} color="black" />}
          
          onChangeText={(text) => {
            setInfo({ ...info, password: text });
          }}
        />
        <Button
          title="Login"
          onPress={login}
          style={{ marginBottom: 15, padding: 5 }}
        />
        <Button
          title="Assinar"
          onPress={assinar}
          style={{ marginBottom: 15, padding: 5 }}
        />
      </View>
      <Button
        title="Logout"
        onPress={logout}
        style={{ marginBottom: 15, padding: 5 }}
      />

      {
        //<Divider style={{ backgroundColor: "blue", marginBottom: 10 }} />
        //<SocialIcon title="Sign In With Facebook" button type="facebook" />
      }
      </View>
  );
}

export default LoginSreen;
