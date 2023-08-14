import { SafeAreaView } from "react-native";
import { React, useState, useEffect, useContext } from "react";
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItem 
} from "@react-navigation/drawer";
import AboutPage from "../Pages/AboutPage/AboutPage";
import TestimonialsPage from "../Pages/TestimonialsPage/TestimonialsPage";
import TeamsPage from "../Pages/TeamsPage/TeamsPage";
import ServiceProvidersPage from "../Pages/ServiceProvidersPage/ServiceProvidersPage";
import ContactUsPage from "../Pages/ContactUsPage/ContactUsPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./TabNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  Text,
  Button,
  Image,
  Center,
  HStack,
  VStack,
  Pressable,
  Modal,
  Icon,
  Box,
  Progress
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import AuthModalController from "../Pages/Auth/AuthModalController";
import useAuth from "../Hooks/useAuth";
import { CommunityContext } from "../Contexts/CommunityContext";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  [expanded, setExpanded] = useState({ "About Us": false, Resources: false });
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const { user, signOut } = useAuth();

  const { community_id, communityInfo, testimonialsSettings, vendorsSettings, teamsSettings } = props;

  const getDrawerItems = () => {
    // drawerItem object
     // name: name of the drawer item to be displayed in the sidebar
     // icon: icon to be displayed next to the name
     // dropdown: boolean to determine if the drawer item is a dropdown (if a dropdown, there is no route)
     // route: route to navigate to when the drawer item is clicked
     // dropdownItems: array of drawerItem objects to be displayed in the dropdown (dropDown items do not have icons)
    // currently all dropdown items are empty because we only had one page in each of the dropdowns
    // the dropdown items we would have are "About Us" and "Resources"

    // Community and About Us are displayed by default
    const drawerItems = [
      {
        name: "Community",
        icon: "home-outline",
        dropdown: false,
        route: "Community",
        dropdownItems: [],
      },
      {
        name: "About Us",
        icon: "information-circle-outline",
        dropdown: false,
        route: "About",
        dropdownItems: []
      }
    ]
    // add pages if they are published
    if (testimonialsSettings.is_published) {
      drawerItems.push({
        name: "Testimonials",
        icon: "chatbox-outline",
        dropdown: false,
        route: "Testimonials",
        dropdownItems: [],
      })
    }
    if (teamsSettings.is_published) {
      drawerItems.push({
        name: "Teams",
        icon: "people-outline",
        dropdown: false,
        route: "Teams",
        dropdownItems: [],
      })
    }
    if (vendorsSettings.is_published) {
      drawerItems.push({
        name: "Service Providers",
        icon: "document-text-outline",
        dropdown: false,
        route: "Service Providers",
        dropdownItems: [],
      })
    }
    drawerItems.push({
      name: "Contact Us",
      icon: "at-circle-outline",
      dropdown: false,
      route: "Contact Us",
      dropdownItems: [],
    })
    return drawerItems
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <DrawerContentScrollView {...props}>
        <Center p={4} maxHeight={200}>
          <Image
            source={{uri: communityInfo?.logo.url}}
            alt="Community Logo"
            resizeMode="contain"
            height="full"
            width="full"
          />
        </Center>
        {getDrawerItems().map((item, index) => {
          if (item.dropdown) {
            // dropdown items
            return (
              <VStack key={index}>
                <Pressable
                  onPress={() => {
                    // toggle the dropdown for the "About Us" or "Resources" drawer item
                    setExpanded({
                      "About Us":
                        item.name === "About Us"
                          ? !expanded["About Us"]
                          : expanded["About Us"],
                      Resources:
                        item.name === "Resources"
                          ? !expanded["Resources"]
                          : expanded["Resources"],
                    });
                  }}
                >
                  <HStack alignItems="center">
                    <DrawerItem
                      label={item.name}
                      onPress={() => {
                        setExpanded({
                          "About Us":
                            item.name === "About Us"
                              ? !expanded["About Us"]
                              : expanded["About Us"],
                          Resources:
                            item.name === "Resources"
                              ? !expanded["Resources"]
                              : expanded["Resources"],
                        });
                      }}
                      icon={({ focused, color, size }) => {
                        return (
                          <Ionicons
                            name={item.icon}
                            size={size}
                            color={color}
                          />
                        );
                      }}
                      style={{ flex: 1 }}
                    />
                    <Center p={3}>
                      <Ionicons
                        name={
                          expanded[item.name]
                            ? "chevron-up-outline"
                            : "chevron-down-outline"
                        }
                        color="black"
                      />
                    </Center>
                  </HStack>
                </Pressable>
                {item.dropdownItems.map((dropdownItem, index2) => {
                  if (expanded[item.name]) {
                    return (
                      <DrawerItem
                        label={dropdownItem.name}
                        onPress={() =>
                          props.navigation.navigate(dropdownItem.route, {
                            community_id: community_id,
                          })
                        }
                        style={{ flex: 1, marginLeft: 65 }}
                        key={index2}
                      />
                    );
                  }
                })}
              </VStack>
            );
          } else {
            // non-dropdown items
            return (
              <DrawerItem
                label={item.name}
                onPress={() => 
                  (item.name === "Community") 
                  ? props.navigation.navigate(item.route, {community_id: community_id, screen: "COMMUNITY"}) 
                  : props.navigation.navigate(item.route, {
                    community_id: community_id,
                  })
                }
                icon={({ focused, color, size }) => {
                  return (
                    <Ionicons name={item.icon} size={size} color={color} />
                  );
                }}
                key={index}
              />
            );
          }
        })}
      </DrawerContentScrollView>
      {user ? (
        // sign out modal
        <Button
          mb={2}
          mt={0}
          m={4}
          bg="primary.400"
          onPress={() => setIsSignOutModalVisible(true)}
        >
          LOGOUT
        </Button>
      ) : (
        // sign in modal
        <Button
          mb={2}
          mt={0}
          m={4}
          bg="primary.400"
          onPress={() => AuthModalController.showModal()}
        >
          LOGIN
        </Button>
      )}
      {/* switch communities button */}
      <Button
        mb={2}
        mt={0}
        m={4}
        variant="outline"
        onPress={() => props.navigation.navigate("communitySearch")}
      >
        SWITCH COMMUNITIES
      </Button>
      {/* Modal for confirming sign out */}
      <Modal
        isOpen={isSignOutModalVisible}
        onClose={() => setIsSignOutModalVisible(false)}
        size="lg"
      >
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center>
              <Icon
                as={FontAwesome}
                name="sign-out"
                size="90"
                color="primary.600"
              />
              <Text fontSize="lg" fontWeight="bold" py="5">
                Are you sure?
              </Text>
              <HStack space="5">
                <Button
                  onPress={() => {
                    setIsSignOutModalVisible(false);
                    signOut();
                  }}
                >
                  Sign Me Out!
                </Button>
                <Button
                  backgroundColor="muted.400"
                  onPress={() => setIsSignOutModalVisible(false)}
                >
                  Go Back
                </Button>
              </HStack>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}

