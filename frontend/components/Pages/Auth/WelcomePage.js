import React from "react";
import { Box, Image, Center, Button, Flex } from "native-base";

export default function WelcomePage({ navigation }) {
  return (
    <Box>
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
        opacity="30"
      ></Box>
      <Center position="absolute" height="full" width="full" alignSelf="center">
        <Box width="90%">
          <Image
            source={require("../../../assets/images/logo.png")}
            alt="MassEnergize's logo"
            resizeMode="contain"
          />
        </Box>
        <Flex direction="column" alignSelf="center" width="90%">
          <Button
            mb="10"
            onPress={() => navigation.navigate("login")}
            _text={{
              fontSize: "md",
            }}
          >
            Sign In
          </Button>
          <Button
            onPress={() => navigation.navigate("signup")}
            _text={{
              fontSize: "md",
            }}
          >
            Create A Profile
          </Button>
        </Flex>
      </Center>
    </Box>
  );
}
