import React, { useState } from "react";
import {
  Button,
  Center,
  Text,
  Box,
  VStack,
  Input,
  HStack,
  Icon,
  Modal,
  Heading,
  Pressable,
  Spinner,
  Slider,
  SectionList,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Page from "../../Shared/Page";
import CommunityCard from "./CommunityCard";
import { apiCall } from "../../../api/functions";
import styles from "./styles";

export default function CommunitySearchPage({ navigation }) {
  const [communities, setCommunities] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [maxDistance, setMaxDistance] = useState(5); // in miles

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
        let communities = json.data;
        communities = communities.filter((c) => c.is_geographically_focused);
        matched_communities = communities.filter(
          (c) => c.location.distance === 0
        );
        nearby_communities = communities
          .filter((c) => c.location.distance !== 0)
          .sort((a, b) => a.location.distance - b.location.distance);
        setCommunities([
          { title: "Matched Communities", data: matched_communities },
          { title: "Nearby Communities", data: nearby_communities },
        ]);
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
          <Icon
            as={FontAwesome}
            name="users"
            size={styles.backgroundIconSize}
            color="white"
          />
          <Heading py="5" textAlign="center" color="white">
            BECOME PART OF A COMMUNITY
          </Heading>
        </Center>
      </Box>
      <Box
        backgroundColor="white"
        top="-5%"
        borderTopRadius="30"
        flex="1"
        px="5"
        pt={styles.searchContainerPaddingTop}
      >
        <HStack space="2" alignItems="center">
          <Text>Communities near: </Text>
          <Pressable onPress={() => setShowModal(true)}>
            <HStack space="1" alignItems="center">
              <Text
                fontSize={styles.zipCodeInputSize}
                fontWeight="bold"
                color="primary.400"
              >
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
        {/* Container for communities */}
        {isLoading ? (
          <Spinner />
        ) : (
          <SectionList
            sections={communities}
            initialNumToRender={4}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <CommunityCard
                py="2"
                community={item}
                key={item.id}
                onPress={() =>
                  navigation.navigate("drawer", {
                    community_id: item.id,
                  })
                }
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Box backgroundColor="white" py="2">
                <Text>{title}</Text>
              </Box>
            )}
            ListEmptyComponent={
              <Text textAlign="center" color="muted.400">
                No community found with the given zipcode
              </Text>
            }
          />
        )}
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
