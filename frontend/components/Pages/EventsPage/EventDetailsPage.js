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
  Spinner,
  Center
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Page from "../../Shared/Page";
import HTMLParser from "../../Shared/HTMLParser";
import { formatDateString } from "../../Shared/Utils";
import { useDetails } from "../../Contexts/CommunityContext";

export default function EventDetailsPage({ route, navigation }) {
  const { event_id } = route.params;

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

  const [event, isEventLoading] = useDetails("events.info", {event_id: event_id});

  return (
    <Page py="5">
      {isEventLoading 
        ? 
        <Center width="100%" height="100%">
          <Spinner size="lg"/>
        </Center>
        : 
        <ScrollView showsVerticalScrollIndicator={false} mx="5">
          <VStack space="2">
            {/* event image */}
            <AspectRatio ratio={16 / 9}>
              <Image
                source={{
                  uri: (event.image != null) ? event.image.url : null,
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
              <Text>{
                formatDateString(new Date(event.start_date_and_time), new Date(event.end_date_and_time))
              }</Text>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold" color="primary.400">
                Venue
              </Text>
              <Text>{(event.location) ? (event.location.city + ", " + event.location.state) : "N/A"}</Text>
            </VStack>
            {/* TODO: What field has this? */}
            {/* <Text fontSize="lg" fontWeight="bold" color="primary.400">
              Every Wednedsay through 2023-08-31
            </Text> */}
            {event.rsvp_enabled && (
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
              {event.name || "Event Name"}
            </Heading>
            {event.description && (
              <HTMLParser
                htmlString={event.description}
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
