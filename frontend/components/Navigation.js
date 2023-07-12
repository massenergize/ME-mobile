import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "./Pages/Auth/SignupPage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ActionsPage from "./Pages/ActionsPage/ActionsPage";
import CommunityPage from "./Pages/CommunityPage/CommunityPage";
import TestimonialsPage from "./Pages/TestimonialsPage/TestimonialsPage";
import Testimonial from "./Pages/TestimonialsPage/Testimonial";
import AddTestimonial from "./Pages/TestimonialsPage/AddTestimonial";
import TeamsPage from "./Pages/TeamsPage/TeamsPage";
import UserProfilePage from "./Pages/UserProfilePage/UserProfilePage";
import EventsPage from "./Pages/EventsPage/EventsPage";
import ImpactPage from "./Pages/CommunityPage/ImpactPage";
import ActionDetails from "./Pages/ActionsPage/ActionDetails";
import EventDetailsPage from "./Pages/EventsPage/EventDetailsPage";
import OnboardingPage from "./Pages/OnboardingPage/OnboardingPage";
import DrawerNavigator from "./Shared/DrawerNavigator";
import ServiceProvidersPage from "./Pages/ServiceProvidersPage/ServiceProvidersPage";
import ServiceProviderDetailsPage from "./Pages/ServiceProvidersPage/ServiceProviderDetailsPage";
import CommunitySearchPage from "./Pages/CommunitySearchPage/CommunitySearchPage";
import WithEmailOnlyPage from "./Pages/Auth/WithEmailOnlyPage";
import CreateProfilePage from "./Pages/UserProfilePage/CreateProfilePage";
import TeamDetailsPage from "./Pages/TeamsPage/TeamDetailsPage";
import TabNavigator from "./Shared/TabNavigator";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";

const Stack = createNativeStackNavigator();

const screenOptions = {
  // headerShown: false,
};

/**
 * This stack can be viewed by anyone, even if they are not logged in.
 */
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="onboarding"
        component={OnboardingPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createProfile"
        component={CreateProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={LoginPage}
        options={{ title: "Profile" }}
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
      <Stack.Screen
        name="actiondetails"
        component={ActionDetails}
        options={{ headerTitle: "ACTION", headerTitleAlign: "center" }}
      />
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
      <Stack.Screen name="serviceProviders" component={ServiceProvidersPage} />
      <Stack.Screen
        name="serviceProviderDetails"
        component={ServiceProviderDetailsPage}
      />
      <Stack.Screen name="tab" component={TabNavigator} />
      <Stack.Screen name="settings" component={SettingsPage} />
      <Stack.Screen
        name="drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
