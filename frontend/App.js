import React from "react";

import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";

import Theme from "./components/Shared/Theme";
import AuthModal from "./components/Pages/Auth/AuthModal";
import MainNavigator from "./components/Navigation";

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AuthModal />
        <MainNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
