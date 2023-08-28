import React, { useState, useContext, useCallback } from "react";
import {
  VStack,
  HStack,
  Box,
  Text,
  Spacer,
  Pressable,
  View,
  ScrollView,
  Center,
  Heading,
  Image,
  AspectRatio
} from "native-base";
import { RefreshControl } from "react-native-gesture-handler";
import Carousel from 'pinar'

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

function BackgroundCarousel({data}) {
  return (
    <Box height="100%" bgColor={"amber.100"}>
      <Carousel showsControls={false} showsDots={false} autoplay={true} loop={true}>
        {data.map((item) => (
          <View key={item.id} flex={1} backgroundColor={"amber.400"}>
            <AspectRatio width="100%" backgroundColor={"amber.700"}>
              <Image source={{ uri: item.url }} alt={item.name} />
            </AspectRatio>
          </View>
        ))}
      </Carousel>
      {/* background overlay */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        backgroundColor="black"
        opacity="30"
      ></Box>
    </Box>
  );
}

export default function CommunityPage({ navigation }) {
  const { communityInfo, actions, homeSettings, fetchCommunityInfo } = useContext(CommunityContext);
  const {community_id} = communityInfo

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback (() => {
    setRefreshing(true);
    fetchCommunityInfo(community_id, () => setRefreshing(false))
  }, []);

  return (
    <Page>

    <ScrollView 
      nestedScrollEnabled = {true} 
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <Box maxHeight={[200, 300]} width="100%">
            <Center position="absolute" zIndex={1} height="100%" width="100%" px="2">
              <Heading color="white" fontWeight="bold" size="xl" textAlign="center">{communityInfo.name}</Heading>
              <Text color="white" textAlign="center" fontSize={["xs", "sm"]}>{homeSettings.sub_title}</Text>
            </Center>
            <BackgroundCarousel data={homeSettings.images} />
          </Box>
        <VStack alignItems="center" space={3} bg="white" top="-3%" borderTopRadius={30} pt="5">
          <GoalsCard navigation={navigation} goals={communityInfo.goal} community_id={community_id}/>
          <HStack alignItems="center" pb={2} pt={3}>
            <HeaderText text="Recommended Actions"/>
            <Spacer/>
            <ShowMore navigation={navigation} page="ACTIONS" text={"Show More"}/>
          </HStack>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            {actions.length === 0 && (
              <Center width="100%" flex="1">
                <Box w="100%" maxW="300">
                  <Text mt="1" color="coolGray.600">
                    No actions found!
                  </Text>
                </Box>
              </Center>
            )}
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
          {homeSettings.show_featured_events && homeSettings.featured_events.length !== 0 && (
            <View width="100%">
              <HStack alignItems="center" pb={2} pt={3}>
                <HeaderText text="Featured Events"/>
                <Spacer/>
                <ShowMore navigation={navigation} page="EVENTS" text={"Show More"}/>
              </HStack>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <HStack space={3} mx={15}>
                  {homeSettings.featured_events.map((event) => (
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
