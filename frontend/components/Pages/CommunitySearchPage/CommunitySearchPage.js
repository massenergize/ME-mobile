import React, { useState } from "react";
import {
  Button,
  Center,
  Text,
  Box,
  VStack,
  Input,
  ScrollView,
  HStack,
  Icon,
  Modal,
  Heading,
  Pressable,
  Spinner,
  Slider,
  View,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";
import CommunityCard from "./CommunityCard";
import { apiCall } from "../../../api/functions";

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

export default function CommunitySearchPage({ navigation }) {
  const [communities, setCommunities] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [maxDistance, setMaxDistance] = useState(25); // in miles

  const [isLoading, setIsLoading] = useState(false);

  const isValidZipCode = (zipCode) => {
    // Define the regex pattern for a valid zip code
    const zipCodePattern = /^\d{5}(?:[-\s]\d{4})?$/;

    // Test the zip code against the pattern
    return zipCodePattern.test(zipCode);
  };

  const handleZipCodeSubmit = async () => {
    if (!isValidZipCode(zipCode)) {
      alert("Please enter a valid zip code.");
      return;
    }
    setIsLoading(true);
    await apiCall("communities.list", {
      zipcode: zipCode,
      max_distance: maxDistance,
    }).then((json) => {
      if (json.success) {
        setCommunities(json.data);
      } else {
        console.log(json);
      }
      setIsLoading(false);
    });

    setShowModal(false);
  };

  return (
    <Page>
      <Box height="30%" backgroundColor={"primary.50"}>
        <Center h="full">
          <Icon as={FontAwesome} name="users" size="90" color="white" />
          <Heading py="5" textAlign="center" color="white">
            BECOME PART OF A COMMUNITY
          </Heading>
        </Center>
      </Box>
      <Box backgroundColor="white" top="-25" borderTopRadius="30">
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
            <VStack>
              <Text>Distance: {maxDistance} miles</Text>
              <Slider
                defaultValue={maxDistance}
                step={5}
                accessibilityLabel="max distance slider"
                onChange={(value) => setMaxDistance(value)}
                onChangeEnd={() => handleZipCodeSubmit()}
                isDisabled={zipCode === ""}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </VStack>
            {/* <SearchBar filterOptions={filterOptions} /> */}
            {/* Container for communities */}
            {isLoading ? (
              <Spinner />
            ) : (
              <View height={"xs"} backgroundColor={"amber.100"}>
                {communities.length === 0 ? (
                  <Text textAlign="center" color="muted.400">
                    Please enter a zip code to find communities.
                  </Text>
                ) : (
                  <ScrollView>
                    <Text textAlign="center" color="muted.400">
                      Found {communities.length} communities.
                    </Text>
                    {communities
                      // sort by geographically focused first, then by distance
                      .sort((a, b) =>
                        a.is_geographically_focused &&
                        !b.is_geographically_focused
                          ? -1
                          : 1
                      )
                      .sort((a, b) => a.location.distance - b.location.distance)
                      .map((community) => {
                        return (
                          <CommunityCard
                            py="2"
                            community={community}
                            key={community.id}
                            onPress={() =>
                              navigation.navigate("drawer", {
                                community_id: community.id,
                              })
                            }
                          />
                        );
                      })}
                  </ScrollView>
                )}
              </View>
            )}
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
            <Button
              isLoading={isLoading}
              isLoadingText="Searching..."
              onPress={handleZipCodeSubmit}
            >
              Submit
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Page>
  );
}
