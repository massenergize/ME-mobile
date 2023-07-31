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
import HTMLParser from "../../Shared/HTMLParser";
import { useDetails } from "../../Contexts/CommunityContext";

export default function ServiceProviderDetailsPage({ route, navigation }) {
  const { vendor_id } = route.params;

  const [spDetails, isSpLoading] = useDetails("vendors.info", {vendor_id: vendor_id});

  useEffect(() => {
    (spDetails)
    ? navigation.setOptions({ title: spDetails?.name })
    : navigation.setOptions({ title: "" });
  }, [spDetails]);

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
