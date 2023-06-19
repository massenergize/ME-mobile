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
} from "native-base";

export default function TeamDetailsPage() {
  const [activeTab, setActiveTab] = useState("about");
  //   TODO: Cache these components to avoid re-rendering.
  const generateAboutTab = () => {
    return <Text>Description of the team.</Text>;
  };
  const generateActionsTab = () => {
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
        <Image
          source={require("../../../assets/images/actions-chart.png")}
          alt="image"
          resizeMode="contain"
          w="full"
        />
      </VStack>
    );
  };
  const generateMembersTab = () => {
    const generateMemers = () => {
      let members = [];
      for (let i = 0; i < 10; i++) {
        members.push(
          <HStack space="2" alignItems="center">
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
    <ScrollView>
      <VStack space="3">
        <Heading>Team Name</Heading>
        <Center mx="5">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
  );
}

const Tab = ({ children }) => {
  return (
    <Box p="5" backgroundColor={"amber.100"}>
      {children}
    </Box>
  );
};
