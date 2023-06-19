import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";

import Theme from "./components/Shared/Theme";
import WelcomePage from "./components/Pages/Auth/WelcomePage";
import LoginPage from "./components/Pages/Auth/LoginPage";
import SignupPage from "./components/Pages/Auth/SignupPage";
import AboutPage from "./components/Pages/AboutPage/AboutPage";
import ActionsPage from "./components/Pages/ActionsPage/ActionsPage";
import CommunityPage from "./components/Pages/CommunityPage/CommunityPage";
import TestimonialsPage from "./components/Pages/TestimonialsPage/TestimonialsPage";
import Testimonial from "./components/Pages/TestimonialsPage/Testimonial";
import TeamsPage from "./components/Pages/TeamsPage/TeamsPage";
import UserProfilePage from "./components/Pages/UserProfilePage/UserProfilePage";
import EventsPage from "./components/Pages/EventsPage/EventsPage";
import ActionDetails from "./components/Pages/ActionsPage/ActionDetails";
import EventDetailsPage from "./components/Pages/EventsPage/EventDetailsPage";
import IntroductionPage from "./components/Pages/IntroductionPage/IntroductionPage";
import DrawerNavigator from "./components/Shared/DrawerNavigator";
import ChooseCommunityPage from "./components/Pages/ChooseCommunityPage/ChooseCommunityPage";
import WithEmailOnlyPage from "./components/Pages/Auth/WithEmailOnlyPage";
import CreateProfile from "./components/Pages/UserProfilePage/CreateProfile";
import TabNavigator from "./components/Shared/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={Theme} >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="intro"
            component={IntroductionPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="welcome"
            component={WelcomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={LoginPage}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name="createProfile"
            component={CreateProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="chooseCommunity"
            component={ChooseCommunityPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="signup" component={SignupPage} />
          <Stack.Screen name="withEmailOnly" component={WithEmailOnlyPage} />
          <Stack.Screen name="userProfile" component={UserProfilePage} />
          <Stack.Screen name="about" component={AboutPage} />
          <Stack.Screen name="events" component={EventsPage} />
          <Stack.Screen
            name="eventDetails"
            component={EventDetailsPage}
            options={{ title: "" }}
          />
          <Stack.Screen name="actions" component={ActionsPage} />
          <Stack.Screen name="actiondetails" component={ActionDetails} />
          <Stack.Screen name="testimonials" component={TestimonialsPage} />
          <Stack.Screen name="testimonial" component={Testimonial} options={{ headerTitle: "TESTIMONIAL", headerTitleAlign: "center"}}/>
          <Stack.Screen name="community" component={CommunityPage} />
          <Stack.Screen name="teams" component={TeamsPage}/>
          <Stack.Screen
            name="drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tab"
            component={TabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
