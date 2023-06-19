import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AboutPage from "../Pages/AboutPage/AboutPage";
import TestimonialsPage from "../Pages/TestimonialsPage/TestimonialsPage";
import TeamsPage from "../Pages/TeamsPage/TeamsPage";
import ServiceProvidersPage from "../Pages/ServiceProvidersPage/ServiceProvidersPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./TabNavigator";
import { getHeaderTitle } from "@react-navigation/elements";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Button } from "native-base";

const Drawer = createDrawerNavigator();

const dataArray = [{ title: "Resources", content: "Test" }];

function CustomDrawerContent(props) {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Button
        m="4"
        bg="primary.400"
        onPress={() => props.navigation.navigate("welcome")}
      >
        JOIN
      </Button>
      <Button
        variant="outline"
        m="4"
        onPress={() => props.navigation.navigate("chooseCommunity")}
      >
        SWITCH COMMUNITIES
      </Button>
    </SafeAreaView>
  );
}

export default function CommunityNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation, route, options }) => ({
        drawerActiveTintColor: "#64B058",
        headerTintColor: "#000000",
        headerTitle: getFocusedRouteNameFromRoute(route),
        headerTitleAlign: "center",
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Community"
        component={TabNavigator}
        screenOptions={{ headerTitle: "COMMUNITY" }}
      />
      <Drawer.Screen name="About" component={AboutPage} />
      <Drawer.Screen name="Testimonials" component={TestimonialsPage} />
      <Drawer.Screen name="Teams" component={TeamsPage} />
      <Drawer.Screen
        name="Service Providers"
        component={ServiceProvidersPage}
      />
    </Drawer.Navigator>
  );
}
