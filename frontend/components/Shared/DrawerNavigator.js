import { SafeAreaView } from "react-native";
import { React, useState, useEffect } from "react";
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
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AuthModalController from "../Pages/Auth/AuthModalController";
import useAuth from "../Hooks/useAuth";
import { apiCall } from "../../api/functions";

const Drawer = createDrawerNavigator();

// custom drawer in order to have the "switch communities" button at the bottom

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
    dropdown: true,
    route: "",
    dropdownItems: [
      {
        name: "Our Mission",
        icon: "",
        dropdown: false,
        route: "About",
        dropdownItems: [],
      },
    ],
  },
  {
    name: "Testimonials",
    icon: "chatbox-outline",
    dropdown: false,
    route: "Testimonials",
    dropdownItems: [],
  },
  {
    name: "Teams",
    icon: "people-outline",
    dropdown: false,
    route: "Teams",
    dropdownItems: [],
  },
  {
    name: "Resources",
    icon: "document-text-outline",
    dropdown: true,
    route: "",
    dropdownItems: [
      {
        name: "Service Providers",
        icon: "",
        dropdown: false,
        route: "Service Providers",
        dropdownItems: [],
      },
    ],
  },
  {
    name: "Contact Us",
    icon: "at-circle-outline",
    dropdown: false,
    route: "Contact Us",
    dropdownItems: [],
  },
];

function CustomDrawerContent(props) {
  [expanded, setExpanded] = useState({ "About Us": false, Resources: false });
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const { user, signOut } = useAuth();

  const [communityInfo, setCommunityInfo] = useState(null);
  const [isCommunityLoading, setIsCommunityLoading] = useState(true);

  const getCommuityInfo = () => {
    apiCall("communities.info", {community_id: props.community_id}).then((json) => {
      if (json.success) {
          setCommunityInfo(json.data);
          // console.log(json.data)
      } else {
          console.log(json);
      }
      setIsCommunityLoading(false);
    });
  }

  useEffect(() => {
    getCommuityInfo();
  }, []);
  
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
        {/* <DrawerItemList {...props} /> */}
        {drawerItems.map((item, index) => {
          if (item.dropdown) {
            return (
              <VStack key={index}>
                <Pressable
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
                            community_id: props.community_id,
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
            return (
              <DrawerItem
                label={item.name}
                onPress={() => 
                  props.navigation.navigate(item.route, {
                    community_id: props.community_id,
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

    return (
        <Drawer.Navigator 
            screenOptions={({ navigation, route, options }) => ({
                drawerActiveTintColor: "#64B058",
                headerTintColor: "#000000",
                headerTitle: getFocusedRouteNameFromRoute(route), // make header title that of the current tab
                headerTitleAlign: "center",
            })}

            drawerContent={props => <CustomDrawerContent {...props} community_id={community_id} />}
        >
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
