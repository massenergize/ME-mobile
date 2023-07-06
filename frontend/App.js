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
import AddTestimonial from "./components/Pages/TestimonialsPage/AddTestimonial";
import TeamsPage from "./components/Pages/TeamsPage/TeamsPage";
import UserProfilePage from "./components/Pages/UserProfilePage/UserProfilePage";
import EventsPage from "./components/Pages/EventsPage/EventsPage";
import ImpactPage from "./components/Pages/CommunityPage/ImpactPage";
import ActionDetails from "./components/Pages/ActionsPage/ActionDetails";
import EventDetailsPage from "./components/Pages/EventsPage/EventDetailsPage";
import OnboardingPage from "./components/Pages/OnboardingPage/OnboardingPage";
import DrawerNavigator from "./components/Shared/DrawerNavigator";
import ServiceProvidersPage from "./components/Pages/ServiceProvidersPage/ServiceProvidersPage";
import ServiceProviderDetailsPage from "./components/Pages/ServiceProvidersPage/ServiceProviderDetailsPage";
import CommunitySearchPage from "./components/Pages/CommunitySearchPage/CommunitySearchPage";
import WithEmailOnlyPage from "./components/Pages/Auth/WithEmailOnlyPage";
import CreateProfile from "./components/Pages/UserProfilePage/CreateProfile";
import TeamDetailsPage from "./components/Pages/TeamsPage/TeamDetailsPage";
import TabNavigator from "./components/Shared/TabNavigator";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="onboarding"
            component={OnboardingPage}
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
          <Stack.Screen name="actiondetails" component={ActionDetails} options={{ headerTitle: "ACTION", headerTitleAlign: "center"}}/>
          <Stack.Screen name="testimonials" component={TestimonialsPage} />
          <Stack.Screen
            name="testimonial"
            component={Testimonial}
            options={{ headerTitle: "TESTIMONIAL", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="addTestimonial"
            component={AddTestimonial}
            options={{ headerTitle: "TESTIMONIAL", headerTitleAlign: "center" }}
          />
          <Stack.Screen name="community" component={CommunityPage} />
          <Stack.Screen
            name="communitySearch"
            component={CommunitySearchPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="teamDetails" component={TeamDetailsPage} />
          <Stack.Screen name="teams" component={TeamsPage} />
          <Stack.Screen
            name="impact"
            component={ImpactPage}
            options={{ headerTitle: "IMPACT", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="serviceProviders"
            component={ServiceProvidersPage}
          />
          <Stack.Screen
            name="serviceProviderDetails"
            component={ServiceProviderDetailsPage}
          />
          <Stack.Screen name="tab" component={TabNavigator} />
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
