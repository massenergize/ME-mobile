import React, { useState, useContext, useCallback } from "react";
import { ScrollView } from "react-native";
import {
  VStack,
  HStack,
  Box,
  Text,
  Spacer,
  Container,
  Pressable,
  Image,
  View
} from "native-base";
import ActionCard from "./../ActionsPage/ActionCard";
import { SmallChart } from "../../Shared/Charts.js";
import EventCard from "./../EventsPage/EventCard";
import { formatDateString, getActionMetric } from "../../Shared/Utils";
import { CommunityContext, useUpcomingEvent } from "../../Contexts/CommunityContext";
import { RefreshControl } from "react-native-gesture-handler";

const colors = ["#DC4E34", "#64B058", "#000000"];

// the card that shows up to three goals on the community page
function GoalsCard({ navigation, goals, community_id }) {

  const getGoalsList = () => {
    let goalsList = []
    if (goals.target_number_of_actions != 0) {
      goalsList.push({
        nameLong: "Individual Actions Completed",
        nameShort: "Actions",
        goal: goals.target_number_of_actions,
        current: goals.initial_number_of_actions + goals.attained_number_of_actions + goals.organic_attained_number_of_actions
      })
    }
    if (goals.target_number_of_households != 0) {
      goalsList.push({
        nameLong: "Households Taking Action",
        nameShort: "Households",
        goal: goals.target_number_of_households,
        current: goals.attained_number_of_households + goals.organic_attained_number_of_households
      })
    }
    if (goals.target_carbon_footprint_reduction != 0) {
      goalsList.push({
        nameLong: "Carbon Reduction Impact",
        nameShort: "Trees",
        goal: goals.target_carbon_footprint_reduction / 133,
        current: (goals.initial_carbon_footprint_reduction / 133) + (goals.organic_attained_carbon_footprint_reduction / 133)
      })
    }
    return goalsList
  }

  if (getGoalsList().length != 0) {
    return (
      <Pressable onPress={() => navigation.navigate("impact", {goalsList: getGoalsList(), community_id: community_id})} mx={4} width="100%">
        {({ isHovered, isFocused, isPressed }) => {
        return <Box 
          // bg={isPressed ? "coolGray.200" : "white"}
          shadow="1" 
          bg="white" 
          // width="100%" 
          alignItems="center" 
          rounded="xl" 
          p={3}
          mx={4}
          >
          <HStack justifyContent="space-evenly" width="100%">
            { // show the three sample goals on the community page
              getGoalsList().map((goal, index) => {
                return <SmallChart goal={goal} color={colors[index]} key={index}/>
              })
            }
          </HStack>
          <Text alignSelf="flex-end" mr={2} fontSize="sm" color="primary.400" mt={2}>Show More  {">"}</Text>
        </Box>
        }}
      </Pressable>
    );
  }
  else {
    return <></>
  }
}

function HeaderText({ text }) {
  return (
    <Text bold fontSize="xl" ml={4}>
      {text}
    </Text>
  );
}

function ShowMore({ navigation, page, text }) {
  return (
    <Text
      fontSize="sm"
      color="primary.400"
      mr={4}
      onPress={() => navigation.navigate(page)}
    >
      {text}
    </Text>
  );
}

export default function CommunityPage({ navigation }) {
  const { communityInfo, actions, fetchCommunityInfo } = useContext(CommunityContext);
  const {community_id} = communityInfo

  // const [isCommunityLoading, setIsCommunityLoading] = useState(true);
  const upcomingEvent = useUpcomingEvent();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback (() => {
    setRefreshing(true);
    fetchCommunityInfo(community_id, () => setRefreshing(false))
    // setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <ScrollView 
      nestedScrollEnabled = {true} 
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <VStack alignItems="center" space={3} bg="white">
          {/* <Text bold fontSize="2xl">Community Name</Text> */}
          <Container maxHeight={200} width="100%" mt={3}>
            <Image
                source={{uri: (communityInfo.logo) ? communityInfo.logo.url : null}}
                alt="Community Logo"
                resizeMode="contain"
                height="full"
                width="full"
            />
          </Container>
          {/* <HStack>
            <HeaderText text="Goals"/>
            <Spacer/>
            <ShowMore navigation={navigation} page="impact" text={"Know More"}/>
          </HStack> */}
          <GoalsCard navigation={navigation} goals={communityInfo.goal} community_id={community_id}/>
          <HStack alignItems="center" pb={2} pt={3}>
            <HeaderText text="Recommended Actions"/>
            <Spacer/>
            <ShowMore navigation={navigation} page="ACTIONS" text={"Show More"}/>
          </HStack>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            {
              // isActionsLoading ? <Spinner size="lg" color="primary.500" /> :
              actions
              .filter((action) => getActionMetric(action, "Cost") === "$" || getActionMetric(action, "Cost") === "0")
              .map((action, index) => {
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
              })
            }
            </HStack>
          </ScrollView>
          {
            upcomingEvent === null 
            ? <></> 
            :
            <View>
              <HStack alignItems="center" pt={3}>
                <HeaderText text="Upcoming Event"/>
                <Spacer/>
                <ShowMore navigation={navigation} page="EVENTS" text={"Show More"}/>
              </HStack>
                {
                  <EventCard
                      key={upcomingEvent.id}
                      title={upcomingEvent.name}
                      date={formatDateString(
                        new Date(upcomingEvent.start_date_and_time),
                        new Date(upcomingEvent.end_date_and_time)
                      )}
                      location={upcomingEvent.location}
                      imageUrl={upcomingEvent.image?.url}
                      canRSVP={upcomingEvent.rsvp_enabled}
                      isRSVPED={upcomingEvent.is_rsvped}
                      isShared={upcomingEvent.is_shared}
                      // onPress={() => navigation.navigate("eventDetails", {event_id: upcomingEvent.id})}
                      id={upcomingEvent.id}
                      navigation={navigation}
                      my={2}
                      mx={4}
                      shadow={5}
                    />
                }
            </View>
          }
        </VStack>
    </ScrollView>
  );
}
