import { ScrollView } from "react-native";
import React, { useState } from "react";
import { VictoryPie, VictoryContainer, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { Dimensions } from 'react-native';
import {
  VStack,
  HStack,
  Box,
  Text,
  Spacer,
  Container,
  Center,
  View
} from "native-base";
import { goals, colors } from "./SampleGoalsData";
import { BigPieChart, ActionsChart } from "../../Shared/Charts.js";
import graphData from "./../../../data/graphActionsCompleted.json";
import listData from "./../../../data/communitiesActionsCompleted.json";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Table, Row, Rows, TableWrapper, Col, Cell } from 'react-native-table-component';

function ActionsList({ listData }) {
  const getListData = (listData) => {
    let data = []
    for (let i = 0; i < listData.length; i++) {
      data.push([listData[i].name, listData[i].category, listData[i].carbon_total, listData[i].done_count])
    }
    console.log(data)
    return data
    // return [['test', 'test', 'test', 'test']]
  }

  return (
    <View width="100%" ml={3} p={3}>
      <Table>
        <Row data={['Action', 'Category', 'Carbon Saving', '# Done']} style={{height: 40}} textStyle={{fontWeight: "bold", textAlign: "center"}} />  
        {
            getListData(listData).map((rowData, index) => (
              <TableWrapper key={index} style={{flexDirection: 'row', width: "100%", paddingBottom: 10}}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellData} textStyle={cellIndex === 0 ? {fontWeight: "bold", color: '#64B058'} : {color: 'black', textAlign: 'center'}}/>
                  ))
                }
              </TableWrapper>
            ))
          }
      </Table>
    </View>
  )
}

export default function ImpactPage({ route, navigation }) {
  const { goalsList } = route.params;
  const [ actionDisplay, setActionDisplay ] = useState('chart');

  return (
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
            <Ionicons name={"bar-chart-outline"} color={actionDisplay == "chart" ? '#64B058' : 'black'} padding={5} size={24} onPress={() => setActionDisplay('chart')}/>
          </Center>
          <Center pr={3}>
            <Ionicons name={"list-outline"} color={actionDisplay == "list" ? '#64B058' : 'black'} padding={5} size={24} onPress={() => setActionDisplay('list')}/>
          </Center>
        </HStack>
        {
          (actionDisplay == "chart") ? 
          <ActionsChart graphData={graphData.data.data} />:
          <ActionsList listData={listData.data} />
        }
      </VStack>
    </ScrollView>
  );
}
