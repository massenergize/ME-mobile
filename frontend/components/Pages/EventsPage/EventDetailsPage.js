import React from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  ScrollView,
  Text,
  Box,
  Image,
  VStack,
  HStack,
  Icon,
  Divider,
  Button,
} from "native-base";
import Page from "../../Shared/Page";

export default function EventDetailsPage() {
  return (
    <Page>
      <ScrollView>
        <VStack space={2} mx="3" mb="20">
          <Box
            my="3"
            height="200"
            shadow="5"
            backgroundColor="white"
            borderRadius="2xl"
            overflow="hidden"
          >
            <Image
              source={{
                uri: "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
              }}
              alt="image"
              h="full"
              w="full"
              resizeMode="cover"
            />
          </Box>
          <HStack space={2} alignItems="center">
            <Icon
              color="primary.400"
              as={<FontAwesome name="calendar-o" />}
              size="sm"
            />
            <Text color="primary.400" fontWeight="bold">
              June 15th, 4:00 AM - 11:00 PM
            </Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <Icon
              color="primary.400"
              as={<FontAwesome name="location-arrow" />}
              size="sm"
            />
            <Text color="primary.400" fontWeight="bold">
              Conservations Lands, Parks, and Yards, Acton, MA
            </Text>
          </HStack>
          <Button size="lg" _text={{ fontWeight: "bold" }}>
            RSVP
          </Button>
          <Divider my="2" />
          <Box backgroundColor="white" shadow="5" p="4" borderRadius="10">
            <Text
              fontWeight="bold"
              fontSize="lg"
              textAlign="center"
              mb="2"
              mt="5"
            >
              Nature of Acton and Boxborough 2023 - A BioBlitz
            </Text>
            <Text fontWeight="light" color="muted.600">
              Hooray for biodiversity . . . and carbon storage! In order to keep
              carbon in the ground, we need to protect habitats. Here is an
              activity that helps people value these habitats. Please join us as
              we document and celebrate biodiversity in Acton and Boxborough. As
              you may know, there are over 2,000 acres of conservation areas in
              Acton and Boxborough with a variety of habitats, such as cattail
              marshes, ponds, open fields and dense forests. These habitats host
              snapping turtles, reptiles, frogs, insects, birds, mammals, and
              many plant species, and store carbon. Another 3,000 acres of
              private lands provide habitat for wildlife, including two steps
              outside your door! What kind of wildlife lives here? Let’s find
              out this June 1 through 15. How to participate? Download the
              “iNaturalist” app on your smartphone, search for projects and
              click on our “Nature of Acton and Boxborough 2023” project. To
              participate, you must Join the project. Or visit
              https://www.inaturalist.org/projects/nature-of-acton-and-boxborough-june-2023.
              Starting June 1st, snap away at any plant, animal or fungus you
              see and get it on our list. Can we break 200 species this year?
              Who can ID the most? Taking observations of wildlife helps advance
              science too! According to National Geographic, “High quality data
              uploaded to iNaturalist become part of the Global Biodiversity
              Information Facility, an open source database used by scientists
              and policy makers around the world.” Some of you may have
              participated in our local Bioblitz in 2021 led by Green Acton and
              other partners, as part of the City Nature Challenge Boston area
              in 2021. In that event, 43 people made 1226 observations of 472
              different species in Acton and Boxborough. This is a follow up
              from that activity. The 2023 BioBlitz is a collaboration of people
              from Acton Conservation Trust, the Boxborough Conservation Trust,
              Acton PIP Stem, Acton Men’s Outdoor Club, Energize Acton, and the
              Acton Discovery Museum. This is a fun activity for your family,
              too. If you have any questions about the activity or how to join
              the project in iNaturalist, feel free to contact Matt Liebman at
              EnergizeActon.org@gmail.com. Happy BioBlitzing!
            </Text>
          </Box>
        </VStack>
      </ScrollView>
    </Page>
  );
}
