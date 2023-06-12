import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunityPage from "../Pages/CommunityPage/CommunityPage";
import ActionsPage from "../Pages/ActionsPage/ActionsPage";
import EventsPage from "../Pages/EventsPage/EventsPage";
import UserProfilePage from "../Pages/UserProfilePage/UserProfilePage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PersonIcon} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function CommunityNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "community") {
            iconName = "home";
          }
          else if (route.name === "actions") {
            iconName = "flash";
          }
          else if (route.name === "events") {
            iconName = "calendar";
          }
          else if (route.name === "userProfile") {
            iconName = "person-circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#64B058",
        tabBarInactiveTintColor: "#B3B2BD",
        tabBarShowLabel: false,
      })
    }
    >
      <Tab.Screen name="community" component={CommunityPage} />
      <Tab.Screen name="actions" component={ActionsPage} />
      <Tab.Screen name="events" component={EventsPage} />
      <Tab.Screen name="userProfile" component={UserProfilePage} />
    </Tab.Navigator>
  );
}
