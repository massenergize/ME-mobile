import { ScrollView } from "react-native";
import React from "react";
import {
  VStack,
  HStack,
  Box,
  Text,
  Spacer,
  Container,
  Center,
  Pressable,
  Image
} from "native-base";
import { Dimensions } from 'react-native';
import { VictoryPie, VictoryContainer } from 'victory-native';
import ActionCard from "./../ActionsPage/ActionCard";
import { SmallChart } from "../../Shared/Charts.js";
import EventCard from "./../EventsPage/EventCard";
import data from "./../../../data/communitiesInfo.json";

const event = {
  id: 1,
  title: "Nature of Acton and Boxborough 2023 - A BioBlitz",
  date: "June 15th, 4:00 AM - 11:00 PM",
  location: "Hybrid",
  image:
    "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
  can_rsvp: true,
  is_rsvped: false,
  is_shared: true,
}

const colors = [
  "#DC4E34",
  "#64B058",
  "#000000"
]

// the card that shows up to three goals on the community page
function GoalsCard({ navigation, goals }) {
  const goalsList = [
    { 
      nameLong: "Individual Actions Completed",
      nameShort: "Actions",
      goal: goals.target_number_of_actions,
      current: goals.initial_number_of_actions + goals.attained_number_of_actions
    },
    { 
      nameLong: "Households Taking Action",
      nameShort: "Households",
      goal: goals.target_number_of_households,
      current: goals.initial_number_of_households + goals.attained_number_of_households
    },
    { 
      nameLong: "Carbon Reduction Impact",
      nameShort: "Trees",
      goal: goals.target_carbon_footprint_reduction,
      current: goals.initial_carbon_footprint_reduction + goals.organic_attained_carbon_footprint_reduction
    }
  ]

  return (
    <Pressable onPress={() => navigation.navigate("impact", {goalsList: goalsList})} width="100%">
      {({ isHovered, isFocused, isPressed }) => {
      return <Box 
        // bg={isPressed ? "coolGray.200" : "white"}
        shadow="1" 
        bg="white" 
        width="100%" 
        alignItems="center" 
        rounded="xl" 
        p="3"
        >
        <HStack>
          { // show the three sample goals on the community page
            goalsList.map((goal, index) => <SmallChart goal={goal} color={colors[index]} key={index}/>)
          }
        </HStack>
        <Text alignSelf="flex-end" mr={2} fontSize="sm" color="primary.400" mt={1}>Show More  ></Text>
      </Box>
      }}
    </Pressable>
  );
}


function HeaderText({ text }) {
  return (
    <Text bold fontSize="xl">{text}</Text>
  )
}

function ShowMore({ navigation, page, text }) {
  return (
    <Text fontSize="sm" color="primary.400" onPress={() => navigation.navigate(page)}>{text}</Text>
  )
}

export default function CommunityPage({ navigation }) {
  return (
    <ScrollView nestedScrollEnabled = {true}>
      <VStack alignItems="center" space={3} p={4} bg="white">
        {/* <Text bold fontSize="2xl">Community Name</Text> */}
        <Container maxHeight={200} width="100%">
          <Image
              source={{uri: data.data.logo.url}}
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
        <GoalsCard navigation={navigation} goals={data.data.goal} />
        <HStack alignItems="center" pb={2} pt={3}>
          <HeaderText text="Recommended Actions"/>
          <Spacer/>
          <ShowMore navigation={navigation} page="ACTIONS" text={"Show More"}/>
        </HStack>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack>
            <ActionCard navigation={navigation}/>
            <Container width="10px"/>
            <ActionCard navigation={navigation}/>
            <Container width="10px"/>
            <ActionCard navigation={navigation}/>
          </HStack>
        </ScrollView>
        <HStack alignItems="center" pt={3}>
          <HeaderText text="Upcoming Event"/>
          <Spacer/>
          <ShowMore navigation={navigation} page="EVENTS" text={"Show More"}/>
        </HStack>
        <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            imageURI={event.image}
            canRSVP={event.can_rsvp}
            isRSVPED={event.is_rsvped}
            isShared={event.is_shared}
            onPress={() => navigation.navigate("eventDetails")}
            my="2"
            shadow="5"
          />
      </VStack>
    </ScrollView>
  );
}
