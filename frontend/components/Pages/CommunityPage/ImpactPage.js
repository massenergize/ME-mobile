import { ScrollView } from "react-native";
import React from "react";
import { VictoryPie, VictoryContainer, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { Dimensions } from 'react-native';
import {
  VStack,
  HStack,
  Box,
  Text,
  Spacer,
  Container,
  Center
} from "native-base";
import { goals, colors } from "./SampleGoalsData";
import { BigPieChart, ActionsChart } from "../../Shared/Charts.js";
import graphData from "./../../../data/graphActionsCompleted.json";

export default function ImpactPage({ route, navigation }) {

  const { goalsList } = route.params;

  return (
    <ScrollView>
      <VStack alignItems="center" space={3} p={3} bg="white">
        <Text bold fontSize="xl" mt={2}>Goals</Text>
        { // show the three sample goals on the impact page
            goalsList.map((goal, index) => <BigPieChart goal={goal} color={colors[index]} key={index}/>)
        }
        <Text bold fontSize="xl" mb={5} mt={10}>Number of Actions Completed</Text>

        <ActionsChart graphData={graphData.data.data} />
      </VStack>
    </ScrollView>
  );
}
