import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native'
import { useNavigation, useEffect, createContext, useContext, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  Button,
  View,
  Text,
  Image,
  Box,
  Flex,
  ScrollView,
  Divider,
  VStack,
  Avatar,
  Center,
  Icon,
  Spinner,
  HStack,
  Pressable,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Page from "../../Shared/Page";
import ActionCard from "../ActionsPage/ActionCard";
import CommunityCard from "../CommunitySearchPage/CommunityCard";
import ActionsFilter from "../ActionsPage/ActionsFilter";
import { getActionMetric } from "../../Shared/Utils";
import { CommunityContext } from "../../Contexts/CommunityContext";
import { DashboardContext } from "../../Contexts/DashboardContext";
import { RefreshControl } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDashboardContext } from "../../Contexts/DashboardContext";
import { apiCall } from "../../../api/functions";
// import { convertAbsoluteToRem } from "native-base/lib/typescript/theme/tools";


const ProfileName = ({ navigation, communityInfo, userName }) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRir06bApyiBCEsxHMGNWtcxEZGCLYj5vdcxQ&usqp=CAU",
        }}
        alt="User avatar"
        size="20"
        rounded="full"
      />
      <Box alignItems="center">
        <Text fontSize="xl">{userName || "Your Name"}</Text>
        <Text>{communityInfo.name}</Text>
      </Box>
      <Pressable onPress={() => navigation.navigate("settings")}>
        <Icon as={FontAwesome} name="cog" size="lg" />
      </Pressable>
    </Flex>
  );
};

const SustainScore = (CarbonSaved) => {
  return (
    <Box>
      <Text fontSize="4xl" color="primary.400" textAlign="center">
        {parseFloat(50.0 + (Math.sqrt(100+CarbonSaved.CarbonSaved.length*20))).toFixed(1)}
      </Text>
      <Text fontSize="lg" fontWeight="light" textAlign="center">
        Sustainability Score
      </Text>
    </Box>
  );
};

const CarbonSaved = (CarbonSaved) => {
  console.log("HERE: ", CarbonSaved.CarbonSaved.length);
  return (
    <Flex flexDirection="row" justifyContent="space-evenly" width="full">
      <Box alignItems="center">
        <Text fontSize="lg" fontWeight="medium">
          {CarbonSaved.CarbonSaved.length}
        </Text>
        <Text>CO2 Saved</Text>
      </Box>
      <Divider orientation="vertical" />
      <Box alignItems="center">
        <Text fontSize="lg" fontWeight="medium">
          {CarbonSaved.CarbonSaved.length/10}
        </Text>
        <Text>Trees</Text>
      </Box>
      <Divider orientation="vertical" />
      <Box alignItems="center">
        <Text fontSize="lg" fontWeight="medium">
          {CarbonSaved.CarbonSaved.length*10}
        </Text>
        <Text>Points</Text>
      </Box>
    </Flex>
  );
};

const ActionsList = ({ navigation, list }) => {
  // const [toDoList, setToDoList] = useState([]);
  // // apiCall("users.actions.todo.list").then((json) => {s
  // //   if (json.success) {
  // //     console.log(json.data);
  // //     // const actionTitles = json.data.map(item=>item.action.title);
  // //     const actionTitles = json.data;
  // //     console.log(json.data[0].action.title);
  // //     console.log("Todo List Fetched");
  // //     setToDoList(actionTitles);
  // //     // console.log(actionTitles);
  // //     // console.log(toDoList.length);
  // //   } else {
  // //     console.log("Action Todo List Failed");
  // //     console.log(json);
  // //     if (callBackFn) callBackFn(null, json.error);
  // //   }
  // // });
  // setToDoList(list);
  // // const { actions } = userInfo.completedList;
  // const { actions } = useContext(CommunityContext);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (toDoList) {
  //     setIsLoading(false);
  //   }
  // }, []);  
  // // const actions = useContext(CommunityContext);
  // // const [actions, setActions] = useState([
  // //   ACTION,
  // //   ACTION,
  // //   ACTION,
  // //   ACTION,
  // //   ACTION,
  // //   ACTION,
  // // ]);

  const todoList = list.map(item => item.action);
  // const { actions } = userInfo.completedList;
  const { actions } = useContext(CommunityContext);
  // console.log(actions[0]);
  // console.log(list[0].action);
  // console.log(list[1]);
  // console.log(todoList[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (todoList) {
      setIsLoading(false);
    }
  }, []);  

  return (
    <Box>
      <ActionsFilter />
      <ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
              {todoList.map((action, index) => {
                return (
                  <ActionCard
                    key={index}
                    navigation={navigation}
                    id={action.id}
                    title={action.title}
                    imgUrl={action.image?.url}
                    impactMetric={getActionMetric(action, "Impact")}
                    costMetric={getActionMetric(action, "Cost")}
                  />
                );
              })}
            </HStack>
          </ScrollView>
      </ScrollView>
    </Box>
  );
};

