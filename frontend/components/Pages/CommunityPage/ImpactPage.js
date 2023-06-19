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
import { BigPieChart, BigBarChart } from "../../Shared/Charts.js";

export default function ImpactPage() {
  return (
    <ScrollView>
      <VStack alignItems="center" space={3} p={3} bg="white">
        { // show the three sample goals on the impact page
            goals.map((goal, index) => <BigPieChart goal={goal} color={colors[index]} key={index}/>)
        }
        <BigBarChart />
      </VStack>
    </ScrollView>
  );
}
