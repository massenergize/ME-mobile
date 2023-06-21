import React from "react";
import {
  VStack,
  Text,
  Box,
  Heading,
  Image,
  ScrollView,
  HStack,
  Pressable,
} from "native-base";
import Page from "../../Shared/Page";

export default function ServiceProvidersPage({ navigation }) {
  const generateSProvider = () => {
    let sProvider = [];
    for (let i = 0; i < 3; i++) {
      sProvider.push(
        <Box mx="3" width="40" key={i}>
          <Pressable
            onPress={() =>
              navigation.navigate("serviceProviderDetails", {
                title: `Provider ${i}`,
              })
            }
          >
            <Image
              source={require("../../../assets/images/logo.png")}
              resizeMode="contain"
              alt="image"
              size="40"
              backgroundColor="gray.200"
              borderRadius="20"
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Provider {i}
              </Text>
              <Text fontWeight="thin">
                This could be a brief description of...
              </Text>
            </Box>
          </Pressable>
        </Box>
      );
    }
    return sProvider;
  };

  const generateVerticalSProvider = () => {
    let sProvider = [];
    for (let i = 0; i < 3; i++) {
      sProvider.push(
        <HStack space="5" my="2" alignItems="center" key={i}>
          <Image
            source={require("../../../assets/images/logo.png")}
            resizeMode="contain"
            alt="image"
            size="40"
            backgroundColor="gray.200"
            borderRadius="20"
          />
          <Box width="150">
            <Text fontWeight="bold" fontSize="lg">
              Provider A
            </Text>
            <Text fontWeight="thin">
              This could be a longer version of the description of the service
              provider.
            </Text>
          </Box>
        </HStack>
      );
    }
    return sProvider;
  };

  return (
    <Page>
      <ScrollView mt="10" mx="5" showsVerticalScrollIndicator={false}>
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
