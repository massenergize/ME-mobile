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
  return (
    <ScrollView mt="10" mx="5" showsVerticalScrollIndicator={false}>
      <VStack space="10">
        <Box>
          <Heading>Suggested</Heading>
          <ScrollView horizontal={true} my="5">
            <Box mx="3">
              <Image
                source={require("../../../assets/images/logo.png")}
                resizeMode="contain"
                alt="image"
                size="32"
                backgroundColor="gray.100"
                borderRadius="20"
              />
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
            <Box mx="3">
              <Image
                source={require("../../../assets/images/logo.png")}
                resizeMode="contain"
                alt="image"
                size="32"
                backgroundColor="gray.100"
                borderRadius="20"
              />
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
            <Box mx="3">
              <Image
                source={require("../../../assets/images/logo.png")}
                resizeMode="contain"
                alt="image"
                size="32"
                backgroundColor="gray.100"
                borderRadius="20"
              />
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
            <Box mx="3">
              <Image
                source={require("../../../assets/images/logo.png")}
                resizeMode="contain"
                alt="image"
                size="32"
                backgroundColor="gray.100"
                borderRadius="20"
              />
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
            <Box mx="3">
              <Image
                source={require("../../../assets/images/logo.png")}
                resizeMode="contain"
                alt="image"
                size="32"
                backgroundColor="gray.100"
                borderRadius="20"
              />
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
            <Box mx="3">
              <Image
                source={require("../../../assets/images/logo.png")}
                resizeMode="contain"
                alt="image"
                size="32"
                backgroundColor="gray.100"
                borderRadius="20"
              />
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
          </ScrollView>
        </Box>
        <Box>
          <Heading>All</Heading>
          <HStack space="2" my="2">
            <Image
              source={require("../../../assets/images/logo.png")}
              resizeMode="contain"
              alt="image"
              size="32"
              backgroundColor="gray.100"
              borderRadius="20"
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
          </HStack>
          <HStack space="2" my="2">
            <Image
              source={require("../../../assets/images/logo.png")}
              resizeMode="contain"
              alt="image"
              size="32"
              backgroundColor="gray.100"
              borderRadius="20"
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
          </HStack>
          <HStack space="2" my="2">
            <Image
              source={require("../../../assets/images/logo.png")}
              resizeMode="contain"
              alt="image"
              size="32"
              backgroundColor="gray.100"
              borderRadius="20"
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
          </HStack>
          <HStack space="2" my="2">
            <Image
              source={require("../../../assets/images/logo.png")}
              resizeMode="contain"
              alt="image"
              size="32"
              backgroundColor="gray.100"
              borderRadius="20"
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
          </HStack>
          <HStack space="2" my="2">
            <Image
              source={require("../../../assets/images/logo.png")}
              resizeMode="contain"
              alt="image"
              size="32"
              backgroundColor="gray.100"
              borderRadius="20"
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Provider A
              </Text>
              <Text fontWeight="thin">Solar Panel...</Text>
            </Box>
          </HStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}
