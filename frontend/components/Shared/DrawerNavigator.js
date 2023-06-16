import { View, Text, SafeAreaView, ImageBackground, Animated } from "react-native";
import { React, useState } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import AboutPage from "../Pages/AboutPage/AboutPage";
import TestimonialsPage from "../Pages/TestimonialsPage/TestimonialsPage";
import TeamsPage from "../Pages/TeamsPage/TeamsPage";
import ServiceProvidersPage from "../Pages/ServiceProvidersPage/ServiceProvidersPage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNavigator from "./TabNavigator";
import { getHeaderTitle } from "@react-navigation/elements";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Button, Image, Container, Center, HStack, VStack, Spacer, Pressable } from "native-base";

const Drawer = createDrawerNavigator();

const dataArray = [
    {title: 'Resources', content: 'Test'}
];

const drawerItems = [
    {"name": "Community", "icon": "home-outline", "dropdown": false, "route": "Community", "dropdownItems": []},
    {"name": "About Us", "icon": "information-circle-outline", "dropdown": true, "route": "", "dropdownItems": [
        {"name": "Our Mission", "icon": "", "dropdown": false, "route": "About", "dropdownItems": []},
    ]},
    {"name": "Testimonials", "icon": "chatbox-outline", "dropdown": false, "route": "Testimonials", "dropdownItems": []},
    {"name": "Teams", "icon": "people-outline", "dropdown": false, "route": "About", "dropdownItems": []},
    {"name": "Resources", "icon": "document-text-outline", "dropdown": true, "route": "", "dropdownItems": [
        {"name": "Service Providers", "icon": "", "dropdown": false, "route": "Service Providers", "dropdownItems": []},
    ]},
    {"name": "Contact Us", "icon": "at-circle-outline", "dropdown": false, "route": "About", "dropdownItems": []},
]

function CustomDrawerContent(props) {
    [expanded, setExpanded] = useState({"About Us": false, "Resources": false});

    return (
        <SafeAreaView style={{flex: 1}} forceInset={{top: "always", horizontal: "never"}}> 
            <DrawerContentScrollView {...props} >
                <Center p={4} maxHeight={200}>
                    <Image
                        source={require("../../assets/images/cooler-concord.png")}
                        alt="Community Logo"
                        resizeMode="contain"
                        height="full"
                        width="full"
                    />
                </Center>
                {/* <DrawerItemList {...props} /> */}
                {
                    drawerItems.map((item, index) => {
                        if (item.dropdown) {
                            return (
                                <VStack key={index}>
                                    <Pressable onPress={() => {setExpanded({"About Us": item.name === "About Us" ? !expanded["About Us"] : expanded["About Us"], "Resources": item.name === "Resources" ? !expanded["Resources"] : expanded["Resources"]})}}>
                                        <HStack alignItems="center">
                                            <DrawerItem 
                                                label={item.name} 
                                                onPress={() => {setExpanded({"About Us": item.name === "About Us" ? !expanded["About Us"] : expanded["About Us"], "Resources": item.name === "Resources" ? !expanded["Resources"] : expanded["Resources"]})}}
                                                icon={({ focused, color, size }) => {
                                                    return (
                                                        <Ionicons name={item.icon} size={size} color={color} />
                                                    )
                                                }}
                                                style={{flex: 1}}
                                                // focused={({ focused, color }) => focused}
                                                />
                                            <Center p={3}>
                                                <Ionicons name={expanded[item.name] ? "chevron-up-outline" : "chevron-down-outline"} color="black"/>
                                            </Center>
                                        </HStack>
                                    </Pressable>
                                {
                                    item.dropdownItems.map((dropdownItem, index2) => {
                                            if (expanded[item.name]) {
                                                return (
                                                    <DrawerItem 
                                                        label={dropdownItem.name} 
                                                        onPress={() => props.navigation.navigate(dropdownItem.route)}
                                                        style={{flex: 1, marginLeft: 65}}
                                                        // focused={({ focused, color }) => focused}
                                                        key={index2}
                                                    />
                                                )
                                        }
                                    })
                                }
                            </VStack>
                            )
                        }
                        else {
                            return (
                                <DrawerItem 
                                    label={item.name} 
                                    onPress={() => props.navigation.navigate(item.route)}
                                    icon={({ focused, color, size }) => {
                                        return (
                                            <Ionicons name={item.icon} size={size} color={color} />
                                        )
                                    }}
                                    key={index}
                                    // focused={({ focused, color }) => focused}
                                />
                            )
                        }
                    })
                }
            </DrawerContentScrollView>
            <Button m="4" bg="primary.400" onPress={() => props.navigation.navigate("welcome")}>Login/Signup</Button>
        </SafeAreaView>
    )
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

        drawerContent={props => <CustomDrawerContent {...props} />}
    >
        <Drawer.Screen name="Community" component={TabNavigator} screenOptions={{headerTitle: "COMMUNITY"}} />
        <Drawer.Screen name="About" component={AboutPage} />
        <Drawer.Screen name="Testimonials" component={TestimonialsPage} />
        <Drawer.Screen name="Teams" component={TeamsPage} />
        <Drawer.Screen name="Service Providers" component={ServiceProvidersPage} />
    </Drawer.Navigator>
  );
}
