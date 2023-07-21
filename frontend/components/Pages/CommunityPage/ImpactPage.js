import { ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  VStack,
  HStack,
  Text,
  Spacer,
  Center,
  View,
  Spinner
} from "native-base";
import Page from "../../Shared/Page";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BigPieChart, ActionsChart } from "../../Shared/Charts.js";

import { CommunityContext } from "../../Contexts/CommunityContext";

const colors = [
  "#DC4E34",
  "#64B058",
  "#000000"
]

function ActionsList({ listData }) {
  return (
    <View width="100%" ml={3} p={3}>
      <HStack width="100%" alignItems="center" justifyContent="space-between" mb={2}>
        <Text bold fontSize="sm" width="25%" textAlign="center">Actions</Text>
        <Text bold fontSize="sm" width="30%" textAlign="center">Category</Text>
        <Text bold fontSize="sm" width="25%" textAlign="center">Carbon Saving</Text>
        <Text bold fontSize="sm" width="20%" textAlign="center"># Done</Text>
      </HStack>
      {
        listData.map((action, index) => (

            <HStack width="100%" alignItems="center" justifyContent="space-between" mb={4} key={index}>
              <Text bold fontSize="sm" width="25%" textAlign="left" color="#64B058">{action.name}</Text>
              <Text fontSize="sm" width="30%" textAlign="center">{action.category}</Text>
              <Text fontSize="sm" width="25%" textAlign="center">{action.carbon_total}</Text>
              <Text fontSize="sm" width="20%" textAlign="center">{action.done_count}</Text>
            </HStack>

        ))
      }
    </View>
  )
}

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
          { // show the three sample goals on the impact page
              goalsList.map((goal, index) => <BigPieChart goal={goal} color={colors[index]} key={index}/>)
          }
          <Text bold fontSize="xl" mb={2} mt={10}>Number of Actions Completed</Text>
          <HStack width="100%">
            <Spacer />
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
          {/* { */}
            {/* // (isGraphDataLoading || isListDataLoading) 
            // ? <Spinner />
            // : 
            (actionDisplay == "chart") 
            //   ?  */}
            {
              (actionDisplay == "chart")
              ?
              <ActionsChart graphData={impactData.data} />
              :
              <ActionsList listData={actionsCompleted} />
            }
          {/* //  */}
        </VStack>
      </ScrollView>
    </Page>
  );
}
