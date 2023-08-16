import { ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import {
  VStack,
  HStack,
  Text,
  Spacer,
  Center,
  View
} from "native-base";
import Page from "../../Shared/Page";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BigPieChart, ActionsChart, ActionsList } from "../../Shared/Charts.js";

import { CommunityContext } from "../../Contexts/CommunityContext";

const colors = [
  "#DC4E34",
  "#64B058",
  "#000000"
]

export default function ImpactPage({ route, navigation }) {
  const { goalsList } = route.params;
  const { community_id } = route.params;
  const [ actionDisplay, setActionDisplay ] = useState('chart');

  const { impactData, actionsCompleted } = useContext(CommunityContext);

  return (
    <Page>
      <ScrollView>
        <VStack alignItems="center" space={3} bg="white">
          <Text bold fontSize="xl" mt={2}>Goals</Text>
          { // show the available goals
              goalsList.map((goal, index) => <BigPieChart goal={goal} color={colors[index]} key={index}/>)
          }
          <Text bold fontSize="xl" mb={2} mt={10}>Number of Actions Completed</Text>
          <HStack width="100%">
            <Spacer />
            {/* {Toggle between action chart and action list} */}
            <Center>
              <Ionicons 
                name={"bar-chart-outline"} 
                color={actionDisplay == "chart" ? '#64B058' : 'black'} 
                padding={5} 
                size={24} 
                onPress={() => setActionDisplay('chart')}/>
            </Center>
            <Center pr={3}>
              <Ionicons 
                name={"list-outline"} 
                color={actionDisplay == "list" ? '#64B058' : 'black'} 
                padding={5} E
                size={24} 
                onPress={() => setActionDisplay('list')}/>
            </Center>
          </HStack>
            {
              (actionDisplay == "chart")
              ?
              <ActionsChart graphData={impactData.data} />
              :
              <ActionsList listData={actionsCompleted} />
            }
        </VStack>
      </ScrollView>
    </Page>
  );
}
