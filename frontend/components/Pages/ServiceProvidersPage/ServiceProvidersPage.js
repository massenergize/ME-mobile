import React, { useState, useEffect, useContext } from "react";
import { VStack, Box, Heading, ScrollView } from "native-base";

import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";
import ServiceProviderCard from "./ServiceProviderCard";
import { CommunityContext } from "../../Contexts/CommunityContext";

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

export default function ServiceProvidersPage({ route, navigation }) {
  const { community_id } = route.params;

  const { vendors } = useContext(CommunityContext);

  return (
    <Page>
      <ScrollView pt="10" px="5" showsVerticalScrollIndicator={false}>
        <SearchBar filterOptions={filterOptions} filterHeader="Category" />
        <VStack space="5" py="10">
          <Box>
            <Heading>Suggested</Heading>
            {/* render cards horizontally */}
            <ScrollView horizontal={true} my="5" py="2">
              {vendors &&
                vendors.map((sProvider, index) => {
                  return (
                    <ServiceProviderCard
                      id={sProvider.id}
                      key={index}
                      direction="column"
                      name={sProvider.name}
                      imageURI={sProvider.logo ? sProvider.logo.url : null}
                      navigation={navigation}
                      // onPress={() =>
                      //   navigation.navigate("serviceProviderDetails", {vendor_id: sProvider.id})
                      // }
                      my="3"
                    />
                  );
                })}
            </ScrollView>
          </Box>
          <Box>
            <Heading>All</Heading>
            {/* render cards vertically */}
            {vendors &&
              vendors.map((sProvider, index) => {
                return (
                  <ServiceProviderCard
                    id={sProvider.id}
                    key={index}
                    direction="row"
                    name={sProvider.name}
                    imageURI={sProvider.logo ? sProvider.logo.url : null}
                    // onPress={() =>
                    //   navigation.navigate("serviceProviderDetails", {vendor_id: sProvider.id})
                    // }
                    navigation={navigation}
                    my="3"
                  />
                );
              })}
          </Box>
        </VStack>
      </ScrollView>
    </Page>
  );
}
