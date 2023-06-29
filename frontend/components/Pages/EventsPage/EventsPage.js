import React from "react";
import { Button, Flex, ScrollView } from "native-base";
import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";
import EventCard from "./EventCard";

const EVENTS = [
  {
    id: 1,
    title: "Nature of Acton and Boxborough 2023 - A BioBlitz",
    date: "June 15th, 4:00 AM - 11:00 PM",
    location: "Hybrid",
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
    can_rsvp: true,
    is_rsvped: false,
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
    is_rsvped: false,
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
    is_rsvped: false,
    is_shared: true,
  },
  {
    id: 4,
    title: "(TEMP) Nature of Acton and Boxborough 2023 - A BioBlitz",
    date: "June 15th, 4:00 AM - 11:00 PM",
    location: "Hybrid",
    image:
      "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
    can_rsvp: true,
    is_rsvped: true,
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
            variant="solid"
            _text={{ fontSize: "xs" }}
            borderRadius="full"
          >
            Upcoming Events
          </Button>
          <Button
            variant="outline"
            _text={{ fontSize: "xs" }}
            borderRadius="full"
          >
            Past Events
          </Button>
          <Button
            variant="outline"
            _text={{ fontSize: "xs" }}
            borderRadius="full"
          >
            Campaigns
          </Button>
        </Flex>
        {EVENTS.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            imageURI={event.image}
            canRSVP={event.can_rsvp}
            isRSVPED={event.is_rsvped}
            isShared={event.is_shared}
            onPress={() => navigation.navigate("eventDetails")}
            my="3"
            shadow="5"
          />
        ))}
      </ScrollView>
    </Page>
  );
}
