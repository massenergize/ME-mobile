import React from "react";
import { Box, Image, Center, Button, VStack, Text, Heading } from "native-base";
import Page from "../../Shared/Page";

export default function WelcomePage({ navigation }) {
  return (
    <Page>
      <Image
        source={require("../../../assets/images/welcome-background.jpg")}
        alt="Welcome Background Image"
        resizeMode="stretch"
        height="full"
        width="full"
      />
      <Box
        width="100%"
        height="100%"
        position="absolute"
        backgroundColor="primary.100"
        opacity="60"
      ></Box>

      <Center width="full" height="full" position="absolute">
        <VStack space="20" alignItems="center" width="full">
          <Box alignItems={"center"}>
            <Image
              source={require("../../../assets/images/logo.png")}
              alt="MassEnergize's logo"
              resizeMode="contain"
              height="100px"
              width="300px"
            />
            <Heading color="white" size="xl">
              Join The Movement!
            </Heading>
          </Box>
          <VStack space="4" width="80%">
            <Button
              shadow="5"
              size="lg"
              backgroundColor="primary.400"
              onPress={() => navigation.navigate("withEmailOnly")}
            >
              With email only
            </Button>
            <Button
              shadow="5"
              size="lg"
              backgroundColor="black"
              onPress={() => navigation.navigate("login")}
            >
              With email and password
            </Button>
            <Button shadow="5" size="lg" backgroundColor="red.400">
              With Google
            </Button>
            <Button shadow="5" size="lg" backgroundColor="blue.400">
              With Facebook
            </Button>
            <Button
              size="lg"
              variant="ghost"
              _text={{ color: "white" }}
              onPress={() => navigation.navigate("chooseCommunity")}
            >
              Proceed as guest
            </Button>
          </VStack>
          <Text color="white" textAlign="center" px="3">
            When you join, we can count your impact. We do not collect sensitive
            personal data and do not share data.
          </Text>
        </VStack>
      </Center>
    </Page>
  );
}
