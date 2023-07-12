import React, { useState, useEffect } from "react";
import { Button, Center, Flex, ScrollView } from "native-base";
import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";
import EventCard from "./EventCard";

import DummyResponse from "../../../data/eventsList.json";
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
  const [events, setEvents] = useState([]);
  const [eventFilterID, setEventFilterID] = useState(1); // 0 = upcoming, 1 = past, 2 = campaigns

  useEffect(() => {
    // TODO: make an API call here
    // TODO: add loading state (maybe a spinner)
    // TODO: a reallllly long delay whenever data is loading (potential solution: cache it)
    if (DummyResponse.success) {
      const data = DummyResponse.data;
      // filter out events from Energize Wayland (id: 3)
      const filteredEvents = data.filter((event) => event.community.id !== 3);
      setEvents(filteredEvents);
    }
  }, []);

  const getEventsByFilter = (id) => {
    if (id === 0) {
      // upcoming events
      return events.filter((event) => {
        const eventDate = new Date(event.start_date_and_time);
        const now = new Date();
        return eventDate > now;
      });
    } else if (id === 1) {
      // past events
      return events.filter((event) => {
        const eventDate = new Date(event.start_date_and_time);
        const now = new Date();
        return eventDate < now;
      });
    }
    // TODO: which field to filter by?
    // campaigns
    // return [];
  };

  return (
    <Page>
      <ScrollView
        p="5"
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <SearchBar
          pb="5"
          w="full"
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
        {/* events list */}
        {getEventsByFilter(eventFilterID).length > 0 ? (
          getEventsByFilter(eventFilterID).map((event) => (
            <EventCard
              key={event.id}
              title={event.name}
              date={formatDateString(
                new Date(event.start_date_and_time),
                new Date(event.end_date_and_time)
              )}
              location={event.location}
              imageURI={event.image.url}
              canRSVP={event.rsvp_enabled}
              onPress={() => navigation.navigate("eventDetails")}
              my="3"
              shadow="5"
            />
          ))
        ) : (
          <Center py="5">There are no more events.</Center>
        )}
      </ScrollView>
    </Page>
  );
}
