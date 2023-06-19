import { ScrollView } from "react-native";
import React from "react";
import { VictoryPie, VictoryContainer } from 'victory-native';
import { Dimensions } from 'react-native';
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
import { goals, colors } from "./SampleGoalsData.js";
import ActionCard from "./../ActionsPage/ActionCard";
import { SmallChart } from "./Charts.js";

// small pie charts that are part of the goal card
// function SmallChart({ goal, color }) {
//   return (
//     <VStack alignItems="center">
//       <Text bold fontSize="lg">{goal.nameShort}</Text>
//       <VictoryPie 
//           data={[{x: "current", y: goal.current}, {x: "remaining", y: goal.goal - goal.current}]} 
//           containerComponent={<VictoryContainer disableContainerEvents standalone={false} responsive={true}/>}
//           innerRadius={Dimensions.get('window').width / 15}
//           height={Dimensions.get('window').width / 3.5}
//           width={Dimensions.get('window').width / 3.5}
//           padding={10}
//           labels={() => null} 
//           colorScale={[color, "#f2f2f2"]}/>
//       <Text fontSize="md">{goal.current} / {goal.goal}</Text>
//     </VStack>
//   )
// }

// the card that shows up to three goals on the community page
function GoalsCard({ navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate("impact")}>
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
            goals.map((goal, index) => <SmallChart goal={goal} color={colors[index]} key={index}/>)
          }
        </HStack>
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

function ShowMore({ navigation, page }) {
  return (
    <Text fontSize="sm" color="primary.400" onPress={() => navigation.navigate(page)}>Show More</Text>
  )
}

export default function CommunityPage({ navigation }) {
  return (
    <ScrollView nestedScrollEnabled = {true}>
      <VStack alignItems="center" space={3} p={3} bg="white">
        {/* <Text bold fontSize="2xl">Community Name</Text> */}
        <Container maxHeight={200} width="100%">
          <Image
              source={require("./../../../assets/images/cooler-concord.png")}
              alt="Community Logo"
              resizeMode="contain"
              height="full"
              width="full"
          />
        </Container>
        <HStack>
          <HeaderText text="Goals"/>
          <Spacer/>
        </HStack>
        <GoalsCard navigation={navigation}/>
        <HStack alignItems="center">
          <HeaderText text="Recommended Actions"/>
          <Spacer/>
          <ShowMore navigation={navigation} page="ACTIONS"/>
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
        <HStack alignItems="center">
          <HeaderText text="Upcoming Event"/>
          <Spacer/>
          <ShowMore navigation={navigation} page="EVENTS"/>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
