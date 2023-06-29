import React from "react";
import { VStack, Box, Heading, ScrollView } from "native-base";
import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";
import ServiceProviderCard from "./ServiceProviderCard";

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

export default function ServiceProvidersPage({ navigation }) {
  const generateSProvider = () => {
    let sProvider = [];
    for (let i = 0; i < 3; i++) {
      sProvider.push(
        <ServiceProviderCard
          key={i}
          direction="column"
          name={`Provider ${i}`}
          description="This could be a brief description of the service provider."
          image={null}
          onPress={() => navigation.navigate("serviceProviderDetails")}
          mx="3"
        />
      );
    }
    return sProvider;
  };

  const generateVerticalSProvider = () => {
    let sProvider = [];
    for (let i = 0; i < 3; i++) {
      sProvider.push(
        <ServiceProviderCard
          key={i}
          direction="row"
          name={`Provider ${i}`}
          description="This could be a brief description of the service provider."
          image={null}
          onPress={() => navigation.navigate("serviceProviderDetails")}
          my="3"
        />
      );
    }
    return sProvider;
  };

  return (
    <Page>
      <ScrollView mt="10" mx="5" showsVerticalScrollIndicator={false}>
        <SearchBar filterOptions={filterOptions} filterHeader="Category" />
        <VStack space="10">
          <Box>
            <Heading>Suggested</Heading>
            <ScrollView horizontal={true} my="5" py="2">
              {generateSProvider()}
            </ScrollView>
          </Box>
          <Box>
            <Heading>All</Heading>
            {generateVerticalSProvider()}
          </Box>
        </VStack>
      </ScrollView>
    </Page>
  );
}
