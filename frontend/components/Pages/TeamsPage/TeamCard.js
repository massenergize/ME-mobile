import React from "react";
import {
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  Box,
  Pressable,
  AspectRatio,
  Icon,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Logo = ({ url }) => {
  return (
    <AspectRatio ratio={16 / 9} width="100%">
      <Image source={{ uri: url }} alt="image" resizeMode="contain" />
    </AspectRatio>
  );
};

export default function TeamCard({ navigation, team, isSubteam, ...props }) {
  return (
    <Flex
      direction="column"
      rounded="lg"
      shadow="3"
      backgroundColor="white"
      overflow="hidden"
      {...props}
    >
      <Pressable
        onPress={() =>
          navigation.navigate(isSubteam ? "subteamDetails" : "teamDetails", {
            team_id: team.team.id,
            team_stats: team,
            subteams: team.subteams ? team.subteams : [],
          })
        }
      >
        <Box>{team.team.logo ? <Logo url={team.team.logo.url} /> : null}</Box>
        <Box p="4">
          <Box py="2">
            <Heading size="md">{team.team.name}</Heading>
            {team.team.tagline !== "" ? (
              <Text color="muted.400">{team.team.tagline}</Text>
            ) : null}
          </Box>
          <Box>
            <VStack space="2">
              <Flex direction="row">
                <Icon
                  as={FontAwesome}
                  name="user"
                  size="md"
                  color="blue.400"
                  mr="5"
                  textAlign="center"
                />
                <Text>
                  <Text fontWeight="bold">{team.members}</Text> Members
                </Text>
              </Flex>
              <Flex direction="row">
                <Icon
                  as={FontAwesome}
                  name="bolt"
                  size="md"
                  color="yellow.400"
                  mr="5"
                  textAlign="center"
                />
                <Text>
                  <Text fontWeight="bold">{team.actions_completed}</Text>{" "}
                  actions completed
                </Text>
              </Flex>
              <Flex direction="row">
                <Icon
                  as={FontAwesome}
                  name="globe"
                  size="md"
                  color="green.400"
                  mr="5"
                  textAlign="center"
                />
                <Text>
                  <Text fontWeight="bold">
                    {(team.carbon_footprint_reduction / 133).toFixed(2)}
                  </Text>{" "}
                  Trees
                </Text>
              </Flex>
              {isSubteam ? null : (
                <Flex direction="row">
                  <Icon
                    as={FontAwesome}
                    name="users"
                    size="md"
                    color="red.400"
                    mr="5"
                    textAlign="center"
                  />
                  <Text>
                    <Text fontWeight="bold">{team.subteams.length}</Text>{" "}
                    sub-teams
                  </Text>
                </Flex>
              )}
            </VStack>
          </Box>
        </Box>
      </Pressable>
    </Flex>
  );
}
{
  /* {team.team.logo ? (
            <Image
              source={{ uri: team.team.logo.url }}
              alt="image"
              size="xl"
              height="full"
              resizeMode="contain"
            />
        ) : null} */
}
{
  /* <Box flexShrink={1} borderRightRadius="2xl" w="full">
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
                <Text fontSize="sm">Actions</Text>
              </Flex>
              <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold">
                  {(team.carbon_footprint_reduction / 133).toFixed(2)}
                </Text>
                <Text fontSize="sm">Trees</Text>
              </Flex>
              {
                isSubteam ? null : (
                <Flex direction="row" justifyContent={"space-between"}>
                  <Text fontSize="sm" fontWeight="bold">
                    {team.subteams.length}
                  </Text>
                  <Text fontSize="sm">Sub-teams</Text>
                </Flex>
                )
              }
            </VStack>
          </VStack>
        </Box> */
}
