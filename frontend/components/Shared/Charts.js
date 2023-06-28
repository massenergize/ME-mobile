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
import { VictoryPie, VictoryContainer, VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryGroup, VictoryLegend } from 'victory-native';


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
        <Text fontSize="md">{(goal.current < 10000) ? goal.current : (goal.current / 1000).toFixed(1) + "k" } / {(goal.goal < 10000) ? goal.goal : (goal.goal / 1000) + "k"}</Text>
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
                    <Text fontSize="md">{goal.current} / {goal.goal} {goal.nameShort}</Text>
                    <Text fontSize="sm">({(goal.current / goal.goal * 100).toFixed(1)}% of Goal)</Text>
                </VStack>
            </Container>
        </HStack>
    )
}

// currently contains placeholder data provided by the package
function BigBarChart({ graphData}) {
    return (
        <VStack alignItems="center">
            <Text bold fontSize="lg" mb={5}>Number of Actions Completed</Text>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                >
                <VictoryAxis dependentAxis />
                <VictoryAxis style={{ 
                    tickLabels: { fill:"transparent"} 
                }} />
                <VictoryGroup offset={10}>
                    <VictoryBar
                        data={graphData}
                        x="name"
                        y="reported_value"
                        horizontal={true}
                        style={{ data: { fill: "#DC4E34", fillOpacity: 0.9 }, labels: {fontSize: 15}}}
                        // labels={({ datum }) => datum.name}
                        // labelComponent={<VictoryLabel x={50}/>}
                        barRatio={0.9}
                    />
                    <VictoryBar
                        data={graphData}
                        x="name"
                        y="value"
                        horizontal={true}
                        style={{ data: { fill: "#DC4E34", fillOpacity: 0.5 }, labels: {fontSize: 15}}}
                        labels={({ datum }) => datum.name}
                        labelComponent={<VictoryLabel x={45} dy={-12}/>}
                        barRatio={0.9}
                    />
                </VictoryGroup>
                <VictoryLegend x={230} y={0}
                    centerTitle
                    // orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
                    data={[
                    { name: "Value", symbol: { fill: "#DC4E34", type: "square", fillOpacity: 0.5 } },
                    { name: "Reported Value", symbol: { fill: "#DC4E34", type: "square", fillOpacity: 0.8 } },
                    ]}
                />
            </VictoryChart>
        </VStack>
    )
}

export { SmallChart, BigPieChart, BigBarChart }