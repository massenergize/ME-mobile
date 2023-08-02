import React, { useState, useEffect, useContext } from "react";
import { Button, Center, FlatList, Flex, Spinner, View } from "native-base";
import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";
import EventCard from "./EventCard";
import { CommunityContext } from "../../Contexts/CommunityContext";
import { formatDateString } from "../../Shared/Utils";

const filterOptions = [
  {
    value: 0,
    label: "All",
  },
  {
    value: 5,
    label: "Home Energy",
  },
  {
    value: 33,
    label: "Solar",
  },
  {
    value: 7,
    label: "Transportation",
  },
  {
    value: 8,
    label: "Waste & Recycling",
  },
  {
    value: 3,
    label: "Food",
  },
  {
    value: 1,
    label: "Activism & Education",
  },
  {
    value: 9,
    label: "Land, Soil & Water",
  },
];

export default function EventsPage({ navigation }) {
  const { events } = useContext(CommunityContext);

  const [isLoading, setIsLoading] = useState(true);
  const [newEvents, setNewEvents] = useState([]);

  const [eventFilterID, setEventFilterID] = useState(1); // 0 = upcoming, 1 = past, 2 = campaigns

  useEffect(() => {
    setIsLoading(true);
    if (eventFilterID === 0) {
      // upcoming events
      setNewEvents(
        events.filter((event) => {
          const eventDate = new Date(event.start_date_and_time);
          const now = new Date();
          return eventDate > now;
        })
      );
    } else if (eventFilterID === 1) {
      // past events
      setNewEvents(
        events.filter((event) => {
          const eventDate = new Date(event.start_date_and_time);
          const now = new Date();
          return eventDate < now;
        })
      );
    } else {
      // TODO: campaigns
      setNewEvents([]);
    }
    setIsLoading(false);
  }, [eventFilterID]);

  return (
    <Page p={3}>
      {isLoading ? (
        <Center flex="1">
          <Spinner />
        </Center>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View>
              <SearchBar
                pb="5"
                w="100%"
                filterOptions={filterOptions}
                filterHeader="Category"
              />
              {/* events filter */}
              <Flex flexDirection="row">
                <Button
                  variant={eventFilterID === 0 ? "solid" : "outline"}
                  _text={{ fontSize: "xs" }}
                  borderRadius="full"
                  onPress={() => setEventFilterID(0)}
                >
                  Upcoming Events
                </Button>
                <Button
                  variant={eventFilterID === 1 ? "solid" : "outline"}
                  _text={{ fontSize: "xs" }}
                  borderRadius="full"
                  onPress={() => setEventFilterID(1)}
                >
                  Past Events
                </Button>
                <Button
                  variant="outline"
                  _text={{ fontSize: "xs" }}
                  borderRadius="full"
                  onPress={() => handleFilter(2)}
                  isDisabled
                >
                  Campaigns
                </Button>
              </Flex>
            </View>
          }
          ListEmptyComponent={<Center>There are no events.</Center>}
          data={newEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard
              title={item.name}
              date={formatDateString(
                new Date(item.start_date_and_time),
                new Date(item.end_date_and_time)
              )}
              location={item.location}
              imageUrl={item.image?.url}
              canRSVP={item.rsvp_enabled}
              id={item.id}
              navigation={navigation}
              my="3"
              mx={2}
              shadow={3}
            />
          )}
        />
      )}
    </Page>
  );
}
