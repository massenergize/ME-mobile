import React from "react";
import { Text, Pressable } from "react-native";
import { Box, Heading, HStack, AspectRatio, Image, Stack } from "native-base";


export default function TeamCard({ 
  navigation, 
  team 
}) {
  return (
    <Pressable key={i} onPress={() => navigation.navigate("teamDetails", {team_id: team.id})}>
      <Flex
        direction="row"
        borderRadius={"2xl"}
        shadow="5"
        backgroundColor={"white"}
      >
        {i % 2 == 0 ? (
          <Image
            // source={require("../../../assets/images/team-1.jpeg")}
            source={{uri: team.logo ? team.logo.url : null}}
            alt="image"
            size="xl"
            height="full"
            borderLeftRadius="2xl"
          />
        ) : null}
        <Box flexShrink={1} borderRightRadius="2xl" w="full">
          <VStack space="3" p="4">
            <Text fontSize="lg" fontWeight="bold">
              {team.name}
            </Text>
            <Text>{team.tagline}</Text>
            <VStack>
              <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold">
                  --
                </Text>
                <Text fontSize="sm">Members</Text>
              </Flex>
              <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold">
                  --
                </Text>
                <Text fontSize="sm">Actions Completed</Text>
              </Flex>
              <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold">
                  --
                </Text>
                <Text fontSize="sm">Number of Trees</Text>
              </Flex>
              <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold">
                  --
                </Text>
                <Text fontSize="sm">Sub-teams</Text>
              </Flex>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </Pressable>
  )
}
