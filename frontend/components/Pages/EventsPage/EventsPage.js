import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Button,
  Text,
  Box,
  Image,
  Icon,
  Heading,
  Flex,
  ScrollView,
  Pressable,
} from "native-base";
import Page from "../../Shared/Page";

const EVENTS = [
  {
    id: 1,
    title: "Nature of Acton and Boxborough 2023 - A BioBlitz",
    date: "June 15th, 4:00 AM - 11:00 PM",
    location: "Conservations Lands, Parks, and Yards, Acton, MA",
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
  },
  {
    id: 2,
    title: "Acton Clean Energy Coach Program",
    date: "June 15th 2023, 9:00 am-11:00 pm",
    location: "Online",
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Clean_Energy_Coach-230216-135015.jpg",
  },
  {
    id: 3,
    title: "Acton Water Wise Nature Walk",
    date: "April 26th 2023, 3:00 pm-4:30 pm",
    location: null,
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/hello_april_Flyer_Landscape-230328-194333.jpg",
  },
];

export default function EventsPage({ navigation }) {
  return (
    <Page>
      <ScrollView>
        {EVENTS.map((event) => (
          <Box
            key={event.id}
            m="3"
            height="200"
            shadow="5"
            backgroundColor="white"
            borderRadius="2xl"
          >
            <Pressable onPress={() => navigation.navigate("eventDetails")}>
              <Box borderRadius="2xl" overflow="hidden">
                <Image
                  source={{ uri: event.image }}
                  alt="image"
                  h="full"
                  w="full"
                  resizeMode="cover"
                />
                <Box
                  w="full"
                  h="full"
                  position="absolute"
                  backgroundColor="primary.400"
                  opacity="60"
                ></Box>
              </Box>
              <Button variant="ghost" position="absolute" top="5" right="2">
                <Icon
                  as={FontAwesome}
                  name="angle-right"
                  size={6}
                  color="white"
                />
              </Button>
              <Box p="5" position="absolute" bottom="0">
                <Heading color="white">
                  {event.title.length > 35
                    ? event.title.slice(0, 35) + "..."
                    : event.title}
                </Heading>
                <Flex flexDirection="row" alignItems="center" mt="2">
                  <Icon
                    as={FontAwesome}
                    name="calendar-o"
                    size={4}
                    color="white"
                    mr="2"
                  />
                  <Text color="white" fontWeight="bold">
                    {event.date}
                  </Text>
                </Flex>
                <Flex flexDirection="row" alignItems="center" mt="2">
                  <Icon
                    as={FontAwesome}
                    name="location-arrow"
                    size={4}
                    color="white"
                    mr="2"
                    alignSelf="flex-end"
                  />
                  <Text color="white" fontWeight="bold">
                    {event.location
                      ? event.location.length > 30
                        ? event.location.slice(0, 30) + "..."
                        : event.location
                      : "N/A"}
                  </Text>
                </Flex>
              </Box>
            </Pressable>
          </Box>
        ))}
      </ScrollView>
    </Page>
  );
}
