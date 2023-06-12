import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomePage from "./components/Pages/WelcomePage/WelcomePage";
import AboutPage from "./components/Pages/AboutPage/AboutPage";
import ActionsPage from "./components/Pages/ActionsPage/ActionsPage";
import CommunityPage from "./components/Pages/CommunityPage/CommunityPage";
import TestimonialsPage from "./components/Pages/TestimonialsPage/TestimonialsPage";
import TeamsPage from "./components/Pages/TeamsPage/TeamsPage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import UserProfilePage from "./components/Pages/UserProfilePage/UserProfilePage";
import EventsPage from "./components/Pages/EventsPage/EventsPage";
import CommunityNavigation from "./components/Shared/CommunityNavigation";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="welcome" component={WelcomePage} />
          <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen name="userProfile" component={UserProfilePage} />
          <Stack.Screen name="about" component={AboutPage} />
          <Stack.Screen name="actions" component={ActionsPage} />
          <Stack.Screen name="testimonials" component={TestimonialsPage} />
          <Stack.Screen name="events" component={EventsPage} />
          <Stack.Screen name="community" component={CommunityPage} />
          <Stack.Screen name="teams" component={TeamsPage} />
          <Stack.Screen name="communityNavigation" component={CommunityNavigation} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
