import React from "react";

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

import WelcomePage from "./components/Pages/Auth/WelcomePage";
import LoginPage from "./components/Pages/Auth/LoginPage";
import SignupPage from "./components/Pages/Auth/SignupPage";
import "react-native-gesture-handler";
import AboutPage from "./components/Pages/AboutPage/AboutPage";
import ActionsPage from "./components/Pages/ActionsPage/ActionsPage";
import CommunityPage from "./components/Pages/CommunityPage/CommunityPage";
import TestimonialsPage from "./components/Pages/TestimonialsPage/TestimonialsPage";
import TeamsPage from "./components/Pages/TeamsPage/TeamsPage";
import UserProfilePage from "./components/Pages/UserProfilePage/UserProfilePage";
import EventsPage from "./components/Pages/EventsPage/EventsPage";
import IntroductionPage from "./components/Pages/IntroductionPage/IntroductionPage";
import DrawerNavigator from "./components/Shared/DrawerNavigator";
import Theme from "./components/Shared/Theme";
import ChooseCommunityPage from "./components/Pages/ChooseCommunityPage/ChooseCommunityPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="intro" component={IntroductionPage} />
          <Stack.Screen name="welcome" component={WelcomePage} />
          <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen name="signup" component={SignupPage} />
          <Stack.Screen
            name="chooseCommunity"
            component={ChooseCommunityPage}
          />
          <Stack.Screen name="userProfile" component={UserProfilePage} />
          <Stack.Screen name="about" component={AboutPage} />
          <Stack.Screen name="actions" component={ActionsPage} />
          <Stack.Screen name="testimonials" component={TestimonialsPage} />
          <Stack.Screen name="events" component={EventsPage} />
          <Stack.Screen name="community" component={CommunityPage} />
          <Stack.Screen name="teams" component={TeamsPage} />
          <Stack.Screen
            name="drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
