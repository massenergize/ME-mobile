import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Container,
  Center,
  Button,
  Text,
  Box,
  Image,
  Icon,
  Flex,
  ScrollView,
  AspectRatio,
} from "native-base";
import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";

const EVENTS = [
  {
    id: 1,
    title: "Nature of Acton and Boxborough 2023 - A BioBlitz",
    date: "June 15th, 4:00 AM - 11:00 PM",
    location: "Hybrid",
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
    can_rsvp: true,
    is_shared: true,
  },
  {
    id: 2,
    title: "Acton Clean Energy Coach Program",
    date: "June 15th 2023, 9:00 am-11:00 pm",
    location: "Online",
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Clean_Energy_Coach-230216-135015.jpg",
    can_rsvp: false,
    is_shared: false,
  },
  {
    id: 3,
    title: "Acton Water Wise Nature Walk",
    date: "April 26th 2023, 3:00 pm-4:30 pm",
    location: null,
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/hello_april_Flyer_Landscape-230328-194333.jpg",
    can_rsvp: false,
    is_shared: true,
  },
];

const filterOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "home energy",
    label: "Home Energy",
  },
  {
    value: "solar",
    label: "Solar",
  },
  {
    value: "transportation",
    label: "Transportation",
  },
  {
    value: "waste recycling",
    label: "Waste & Recycling",
  },
  {
    value: "food",
    label: "Food",
  },
  {
    value: "activism education",
    label: "Activism & Education",
  },
  {
    value: "land soil water",
    label: "Land, Soil & Water",
  },
];

export default function EventsPage({ navigation }) {
  return (
    <Page>
      <ScrollView>
        <Container mx="auto">
          <SearchBar py="5" filterOptions={filterOptions} />
          {/* events filter */}
          <Flex flexDirection="row">
            <Button variant="solid" _text={{ fontSize: "xs" }}>
              Upcoming Events
            </Button>
            <Button variant="outline" _text={{ fontSize: "xs" }}>
              Past Events
            </Button>
            <Button variant="outline" _text={{ fontSize: "xs" }}>
              Campaigns
            </Button>
          </Flex>
          {EVENTS.map((event) => (
            <Box
              key={event.id}
              my="3"
              maxW="80"
              rounded="lg"
              backgroundColor="white"
              shadow="5"
            >
              <Box pt="2">
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: event.image,
                    }}
                    alt="image"
                    resizeMode="contain"
                  />
                </AspectRatio>
                {event.is_shared && (
                  <Center
                    bg="secondary.400"
                    _text={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "xs",
                    }}
                    position="absolute"
                    px="5"
                    py="1.5"
                    rounded="full"
                    right="5"
                    top="2"
                  >
                    SHARED
                  </Center>
                )}
              </Box>
              <Flex
                px="4"
                pt="4"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Text fontWeight="bold" fontSize="md" w="80%" mr="3">
                  {event.title}
                </Text>
                <Icon
                  as={FontAwesome}
                  name="arrow-right"
                  size="md"
                  color="primary.400"
                />
              </Flex>
              <Flex
                backgroundColor={"gray.100"}
                flexDirection="row"
                flexWrap={"wrap"}
                justifyContent="space-between"
                alignItems="center"
                borderBottomRadius="lg"
                overflow={"hidden"}
              >
                <Box pl="4" pr="4">
                  <Text fontSize="sm" color="primary.400">
                    {event.date}
                  </Text>
                </Box>
                {event.can_rsvp ? (
                  <Box backgroundColor="primary.400" flexGrow={1}>
                    <Button
                      variant="ghost"
                      _text={{ fontSize: "xs", color: "white" }}
                      _loading={{ backgroundColor: "white" }}
                    >
                      RSVP
                    </Button>
                  </Box>
                ) : (
                  <Box py="2" pr="4">
                    <Text fontSize="sm" color="primary.400">
                      {event.location}
                    </Text>
                  </Box>
                )}
              </Flex>
            </Box>
          ))}
        </Container>
      </ScrollView>
    </Page>
  );
}
