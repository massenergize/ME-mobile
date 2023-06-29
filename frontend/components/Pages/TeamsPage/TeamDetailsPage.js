import React, { useState } from "react";
import {
  Center,
  Heading,
  Image,
  Text,
  HStack,
  Button,
  VStack,
  Box,
  ScrollView,
  Flex,
  Input,
  View,
} from "native-base";

import { Text as TextSVG } from "react-native-svg";

import { BarChart, Grid } from "react-native-svg-charts";
import Page from "../../Shared/Page";

const fill = "#DC4E34";
const data = [
  {
    id: 12,
    name: "Activism & Education",
    value: 127,
    reported_value: 168,
  },
  {
    id: 11,
    name: "Food",
    value: 245,
    reported_value: 0,
  },
  {
    id: 9,
    name: "Home Energy",
    value: 510,
    reported_value: 413,
  },
  {
    id: 26,
    name: "Land, Soil & Water",
    value: 92,
    reported_value: 29,
  },
  {
    id: 52,
    name: "Solar",
    value: 90,
    reported_value: 360,
  },
  {
    id: 24,
    name: "Transportation",
    value: 111,
    reported_value: 599,
  },
  {
    id: 25,
    name: "Waste & Recycling",
    value: 202,
    reported_value: 200,
  },
];

export default function TeamDetailsPage() {
  const [activeTab, setActiveTab] = useState("about");
  //   TODO: Cache these components to avoid re-rendering.
  const generateAboutTab = () => {
    return <Text>Description of the team.</Text>;
  };
  const generateActionsTab = () => {
    const CUT_OFF = 250;
    const chartData = data.map((item) => item.value);
    const chartLabels = data.map((item) => item.name);
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <TextSVG
          key={index}
          x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
          y={y(index) + bandwidth / 2}
          fontSize={14}
          fill={value > CUT_OFF ? "white" : "black"}
          alignmentBaseline={"middle"}
        >
          {`${value}, ${chartLabels[index]}`}
        </TextSVG>
      ));

    return (
      <VStack space="5">
        <Text alignSelf="center">
          <Text fontWeight="bold">484 </Text>
          Actions Completed
        </Text>
        <Text alignSelf="center">
          <Text fontWeight="bold">5679.8 </Text>
          Number of Trees
        </Text>
        <View style={{ height: 400, padding: 20, flexDirection: "row" }}>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ flex: 1 }}
              data={chartData}
              svg={{ fill }}
              gridMin={0}
              horizontal={true}
            >
              <Labels />
              <Grid direction="VERTICAL" />
            </BarChart>
          </View>
        </View>
      </VStack>
    );
  };
  const generateMembersTab = () => {
    const generateMemers = () => {
      let members = [];
      for (let i = 0; i < 10; i++) {
        members.push(
          <HStack key={i} space="2" alignItems="center">
            <Image
              source={{}}
              alt="Member Image"
              size="xs"
              backgroundColor="gray.300"
              borderRadius="full"
            />
            <Text>Member {i + 1}</Text>
          </HStack>
        );
      }
      return members;
    };
    return <VStack space="2">{generateMemers()}</VStack>;
  };
  const generateSubTeamsTab = () => {
    const generateSubTeams = () => {
      let subTeams = [];
      for (let i = 0; i < 5; i++) {
        subTeams.push(
          <Flex
            key={i}
            direction="row"
            borderRadius="2xl"
            shadow="5"
            backgroundColor="white"
          >
            <Image
              source={require("../../../assets/images/team-1.jpeg")}
              alt="image"
              size="xl"
              height="full"
              borderLeftRadius="2xl"
            />
            <Box flexShrink={1} borderRightRadius="2xl" w="full">
              <VStack space="3" p="4">
                <Text fontSize="lg" fontWeight="bold">
                  Sub Team 1
                </Text>
                <Text>Description of the team and what their purpose is.</Text>
                <VStack>
                  <Flex direction="row" justifyContent={"space-between"}>
                    <Text fontSize="sm" fontWeight="bold">
                      65
                    </Text>
                    <Text fontSize="sm">Members</Text>
                  </Flex>
                  <Flex direction="row" justifyContent={"space-between"}>
                    <Text fontSize="sm" fontWeight="bold">
                      124
                    </Text>
                    <Text fontSize="sm">Actions Completed</Text>
                  </Flex>
                  <Flex direction="row" justifyContent={"space-between"}>
                    <Text fontSize="sm" fontWeight="bold">
                      1615.2
                    </Text>
                    <Text fontSize="sm">Number of Trees</Text>
                  </Flex>
                  <Flex direction="row" justifyContent={"space-between"}>
                    <Text fontSize="sm" fontWeight="bold">
                      5
                    </Text>
                    <Text fontSize="sm">Sub-teams</Text>
                  </Flex>
                </VStack>
              </VStack>
            </Box>
          </Flex>
        );
      }
      return subTeams;
    };
    return <VStack space="5">{generateSubTeams()}</VStack>;
  };
  const generateContactTab = () => {
    return (
      <Box>
        <VStack space="2">
          <Text fontWeight="bold" fontSize="lg">
            Contact admin of this team
          </Text>
          <Input variant="rounded" placeholder="Subject" />
          <Input
            borderRadius={20}
            type="text"
            placeholder="Message"
            multiline
            numberOfLines={8}
          />
          <Button>Send Message</Button>
        </VStack>
      </Box>
    );
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return generateAboutTab();
      case "actions":
        return generateActionsTab();
      case "members":
        return generateMembersTab();
      case "subTeams":
        return generateSubTeamsTab();
      case "contact":
        return generateContactTab();
      default:
        return generateAboutTab();
    }
  };
  return (
    <Page>
      <ScrollView>
        <Center my="5">
          <Image
            source={require("../../../assets/images/team-1.jpeg")}
            alt="image"
            size="xl"
          />
        </Center>
        <VStack space="3">
          <Heading alignSelf="center">Team Name</Heading>
          <Center mx="5">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <HStack space="2">
                <Button
                  variant={activeTab === "about" ? "solid" : "outline"}
                  onPress={() => setActiveTab("about")}
                >
                  About
                </Button>
                <Button
                  variant={activeTab === "actions" ? "solid" : "outline"}
                  onPress={() => setActiveTab("actions")}
                >
                  Actions
                </Button>
                <Button
                  variant={activeTab === "members" ? "solid" : "outline"}
                  onPress={() => setActiveTab("members")}
                >
                  Members (65)
                </Button>
                <Button
                  variant={activeTab === "subTeams" ? "solid" : "outline"}
                  onPress={() => setActiveTab("subTeams")}
                >
                  Sub-teams
                </Button>
                <Button
                  variant={activeTab === "contact" ? "solid" : "outline"}
                  onPress={() => setActiveTab("contact")}
                >
                  Contact
                </Button>
              </HStack>
            </ScrollView>
          </Center>
          <Tab>
            {renderTabContent()}
            <Button my="5">JOIN</Button>
          </Tab>
        </VStack>
      </ScrollView>
    </Page>
  );
}

const Tab = ({ children }) => {
  return <Box p="5">{children}</Box>;
};