const BadgesList = () => {
  return (
    <Center>
      <Text fontSize="lg" fontWeight="bold" mb="5">
        Badges
      </Text>
      <Avatar.Group max={3}>
        <Avatar
          ACTION
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
      </Avatar.Group>
    </Center>
  );
};

const TeamsList = () => {
  return (
    <Center>
      <Text fontWeight="bold" fontSize="lg" mb="5">
        My Teams
      </Text>
      <Flex width="full">
        <Flex flexDirection="row" alignItems="center">
          <Icon as={FontAwesome} name="home" size="sm" />
          <Text px="2" flexGrow={1}>
            Team 1
          </Text>
          <Icon as={FontAwesome} name="pencil" size="sm" />
        </Flex>
      </Flex>
    </Center>
  );
};

const HousesList = () => {
  return (
    <Center>
      <Text fontWeight="bold" fontSize="lg" mb="5">
        My Households
      </Text>
      <Flex width="full">
        <Flex flexDirection="row" alignItems="center">
          <Icon as={FontAwesome} name="home" size="sm" />
          <Text px="2" flexGrow={1}>
            Household 1
          </Text>
          <Icon as={FontAwesome} name="pencil" size="sm" />
        </Flex>
      </Flex>
    </Center>
  );
};

const CommunitiesList = ({ communityInfo }) => {
  const [communities, setCommunities] = useState([communityInfo]);

  return (
    <Center>
      <Text fontWeight="bold" fontSize="lg" mb="5">
        My Communities
      </Text>
      <VStack space={2}>
        {communities &&
          communities.map((community, index) => {
            return <CommunityCard community={community} key={index} />;
          })}
      </VStack>
    </Center>
  );
};

