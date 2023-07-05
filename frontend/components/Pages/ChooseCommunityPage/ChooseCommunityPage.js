import React, { useState, useEffect } from "react";
import {
  Button,
  Center,
  Image,
  Text,
  Box,
  VStack,
  Input,
  ScrollView,
  HStack,
  Icon,
  Modal,
  Heading,
  Flex,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";
import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";

import DummyResponse from "../../../data/communitiesList.json";

const filterOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "cities & towns",
    label: "Cities & Towns",
  },
  {
    value: "other communities",
    label: "Other Communities",
  },
  {
    value: "schools",
    label: "Schools",
  },
];

export default function ChooseCommunityPage({ navigation }) {
  const [communities, setCommunities] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [showModal, setShowModal] = useState(true);

  const handleZipCodeSubmit = () => {
    // TODO: validate zip code
    setShowModal(false);
  };

  useEffect(() => {
    // TODO: fetch communities from backend
    // TODO: add loading state
    if (DummyResponse.success) {
      const data = DummyResponse.data;
      let nearbyCommunities = [];
      // add all communities for now. TODO: implement zip code logic
      data.forEach((community) => {
        const location = community.is_geographically_focused
          ? `${community.location.city}, ${community.location.state}`
          : `${community.location.country}`;
        // if zipCode exists then
        //// only add community if community's location is within 10 miles of zipCode

        // else add all communities
        nearbyCommunities.push({
          id: community.id,
          name: community.name,
          location: location,
          image: community.logo.url,
          imageAlt: community.logo.name,
        });
      });
      setCommunities(nearbyCommunities);
    }
  }, []);

  return (
    <Page>
      <Box height="50%" backgroundColor={"amber.100"}>
        <Center h="full">
          <Heading>IMAGE</Heading>
        </Center>
      </Box>
      <Box
        position="absolute"
        backgroundColor="white"
        width="100%"
        height="60%"
        bottom="0"
        borderTopRadius="30"
      >
        <Box mx="5">
          <VStack space="5" pt="10">
            <HStack space="2" alignItems="center">
              <Text>Communities near: </Text>
              <Pressable onPress={() => setShowModal(true)}>
                <HStack space="1" alignItems="center">
                  <Text fontSize="2xl" fontWeight="bold" color="primary.400">
                    {zipCode ? zipCode : "0000"}
                  </Text>
                  <Icon as={FontAwesome} name="pencil" color="primary.400" />
                </HStack>
              </Pressable>
            </HStack>
            <SearchBar filterOptions={filterOptions} />
            {/* Container for communities */}
            <ScrollView height="80">
              {communities.map((community) => (
                <Pressable
                  key={community.id}
                  onPress={() => navigation.navigate("drawer")}
                >
                  <Flex flexDirection="row" alignItems="center">
                    <Image
                      source={{ uri: community.image }}
                      alt={community.imageAlt}
                      size="100px"
                      resizeMode="contain"
                    />
                    <Box width="70%" pl="5">
                      <Text fontSize="lg" fontWeight="bold">
                        {community.name}
                      </Text>

                      <Text fontSize="sm" color="muted.400">
                        {community.location}
                      </Text>
                    </Box>
                  </Flex>
                </Pressable>
              ))}
            </ScrollView>
          </VStack>
        </Box>
      </Box>
      {/* Modal for inputting zip code */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center mb="5">
              <Icon
                as={FontAwesome}
                name="globe"
                size="90"
                color="primary.600"
              />
              <Text fontSize="lg" fontWeight="bold" py="5">
                Let's find your community!
              </Text>
              <Input
                placeholder="Enter your zip code..."
                variant="rounded"
                value={zipCode}
                onChangeText={(text) => setZipCode(text)}
              />
            </Center>
            <Button onPress={handleZipCodeSubmit}>Submit</Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Page>
  );
}
