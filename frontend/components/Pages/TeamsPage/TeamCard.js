import React from "react";
import { Text, VStack, Image, Flex, Box, Pressable } from "native-base";

export default function TeamCard({ navigation, team }) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("teamDetails", { team_id: team.team.id })
      }
    >
      <Flex
        direction="row"
        borderRadius={"2xl"}
        shadow="5"
        backgroundColor={"white"}
      >
        {team.team.logo ? (
          <Image
            source={{ uri: team.team.logo ? team.team.logo.url : null }}
            alt="image"
            size="xl"
            height="full"
            borderLeftRadius="2xl"
          />
        ) : null}
        <Box flexShrink={1} borderRightRadius="2xl" w="full">
          <VStack space={1} p="4">
            <Text fontSize="lg" fontWeight="bold">
              {team.team.name}
            </Text>
            {team.team.tagline !== "" ? <Text>{team.team.tagline}</Text> : null}
            <VStack>
              <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold">
                  {team.members}
                </Text>
                <Text fontSize="sm">Members</Text>
              </Flex>
              <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold">
                  {team.actions_completed}
                </Text>
                <Text fontSize="sm">Actions Completed</Text>
              </Flex>
              <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold">
                  {(team.carbon_footprint_reduction / 133).toFixed(2)}
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
  );
}
