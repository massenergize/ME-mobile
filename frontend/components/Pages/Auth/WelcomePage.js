import React from "react";
import { Box, Image, Container, Center, Button, Flex } from "native-base";

export default function WelcomePage({ navigation }) {
  return (
    <Box>
      <Image
        source={require("../../../assets/images/welcome-background.jpg")}
        alt="Welcome Background Image"
        resizeMode="cover"
        height="100%"
        width="100%"
      />
      <Center position="absolute" alignSelf="center">
        <Container>
          <Image
            source={require("../../../assets/images/logo.png")}
            alt="MassEnergize's logo"
            resizeMode="contain"
          />
        </Container>
        <Flex direction="column" alignSelf="center" width="80%">
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