export default function DashboardPage({ navigation, route }) {
  const isFocused = useIsFocused();
  const { dashboardInfo, userInfo, infoLoaded, todoList, eventsList, householdsList, fetchDashboardInfo } = useContext(DashboardContext);
  const [toDoList, setToDoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  // apiCall("users.info").then((json) => {
  //   if (json.success) {
  //     setUserEmail(json.data.email);
  //     console.log("Fetched email: ", userEmail, " Completed")
  //   } else {
  //     console.log("User Info Failed");
  //     console.log(json);
  //     if (callBackFn) callBackFn(null, json.error);
  //   }
  // });
  // apiCall("users.actions.todo.list").then((json) => {
  //   if (json.success) {
  //     // console.log(json.data);
  //     const actionTitles = json.data.map(item=>item.action.title);
  //     // console.log(json.data[0].action.title);
  //     console.log("Todo List Fetched");
  //     setToDoList(actionTitles);
  //     // console.log(toDoList.length);
  //   } else {
  //     console.log("Action Todo List Failed");
  //     console.log(json);
  //     if (callBackFn) callBackFn(null, json.error);
  //   }
  // });
 
  
  // console.log("Num actions", toDoList.length);
  console.log(userEmail);
  const { communityInfo } = useContext(CommunityContext);
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState("");
  const [carbonSaved, setCarbonSaved] = useState(0); 
  // // const { todoList, fetchDashboardInfo } = useContext(DashboardContext);
  // // fetchDashboardInfo();

  // // const { email } = email
  // // const { userInfo, todoList, fetchDashboardInfo } = useContext(DashboardContext);

  useEffect(() => {
    if (isFocused) {
      onRefresh();
      setRefreshing(false);
    }
  }, [isFocused]);

  useEffect(() => {
    async function captureInfo() {
      await Promise.all([
        apiCall("users.info").then((json) => {
          if (json.success) {
            setUserEmail(json.data.email);
            setUserName(json.data.full_name);
            console.log("Fetched email: ", userEmail, " Completed")
          } else {
            console.log("User Info Failed");
            console.log(json);
            if (callBackFn) callBackFn(null, json.error);
          }
        }),
        apiCall("users.actions.todo.list").then((json) => {
          if (json.success) {
            // console.log(json.data);
            const actionTitles = json.data;
            // console.log(json.data[0].action.title);
            console.log("Todo List Fetched");
            setToDoList(actionTitles);
            // console.log(toDoList.length);
          } else {
            console.log("Action Todo List Failed");
            console.log(json);
            if (callBackFn) callBackFn(null, json.error);
          }
        }),
        apiCall("users.actions.completed.list").then((json) => {
          if (json.success) {
            // console.log(json.data);
            const completedTitles = json.data;
            // console.log(json.data[0].action.title);
            console.log("Completed List Fetched");
            setCarbonSaved(completedTitles.length);
            setCompletedList(completedTitles);
            console.log(completedList.length);
          } else {
            console.log("Action Completed List Failed");
            console.log(json);
            if (callBackFn) callBackFn(null, json.error);
          }
        })
      ]).then(() => {
        console.log("Fetch finished");
      })
  }

  captureInfo();
  }, []); 



  const onRefresh = useCallback (() => {
    setRefreshing(false);
    apiCall("users.info").then((json) => {
      if (json.success) {
        setUserEmail(json.data.email);
        console.log(json);
        console.log("Fetched email: ", userEmail, " Completed")
      } else {
        console.log("User Info Failed");
        console.log(json);
        if (callBackFn) callBackFn(null, json.error);
      }
    });
    apiCall("users.actions.todo.list").then((json) => {
      if (json.success) {
        // console.log(json.data);
        const actionTitles = json.data;
        // console.log(json.data[0].action.title);
        console.log("Todo List Fetched");
        setToDoList(actionTitles);
        // console.log(toDoList.length);
      } else {
        console.log("Action Todo List Failed");
        console.log(json);
        if (callBackFn) callBackFn(null, json.error);
      }
    });
    apiCall("users.actions.completed.list").then((json) => {
      if (json.success) {
        // console.log(json.data);
        const completedTitles = json.data;
        // console.log(json.data[0].action.title);
        console.log("Completed List Fetched");
        setCarbonSaved(completedTitles.length);
        setCompletedList(completedTitles);
        // console.log(toDoList.length);
      } else {
        console.log("Action Completed List Failed");
        console.log(json);
        if (callBackFn) callBackFn(null, json.error);
      }
    });
    // todoList = useContext(DashboardContext);
    // // userInfo = useContext(DashboardContext);
    // // infoLoaded = useContext(DashboardContext);
    // // todoList = useContext(DashboardContext);  
    // // eventsList = useContext(DashboardContext);
    // // householdsList = useContext(DashboardContext);
    setTimeout(() => setRefreshing(false), 5000);
  }, []);
  //   fetchCommunityInfo(community_id, () => setRefreshing(false))
  //   // setTimeout(() => setRefreshing(false), 2000);
  // }, []);


  // // const route = useRoute();
  // const userEmail = route.params?.userEmail;
  // console.log(userEmail);
  // const {
  //   todoList,
  //   dashboardInfo,
  //   householdsList,
  //   eventsList,
  //   userInfo,
  //   infoLoaded,
  //   fetchDashboardInfo
  // } = useDashboardContext();

  // useEffect(() => {
  //   fetchDashboardInfo(userEmail);
  // }, [userEmail]);


  return (
    <GestureHandlerRootView backgroundColor="white" flex="1">
      <ScrollView  padding="5"
      nestedScrollEnabled = {true} 
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <VStack space={10} mb="20">
          <ProfileName navigation={navigation} communityInfo = {communityInfo} userName = {userName}/*userInfo={userInfo}*//>
          <SustainScore CarbonSaved = {completedList}/>
          <CarbonSaved CarbonSaved = {completedList}/>
          <ActionsList navigation={navigation} list = {toDoList}/>
          {/* <BadgesList /> */}
          <TeamsList />
          <HousesList />
          <CommunitiesList communityInfo = {communityInfo}/>
          {/* <View>
            <Text>User Info: {dashboardInfo ? dashboardInfo.name : 'Loading...'}</Text>
            <Text>Todo List Length: {todoList.length}</Text>
            <Text>Households List Length: {householdsList.length}</Text>
            <Text>Events List Length: {eventsList.length}</Text>
            <Text>User Info Value: {userInfo}</Text>
            <Text>Info Loaded Value: {infoLoaded}</Text>
            <Button title="Fetch Dashboard Info" onPress={() => fetchDashboardInfo(userEmail)} />
          </View> */}
        </VStack>
      </ScrollView>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  scroll: {
    height: "80",
  },
  category: {
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});