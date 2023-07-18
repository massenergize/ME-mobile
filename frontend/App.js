import "expo-dev-client";
import React, { useEffect } from "react";

import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";

import Theme from "./components/Shared/Theme";
import AuthModal from "./components/Pages/Auth/AuthModal";
import MainNavigator from "./components/Navigation";
import { CommunityProvider } from "./components/Contexts/CommunityContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function App() {
  const _configureGoogleSignin = () => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_REACT_APP_WEB_CLIENT_ID,
      offlineAccess: false,
    });
  };

  useEffect(() => {
    _configureGoogleSignin();
  }, []);

  return (
    <NativeBaseProvider theme={Theme}>
      <StatusBar barStyle="dark-content" />
      <CommunityProvider>
        <NavigationContainer>
          <AuthModal />
          <MainNavigator />
        </NavigationContainer>
      </CommunityProvider>
    </NativeBaseProvider>
  );
}
