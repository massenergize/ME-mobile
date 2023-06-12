import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutPage from "../Pages/AboutPage/AboutPage";
import TestimonialsPage from "../Pages/TestimonialsPage/TestimonialsPage";
import TeamsPage from "../Pages/TeamsPage/TeamsPage";
import ServiceProvidersPage from "../Pages/ServiceProvidersPage/ServiceProvidersPage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNavigator from "./TabNavigator";
import { getHeaderTitle } from "@react-navigation/elements";

const Drawer = createDrawerNavigator();

export default function CommunityNavigation() {
  return (
    <Drawer.Navigator 
        screenOptions={({ navigation, route, options }) => ({
            // const title = getHeaderTitle(options, route.name);
        
            // return title;
            drawerActiveTintColor: "#64B058",
            headerTintColor: "#000000",
        })}
    >
        <Drawer.Screen name="Community" component={TabNavigator} />
        <Drawer.Screen name="About" component={AboutPage} />
        <Drawer.Screen name="Testimonials" component={TestimonialsPage} />
     
    </Drawer.Navigator>
  );
}
