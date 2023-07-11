import React, { useState, useEffect } from "react";
import { VStack, Box, Heading, ScrollView, Spinner } from "native-base";

import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";
import ServiceProviderCard from "./ServiceProviderCard";

import { apiCall } from "../../../api/functions";
import DummyResponse from "../../../data/vendorsList.json";

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
  const [sProviders, setSProviders] = useState([]);
  const [isSProvidersLoading, setIsSProvidersLoading] = useState(true);

  const getSProvidersList = () => {
    apiCall("vendors.list", {community_id: community_id}).then((json) => {
      if (json.success) {
          setSProviders(json.data);
          // console.log(json.data)
      } else {
          console.log(json);
      }
      setIsSProvidersLoading(false);
    });
  }

  useEffect(() => {
    // TODO: make an API call here
    // TODO: add loading state (maybe a spinner)
    // if (DummyResponse.success) {
    //   const data = DummyResponse.data;
    //   setSProviders(data);
    // }
    getSProvidersList();
  }, []);

  return (
    <Page>
      {
        isSProvidersLoading 
        ? <Spinner />
        : <ScrollView pt="10" px="5" showsVerticalScrollIndicator={false}>
          <SearchBar filterOptions={filterOptions} filterHeader="Category" />
          <VStack space="5" py="10">
            <Box>
              <Heading>Suggested</Heading>
              {/* render cards horizontally */}
              <ScrollView horizontal={true} my="5" py="2">
                {sProviders &&
                  sProviders.map((sProvider, index) => {
                    return (
                      <ServiceProviderCard
                        key={index}
                        direction="column"
                        name={sProvider.name}
                        imageURI={sProvider.logo.url}
                        onPress={() =>
                          navigation.navigate("serviceProviderDetails")
                        }
                        my="3"
                      />
                    );
                  })}
              </ScrollView>
            </Box>
            <Box>
              <Heading>All</Heading>
              {/* render cards vertically */}
              {sProviders &&
                sProviders.map((sProvider, index) => {
                  return (
                    <ServiceProviderCard
                      key={index}
                      direction="row"
                      name={sProvider.name}
                      imageURI={sProvider.logo.url}
                      onPress={() =>
                        navigation.navigate("serviceProviderDetails")
                      }
                      my="3"
                    />
                  );
                })}
            </Box>
          </VStack>
        </ScrollView>
      }
    </Page>
  );
}
