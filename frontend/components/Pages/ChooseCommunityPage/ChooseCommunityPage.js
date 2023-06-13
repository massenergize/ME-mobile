import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Center,
  Image,
  Text,
  Box,
  VStack,
  Input,
  Container,
  ScrollView,
  HStack,
  Icon,
  Divider,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const COMMUNITIES = [
  {
    id: 1,
    name: "Cooler Concord",
    location: "Concord, MA",
    totalMembers: 128,
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/coolerconcord.jpg",
  },
  {
    id: 2,
    name: "Energize Framingham",
    location: "Framingham, MA",
    totalMembers: 62,
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/Framingham2020_smaller.jpg",
  },
  {
    id: 3,
    name: "Energize Wayland",
    location: "Wayland, MA",
    totalMembers: 173,
    image:
      "https://www.massenergize.org/wp-content/uploads/2021/08/energize-wayland.jpg",
  },
  {
    id: 4,
    name: "Energize Boxborough",
    location: "Boxborough, MA",
    totalMembers: 28,
    image: "https://massenergize-prod-files.s3.amazonaws.com/media/bsclogo.jpg",
  },
];

export default function ChooseCommunityPage() {
  return (
    <SafeAreaView height="100%" width="100%">
      <Center>
        <Text fontSize="md" fontWeight="bold" py="5">
          Choose a location to see nearby communities!
        </Text>
      </Center>
      <Image
        source={require("../../../assets/images/choose-community-background.png")}
        alt="Background Image"
      />
      <Box
        position="absolute"
        backgroundColor="white"
        width="100%"
        height="60%"
        bottom="0"
        borderTopRadius="30"
      >
        <Container alignSelf="center">
          <VStack space="5" mt="10">
            <Input
              placeholder="Search for a community..."
              variant="rounded"
              width="full"
              borderRadius="full"
              size="lg"
              InputLeftElement={
                <Icon
                  ml="2"
                  size="4"
                  color="gray.400"
                  as={FontAwesome}
                  name="search"
                />
              }
            />
            <Text
              color="primary.400"
              fontWeight="bold"
              fontSize="md"
              textAlign="center"
            >
              <Icon
                as={FontAwesome}
                name="location-arrow"
                size="4"
                color="primary.400"
              />
              {"    "}Use my current location
            </Text>
            <Divider />
            <ScrollView mb="10">
              {COMMUNITIES.map((community) => (
                <HStack key={community.id} space="5" mb="2">
                  <Image
                    source={{ uri: community.image }}
                    alt={community.name}
                    size="128px"
                    resizeMode="contain"
                  />
                  <Box shadow="md" rounded="lg">
                    <Box>
                      <Text fontSize="lg" fontWeight="bold" color="primary.400">
                        {community.name}
                      </Text>
                      <Text fontSize="sm" color="muted.400">
                        {community.location}
                      </Text>
                      <Text fontSize="md">0.4 miles away</Text>
                      <Text fontSize="md">
                        {community.totalMembers} members
                      </Text>
                    </Box>
                  </Box>
                </HStack>
              ))}
            </ScrollView>
          </VStack>
        </Container>
      </Box>
    </SafeAreaView>
  );
}
