import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunityPage from "../Pages/CommunityPage/CommunityPage";
import ActionsPage from "../Pages/ActionsPage/ActionsPage";
import EventsPage from "../Pages/EventsPage/EventsPage";
import UserProfilePage from "../Pages/UserProfilePage/UserProfilePage";
import AboidersPage from "../Pages/ServiceProvidersPage/ServiceProvidersPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import DashboardPage from "../Pages/UserProfilePage/DashboardPage";

const Tab = createBottomTabNavigator();

const tabBarLabels = {
  COMMUNITY: "Community",
  ACTIONS: "Actions",
  EVENTS: "Events",
  PROFILE: "Profile",
};

export default function TabNavigator({ route, navigation }) {
  console.log(route.params);
  const { community_id } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "COMMUNITY") {
            iconName = "home";
          } else if (route.name === "ACTIONS") {
            iconName = "flash";
          } else if (route.name === "EVENTS") {
            iconName = "calendar";
          } else if (route.name === "PROFILE") {
            iconName = "person-circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#64B058",
        tabBarInactiveTintColor: "#B3B2BD",
        tabBarLabel: tabBarLabels[route.name],
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="COMMUNITY"
        component={CommunityPage}
        initialParams={{ community_id: community_id }}
      />
      <Tab.Screen name="ACTIONS" component={ActionsPage} />
      <Tab.Screen name="EVENTS" component={EventsPage} />
      <Tab.Screen name="PROFILE" component={DashboardPage} />
    </Tab.Navigator>
  );
}
