import React, { useEffect, useState } from "react";

import {
  Button,
  ScrollView,
  VStack,
  Text,
  Divider,
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Actionsheet,
  useDisclose,
  Spinner
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Page from "../../Shared/Page";
import HTMLParser from "../../Shared/HTMLParser";
import { dateFormatString } from "../../Shared/Utils";

import { apiCall } from "../../../api/functions";
import DummyResponse from "../../../data/eventInfo.json";

export default function EventDetailsPage({ route, navigation }) {
  const { event_id } = route.params;

  const [eventDetails, setEventDetails] = useState(null); // {name, description, date, location, imageURI, rsvp_enabled}
  const [isEventLoading, setIsEventLoading] = useState(true);
  const [rsvp, setRsvp] = useState(""); // "Interested", "Going", "Not Going"
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleAction = (action) => {
    if (action === rsvp) {
      setRsvp("");
    } else {
      setRsvp(action);
    }
    onClose();
  };


  const getEvent = () => {
    apiCall("events.info", {event_id: event_id}).then((json) => {
      if (json.success) {
        const data = json.data;
        const date = dateFormatString(
          new Date(data.start_date_and_time),
          new Date(data.end_date_and_time)
        );
  
        setEventDetails({
          name: data.name,
          description: data.description,
          date: date,
          location: data.location,
          imageURI: (data.image != null) ? data.image.url : null,
          rsvp_enabled: data.rsvp_enabled,
        });
          // console.log(json.data)
      } else {
          console.log(json);
      }
      console.log(eventDetails)
      setIsEventLoading(false);
    });
  }

  useEffect(() => {
    // TODO: make an API call here
    // TODO: add loading state (maybe a spinner)
    // if (DummyResponse.success) {
    //   const data = DummyResponse.data;
    //   const date = dateFormatString(
    //     new Date(data.start_date_and_time),
    //     new Date(data.end_date_and_time)
    //   );

    //   setEventDetails({
    //     name: data.name,
    //     description: data.description,
    //     date: date,
    //     location: data.location,
    //     imageURI: data.image.url,
    //     rsvp_enabled: data.rsvp_enabled,
    //   });
    // }
    getEvent();
  }, []); // Only excute once,

  return (
    <Page py="5">
      {isEventLoading 
        ? <Spinner />
        : 
        <ScrollView showsVerticalScrollIndicator={false} mx="5">
          <VStack space="2">
            {/* event image */}
            <AspectRatio ratio={16 / 9}>
              <Image
                source={{
                  uri: eventDetails.imageURI,
                }}
                alt="event's image"
                resizeMode="contain"
              />
            </AspectRatio>
            {/* event details */}
            <VStack>
              <Text fontSize="lg" fontWeight="bold" color="primary.400">
                Date
              </Text>
              <Text>{eventDetails.date}</Text>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold" color="primary.400">
                Venue
              </Text>
              <Text>{(eventDetails.location) ? (eventDetails.location.city + ", " + eventDetails.location.state) : "N/A"}</Text>
            </VStack>
            {/* TODO: What field has this? */}
            {/* <Text fontSize="lg" fontWeight="bold" color="primary.400">
              Every Wednedsay through 2023-08-31
            </Text> */}
            {eventDetails.rsvp_enabled && (
              <Button
                backgroundColor={
                  rsvp === "Going" ? "secondary.400" : "primary.600"
                }
                onPress={onOpen}
              >
                <Text color="white" fontWeight="bold">
                  {rsvp || "RSVP for this event!"}
                  {"  "}
                  {isOpen ? (
                    <Icon as={FontAwesome} name="chevron-up" color="white" />
                  ) : (
                    <Icon as={FontAwesome} name="chevron-down" color="white" />
                  )}
                </Text>
              </Button>
            )}
            {/* RSVP options (shouldn't appear if RSVP button isn't enabled) */}
            <Actionsheet isOpen={isOpen} onClose={onClose} on>
              <Actionsheet.Content>
                <Actionsheet.Item
                  backgroundColor={rsvp === "Interested" ? "muted.200" : "white"}
                  onPress={() => handleAction("Interested")}
                >
                  Interested
                </Actionsheet.Item>
                <Actionsheet.Item
                  backgroundColor={rsvp === "Going" ? "muted.200" : "white"}
                  onPress={() => handleAction("Going")}
                >
                  Going
                </Actionsheet.Item>
                <Actionsheet.Item
                  backgroundColor={rsvp === "Not Going" ? "muted.200" : "white"}
                  onPress={() => handleAction("Not Going")}
                >
                  Not Going
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </VStack>
          <Divider my="4" />
          <Box>
            <Heading textAlign="center">
              {eventDetails.name || "Event Name"}
            </Heading>
            {eventDetails.description && (
              <HTMLParser
                htmlString={eventDetails.description}
                baseStyle={textStyle}
              />
            )}
          </Box>
        </ScrollView>
      }
    </Page>
  );
}

const textStyle = {
  fontSize: "16px",
};
