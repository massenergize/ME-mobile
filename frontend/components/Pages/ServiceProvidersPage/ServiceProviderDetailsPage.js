import React, { useEffect } from "react";
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
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ServiceProviderDetailsPage({ route, navigation }) {
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);
  return (
    <ScrollView mb="20" showsVerticalScrollIndicator={false}>
      <Center py="20" px="5">
        <Image
          source={require("../../../assets/images/green-energy-service-provider.png")}
          resizeMode="contain"
          alt="service provider's image"
        />
      </Center>
      <Box backgroundColor="white" px="5" pt="5" borderTopRadius="2xl">
        <Heading size="xl" mb="5">
          Provider A
        </Heading>
        <Box mb="5">
          <Text fontSize="lg" fontWeight="bold">
            Description
          </Text>
          <Text fontSize="md">
            DriveGreen is an electric vehicle (EV) discount program to make
            choosing an EV easier for you. Anyone is eligible to participate and
            receive a discount to purchase or lease a top EV model at a
            participating dealer. DriveGreen is a program of the Green Energy
            Consumers Alliance, non-profit organization that has been succeeding
            in making energy more affordable and environmentally sustainable
            since 1982. Green Energy serves as a trusted voice for both
            consumers and the environment on local, state, regional and national
            energy issues. Their goal is to reduce emissions 80% by 2050 and
            stop climate change. EVs are a big part of the solution!
          </Text>
        </Box>
        <Box mb="5">
          <Text fontSize="lg" fontWeight="bold">
            Contact Information
          </Text>
          <VStack space="2" mt="2">
            <HStack space="5">
              <Icon as={FontAwesome} name="phone" size="sm" />
              <Text>978-290-4610</Text>
            </HStack>
            <HStack space="5">
              <Icon as={FontAwesome} name="envelope" size="sm" />
              <Link isUnderlined={false}>hello@greenenergyconsumers.org</Link>
            </HStack>
            <HStack space="5">
              <Icon as={FontAwesome} name="globe" size="sm" />
              <Link _text={{ color: "primary.400" }}>
                https://www.energizeacton.org/drive
              </Link>
            </HStack>
          </VStack>
        </Box>
        <Box mb="5">
          <Text fontSize="lg" fontWeight="bold">
            Testimonials
          </Text>
          <VStack space="5" mt="2">
            <HStack
              space="5"
              backgroundColor="white"
              p="5"
              borderRadius="2xl"
              alignItems="center"
              shadow="5"
            >
              <Image
                source={require("../../../assets/images/testimonial-1.jpg")}
                alt="image"
                size="16"
                resizeMode="cover"
                borderRadius="full"
              />
              <VStack space="3">
                <Text>Free induction cooktop becomes availa...</Text>
                <Text color="primary.400">By Jude, November 9th, 2021</Text>
              </VStack>
            </HStack>
            <HStack
              space="5"
              backgroundColor="white"
              p="5"
              borderRadius="2xl"
              alignItems="center"
              shadow="5"
            >
              <Image
                // in case there is no image available, return an empty object
                source={{}}
                alt="image"
                size="16"
                resizeMode="cover"
                borderRadius="full"
                backgroundColor="gray.300"
              />
              <VStack space="3">
                <Text>Free induction cooktop becomes availa...</Text>
                <Text color="primary.400">By Jude, November 9th, 2021</Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
}
