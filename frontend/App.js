import React from "react";

import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";

import Theme from "./components/Shared/Theme";
import AuthModal from "./components/Pages/Auth/AuthModal";
import MainNavigator from "./components/Navigation";
import { CommunityProvider } from "./components/Contexts/CommunityContext";
import { DashboardContext, DashboardProvider } from "./components/Contexts/DashboardContext";

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <StatusBar barStyle="dark-content" />
      <CommunityProvider>
        <DashboardProvider>
          <NavigationContainer>
            <AuthModal />
            <MainNavigator />
          </NavigationContainer>
        </DashboardProvider>
      </CommunityProvider>
    </NativeBaseProvider>
  );
}
