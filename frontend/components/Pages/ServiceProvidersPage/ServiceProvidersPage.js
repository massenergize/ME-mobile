import React from "react";
import {
  VStack,
  Text,
  Box,
  Heading,
  Image,
  ScrollView,
  HStack,
} from "native-base";

export default function ServiceProvidersPage() {
  const generateSProvider = () => {
    let sProvider = [];
    for (let i = 0; i < 3; i++) {
      sProvider.push(
        <Box mx="3">
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
              Provider A
            </Text>
            <Text fontWeight="thin">This could be a brief cr...</Text>
          </Box>
        </Box>
      );
    }
    return sProvider;
  };

  const generateVerticalSProvider = () => {
    let sProvider = [];
    for (let i = 0; i < 3; i++) {
      sProvider.push(
        <HStack space="5" my="2" alignItems="center">
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
    <ScrollView mt="10" mx="5" showsVerticalScrollIndicator={false}>
      <VStack space="10">
        <Box>
          <Heading>Suggested</Heading>
          <ScrollView horizontal={true} my="5" py="2">
            {generateSProvider()}
          </ScrollView>
        </Box>
        <Box width="45%">
          <Heading>All</Heading>
          {generateVerticalSProvider()}
        </Box>
      </VStack>
    </ScrollView>
  );
}