export default function DrawerNavigator({ route, navigation }) {
    const { community_id } = route.params;

    const [isCommunityLoading, setIsCommunityLoading] = useState(true);
    const { communityInfo, fetchCommunityInfo, vendorsSettings, teamsSettings, testimonialsSettings, infoLoaded } = useContext(CommunityContext);

    // fetch community info on the drawer load (first screen loaded associated with the community)
    useEffect(() => {
      fetchCommunityInfo(community_id, () => setIsCommunityLoading(false))
    }, []);

    if (!isCommunityLoading) {
      return (
          <Drawer.Navigator 
              screenOptions={({ navigation, route, options }) => ({
                  drawerActiveTintColor: "#64B058",
                  headerTintColor: "#000000",
                  headerTitle: getFocusedRouteNameFromRoute(route), // make header title that of the current tab
                  headerTitleAlign: "center",
              })}

              // custom drawer content created above
              drawerContent={
                props => 
                  <CustomDrawerContent 
                    {...props} 
                    community_id={community_id} 
                    communityInfo={communityInfo} 
                    vendorsSettings={vendorsSettings}
                    testimonialsSettings={testimonialsSettings}
                    teamsSettings={teamsSettings}/>}
          >
          {/* routes in the drawer */}
          <Drawer.Screen
              name="Community"
              component={TabNavigator}
              screenOptions={{ headerTitle: "COMMUNITY" }}
              initialParams={{community_id: community_id}}
          />
          <Drawer.Screen 
            name="About" 
            component={AboutPage} 
          />
          <Drawer.Screen 
              name="Testimonials" 
              component={TestimonialsPage} 
              options={{
              headerTitle: "TESTIMONIALS",
              headerRight: () => (
                  <Ionicons 
                    name={"filter"} 
                    color="black" 
                    marginRight={15} 
                    size={20}
                  />
              )
              }}
          />
          <Drawer.Screen 
            name="Teams" 
            component={TeamsPage} 
          />
          <Drawer.Screen
              name="Service Providers"
              component={ServiceProvidersPage}
          />
          <Drawer.Screen 
            name="Contact Us" 
            component={ContactUsPage} 
          />
          </Drawer.Navigator>
      );
    }
    else {
      return <Center alignContent="center" height="100%" justifyContent="center">
        <Text bold mb={3} fontSize="lg">Loading Community...</Text>
        <Box width="50%">
          <Progress value={(infoLoaded/12)*100} />
        </Box>
      </Center>
    }
}
