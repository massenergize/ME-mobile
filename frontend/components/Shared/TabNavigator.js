import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import ActionsPage from "../Pages/ActionsPage/ActionsPage";
import CommunityPage from "../Pages/CommunityPage/CommunityPage";
import DashboardPage from "../Pages/UserProfilePage/DashboardPage";
import EventsPage from "../Pages/EventsPage/EventsPage";

const Tab = createBottomTabNavigator();

const tabBarLabels = {
  COMMUNITY: "Community",
  ACTIONS: "Actions",
  EVENTS: "Events",
  PROFILE: "Profile",
};

export default function TabNavigator() {
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
        />
      <Tab.Screen 
        name="ACTIONS" 
        component={ActionsPage} 
        />
      <Tab.Screen 
        name="EVENTS" 
        component={EventsPage} 
        />
      <Tab.Screen 
        name="PROFILE" 
        component={DashboardPage} />
      {/* <Tab.Screen name="PROFILE" component={ProfileScreenWithNavigationCheck} /> */}
  </Tab.Navigator>
  )
}
function ProfileScreenWithNavigationCheck() {
  const navigation = useNavigation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      if (e.target === "PROFILE" && !getSiso()) {
        setShowAuthModal(true);
        e.preventDefault(); // Prevent the default navigation action
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleNavigationAfterModal = () => {
    setShowAuthModal(false); // Hide the modal
    // Navigate to the Dashboard screen here
    // For example, navigation.navigate("Dashboard");
  };

  if (showAuthModal) {
    return (
      <AuthModalController.showModal
        onClose={handleNavigationAfterModal}
      />
    );
  }

  return <DashboardPage />;
}