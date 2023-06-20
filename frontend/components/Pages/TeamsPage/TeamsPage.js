import React from "react";
import {
  ScrollView,
  Text,
  VStack,
  Image,
  Flex,
  Box,
  Pressable,
} from "native-base";

export default function TeamsPage({ navigation }) {
  const generateTeams = () => {
    let teams = [];
    for (let i = 0; i < 5; i++) {
      teams.push(
        <Pressable key={i} onPress={() => navigation.navigate("teamDetails")}>
          <Flex
            direction="row"
            borderRadius={"2xl"}
            shadow="5"
            backgroundColor={"white"}
          >
            {i % 2 == 0 ? (
              <Image
                source={require("../../../assets/images/team-1.jpeg")}
                alt="image"
                size="xl"
                height="full"
                borderLeftRadius="2xl"
              />
            ) : null}
            <Box flexShrink={1} borderRightRadius="2xl" w="full">
              <VStack space="3" p="4">
                <Text fontSize="lg" fontWeight="bold">
                  Team {i + 1}
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
        </Pressable>
      );
    }
    return teams;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack space="5" p="5">
        {generateTeams()}
      </VStack>
    </ScrollView>
  );
}
