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
import { BigPieChart, BigBarChart } from "./Charts.js";

// pie charts that are displayed on the impact page - more detailed than the smaller pie charts
// function BigPieChart({ goal, color }) {
//   return (
//     <VStack alignItems="center" m={3}>
//       <Text bold fontSize="lg">{goal.nameLong}</Text>
//       <VictoryPie 
//           data={[{x: "current", y: goal.current}, {x: "remaining", y: goal.goal - goal.current}]} 
//           containerComponent={<VictoryContainer standalone={false} responsive={true}/>}
//           innerRadius={Dimensions.get('window').width / 8}
//           height={Dimensions.get('window').width / 2}
//           width={Dimensions.get('window').width / 2}
//           padding={10}
//           labels={() => null} 
//           colorScale={[color, "#f2f2f2"]}/>
//         <Text bold fontSize="md">{goal.current} / {goal.goal} {goal.nameShort}</Text>
//         <Text fontSize="md">({(goal.current / goal.goal * 100).toFixed(1)}% of Goal)</Text>
//     </VStack>
//   )
// }

// currently contains placeholder data provided by the package
// function BigBarChart() {
//     return (
//         <VStack alignItems="center">
//             <Text bold fontSize="lg">Number of Actions Completed</Text>
//             <VictoryChart
//                 theme={VictoryTheme.material}
//                 domainPadding={10}
//                 >
//                 <VictoryBar
//                     style={{ data: { fill: "#c43a31" } }}
//                 />
//             </VictoryChart>
//         </VStack>
//     )
// }

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
