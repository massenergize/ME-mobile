import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunityPage from "../Pages/CommunityPage/CommunityPage";
import ActionsPage from "../Pages/ActionsPage/ActionsPage";
import EventsPage from "../Pages/EventsPage/EventsPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import DashboardPage from "../Pages/UserProfilePage/DashboardPage";

const Tab = createBottomTabNavigator();

const tabBarLabels = {
  COMMUNITY: "Community",
  ACTIONS: "Actions",
  EVENTS: "Events",
  DASHBOARD: "Dashboard",
};

export default function TabNavigator({ route }) {
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
          } else if (route.name === "DASHBOARD") {
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
      <Tab.Screen name="DASHBOARD" component={DashboardPage} />
    </Tab.Navigator>
  );
}
