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
  Input,
  View,
  Spinner,
  Spacer
} from "native-base";
import TeamCard from "./TeamCard";
import Page from "../../Shared/Page";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TeamActionsChart, ActionsList } from "../../Shared/Charts";
import { useDetails } from "../../Contexts/CommunityContext";

export default function TeamDetailsPage({ route, navigation }) {
  const { team_id } = route.params;
  const { subteams } = route.params;
  const { team_stats } = route.params;
  const [team, isTeamLoading] = useDetails("teams.info", { team_id: team_id });
  const [members, isMembersLoading] = useDetails("teams.members.preferredNames", { team_id: team_id });
  const [actions, isActionsLoading] = useDetails("teams.actions.completed", { team_id: team_id });

  const [activeTab, setActiveTab] = useState("about");
  //   TODO: Cache these components to avoid re-rendering.
  const generateAboutTab = () => {
    // return <Text>{team.description}</Text>;
    return <HTMLParser
            htmlString={team.description}
            baseStyle={textStyle}
            />
  };

  const [ actionDisplay, setActionDisplay ] = useState('chart');

  const getGraphData = () => {
    let graphData = {
      "Activism & Education": {
        "name": "Activism & Education",
        "value": 0
      },
      "Food": {
        "name": "Food",
        "value": 0,
      },
      "Home Energy":{
        "name": "Home Energy",
        "value": 0,
      },
      "Land, Soil & Water": {
        "name": "Land, Soil & Water",
        "value": 0,
      },
      "Solar": {
        "name": "Solar",
        "value": 0,
      },
      "Transportation": {
        "name": "Transportation",
        "value": 0,
      },
      "Waste & Recycling": {
        "name": "Waste & Recycling",
        "value": 0,
      }
    }
    for (let i = 0; i < actions.length; i++) {
      graphData[actions[i].category].value += actions[i].done_count
    }
    return Object.values(graphData)
  }

  const generateActionsTab = () => {
    return (
      <VStack space="5">
        <Text alignSelf="center">
          <Text fontWeight="bold">{team_stats.actions_completed} </Text>
          Actions Completed
        </Text>
        <Text alignSelf="center">
          <Text fontWeight="bold">{(team_stats.carbon_footprint_reduction / 133).toFixed(2)} </Text>
          Number of Trees
        </Text>
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
          {
            (actionDisplay == "chart")
            ?
            <TeamActionsChart graphData={getGraphData()} />
            // null
            :
            <ActionsList listData={actions} />
          }
      </VStack>
    );
  };

  const generateMembersTab = () => {
    return <VStack space="2">
      {
        members.map((member, i) => {
          return <Text fontSize="md" key={i}>{member.preferred_name}</Text>
        })
      }
    </VStack>;
  };

  const generateSubTeamsTab = () => {
    return <VStack space="5">
      {
      subteams.map((subteam, i) => {
        return (
            <TeamCard navigation={navigation} team={subteam} isSubteam={true} key={i} />
        );
      })
      }
    </VStack>;
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
        {isTeamLoading || isMembersLoading ? (
          <Spinner />
        ) : (
          <View>
            {team.logo ? (
              <Image
                source={{ uri: team.logo.url }}
                alt="image"
                height={200}
                mt={5}
                resizeMode="contain"
              />
            ) : null}
            <VStack space="3">
              <Heading alignSelf="center" mt={5}>{team.name}</Heading>
              <Button my={2} mx={4}>JOIN</Button>
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
                        {"Members (" + members.length + ")"}
                    </Button>
                    {
                      subteams.length === 0 ? null :
                      <Button
                        variant={activeTab === "subTeams" ? "solid" : "outline"}
                        onPress={() => setActiveTab("subTeams")}
                      >
                        Sub-teams
                      </Button>
                    }
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
              </Tab>
            </VStack>
          </View>
        )}
      </ScrollView>
    </Page>
  );
}

const Tab = ({ children }) => {
  return <Box p="5">{children}</Box>;
};

const textStyle = {
  fontSize: "16px",
};