import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  HStack,
  Text,
  Heading,
  VStack,
  Icon,
  Link,
  Image,
  ScrollView,
  Spinner
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Page from "../../Shared/Page";

import { apiCall } from "../../../api/functions";
import DummyResponse from "../../../data/vendorsInfo.json";
import HTMLParser from "../../Shared/HTMLParser";

export default function ServiceProviderDetailsPage({ route, navigation }) {
  const { vendor_id } = route.params;
  const [spDetails, setSpDetails] = useState({});
  const [isSpLoading, setIsSpLoading] = useState(true);

  const getSpDetails = () => {
    navigation.setOptions({ title: "" });
    apiCall("vendors.info", {vendor_id: vendor_id}).then((json) => {
      if (json.success) {
          setSpDetails(json.data);
          // console.log(json.data)
          navigation.setOptions({ title: json.data?.name })
      } else {
          console.log(json);
      }
      setIsSpLoading(false);
    });
  }

  useEffect(() => {
    // TODO: make an API call here
    // TODO: add loading state (maybe a spinner)
    // if (DummyResponse.success) {
    //   const data = DummyResponse.data;
    //   setSpDetails(data);
    //   navigation.setOptions({ title: data?.name });
    // }
    getSpDetails();
  }, []);
  return (
    <Page>
      {isSpLoading
      ? <Spinner />
      :
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* image */}
        <Center py="20" px="5">
          <Image
            source={{
              uri: spDetails.logo?.url,
            }}
            resizeMode="contain"
            alt="service provider's image"
            w="full"
            h="200"
          />
        </Center>
        {/* content */}
        <Box
          backgroundColor="white"
          px="5"
          pt="5"
          pb="20"
          borderTopRadius="2xl"
          shadow="5"
        >
          <Heading size="xl" mb="5">
            {spDetails.name}
          </Heading>
          <Box mb="5">
            <Text fontSize="lg" fontWeight="bold">
              Description
            </Text>
            {spDetails.description && (
              <HTMLParser
                htmlString={spDetails.description}
                baseStyle={{ fontSize: "16px" }}
              />
            )}
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Contact Information
            </Text>
            <VStack space="2" mt="2">
              <HStack space="5">
                <Icon as={FontAwesome} name="phone" size="sm" />
                <Text>{spDetails.phone_number}</Text>
              </HStack>
              <HStack space="5">
                <Icon as={FontAwesome} name="envelope" size="sm" />
                <Link isUnderlined={false}>{spDetails.email}</Link>
              </HStack>
              <HStack space="5">
                <Icon as={FontAwesome} name="globe" size="sm" />
                <Link _text={{ color: "primary.400" }}>
                  {spDetails.website}
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    }
    </Page>
  );
}
