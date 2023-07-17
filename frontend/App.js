import React from "react";

import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";

import Theme from "./components/Shared/Theme";
import AuthModal from "./components/Pages/Auth/AuthModal";
import MainNavigator from "./components/Navigation";
import { CommunityProvider } from "./components/Contexts/CommunityContext";

// in order to close the popup window on web.
// see https://docs.expo.dev/versions/latest/sdk/auth-session/#useauthrequestconfig-discovery
WebBrowser.maybeCompleteAuthSession();

export default function App() {
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
