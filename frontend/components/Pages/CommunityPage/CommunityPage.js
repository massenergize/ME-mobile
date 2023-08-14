import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  VStack,
  HStack,
  Box,
  Text,
  Spacer,
  Container,
  Pressable,
  Image,
  View,
  ScrollView
} from "native-base";
import { RefreshControl } from "react-native-gesture-handler";

import ActionCard from "./../ActionsPage/ActionCard";
import EventCard from "./../EventsPage/EventCard";
import Page from "../../Shared/Page";
import { SmallChart } from "../../Shared/Charts.js";
import { formatDateString, getActionMetric } from "../../Shared/Utils";
import { CommunityContext } from "../../Contexts/CommunityContext";

const colors = ["#DC4E34", "#64B058", "#000000"];

// card that shows up to three goals on the community page
function GoalsCard({ navigation, goals, community_id }) {

  // create the list of progress charts to display
  const getGoalsList = () => {
    let goalsList = []
    // don't display a chart if the goal is 0
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

  // render a pressable card with progress charts for the available goals
  if (getGoalsList().length != 0) {
    return (
      <Pressable onPress={() => navigation.navigate("impact", {goalsList: getGoalsList(), community_id: community_id})} mx={4} width="100%">
        <Box
          shadow="1" 
          bg="white"
          alignItems="center" 
          rounded="xl" 
          p={3}
          mx={4}
          >
          <HStack justifyContent="space-evenly" width="100%">
            {
              getGoalsList().map((goal, index) => {
                return <SmallChart goal={goal} color={colors[index]} key={index}/>
              })
            }
          </HStack>
          <Text alignSelf="flex-end" mr={2} fontSize="sm" color="primary.400" mt={2}>Show More  {">"}</Text>
        </Box>
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

// show more button displayed next to header
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
  const { communityInfo, actions, events, fetchCommunityInfo } = useContext(CommunityContext);
  const {community_id} = communityInfo

  const [featuredEvents, setFeaturedEvents] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const getFeaturedEvents = useCallback(() => {
    const featured = events.filter((event) => event.is_on_home_page);
    setFeaturedEvents(featured);
  }, [featuredEvents])

  const onRefresh = useCallback (() => {
    setRefreshing(true);
    fetchCommunityInfo(community_id, () => setRefreshing(false))
    // setTimeout(() => setRefreshing(false), 2000);
  }, []);

  useEffect(() => {
    getFeaturedEvents();
  }, [])

  return (
    <Page>

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
              // displaay all low cost actions for v1 (recommended in the future)
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
          {featuredEvents.length !== 0 && (
            <View width="100%">
              <HStack alignItems="center" pb={2} pt={3}>
                <HeaderText text="Featured Events"/>
                <Spacer/>
                <ShowMore navigation={navigation} page="EVENTS" text={"Show More"}/>
              </HStack>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <HStack space={3} mx={15}>
                  {featuredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.name}
                      date={formatDateString(
                        new Date(event.start_date_and_time),
                        new Date(event.end_date_and_time)
                      )}
                      location = {event.location}
                      imageUrl={event.image?.url}
                      canRSVP={event.rsvp_enabled}
                      isRSVPED={event.is_rsvped}
                      isShared={event.is_shared}
                      id={event.id}
                      navigation={navigation}
                      my={3}
                      shadow={3}
                    />
                  ))}
                </HStack>
              </ScrollView>
            </View>
          )}
        </VStack>
    </ScrollView>
    </Page>
  );
}
