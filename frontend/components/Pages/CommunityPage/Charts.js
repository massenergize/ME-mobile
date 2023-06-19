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
  import { VictoryPie, VictoryContainer, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

  // small pie charts that are part of the goal card
function SmallChart({ goal, color }) {
    return (
      <VStack alignItems="center">
        <Text bold fontSize="lg">{goal.nameShort}</Text>
        <VictoryPie 
            data={[{x: "current", y: goal.current}, {x: "remaining", y: goal.goal - goal.current}]} 
            containerComponent={<VictoryContainer disableContainerEvents standalone={false} responsive={true}/>}
            innerRadius={Dimensions.get('window').width / 15}
            height={Dimensions.get('window').width / 3.5}
            width={Dimensions.get('window').width / 3.5}
            padding={10}
            labels={() => null} 
            colorScale={[color, "#f2f2f2"]}/>
        <Text fontSize="md">{goal.current} / {goal.goal}</Text>
      </VStack>
    )
}

// pie charts that are displayed on the impact page - more detailed than the smaller pie charts
function BigPieChart({ goal, color }) {
    return (
        <HStack alignItems="center">
            <VictoryPie 
                data={[{x: "current", y: goal.current}, {x: "remaining", y: goal.goal - goal.current}]} 
                containerComponent={<VictoryContainer standalone={false} responsive={true}/>}
                innerRadius={Dimensions.get('window').width / 12}
                height={Dimensions.get('window').width / 2.7}
                width={Dimensions.get('window').width / 2.7}
                padding={10}
                labels={() => null} 
                colorScale={[color, "#f2f2f2"]}/>
            <Container width={Dimensions.get('window').width - (Dimensions.get('window').width / 2.5)}>
                <VStack>
                    <Text bold fontSize="lg">{goal.nameLong}</Text>
                    <Text bold fontSize="md">{goal.current} / {goal.goal} {goal.nameShort}</Text>
                    <Text fontSize="md">({(goal.current / goal.goal * 100).toFixed(1)}% of Goal)</Text>
                </VStack>
            </Container>
        </HStack>
    )
}

// currently contains placeholder data provided by the package
function BigBarChart() {
    return (
        <VStack alignItems="center">
            <Text bold fontSize="lg">Number of Actions Completed</Text>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                >
                <VictoryBar
                    style={{ data: { fill: "#c43a31" } }}
                />
            </VictoryChart>
        </VStack>
    )
}

export { SmallChart, BigPieChart, BigBarChart }