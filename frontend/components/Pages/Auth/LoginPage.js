import React from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Text,
} from "native-base";

export default function LoginPage({ navigation }) {
  return (
    <Center width="100%" flex="1">
      <Box w="100%" maxW="300">
        <Heading mt="1" color="coolGray.600" fontWeight="medium">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <Input variant="rounded" size="lg" placeholder="Email address..." />
          </FormControl>
          <FormControl>
            <Input
              variant="rounded"
              size="lg"
              placeholder="Password..."
              type="password"
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "700",
                color: "primary.300",
              }}
              alignSelf="flex-end"
              mt="1"
              mr="2"
            >
              Forgot Password?
            </Link>
          </FormControl>
          <Button mt="10" _text={{ color: "white" }}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center" alignItems="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{ color: "primary.300", bold: true, fontSize: "sm" }}
              onPress={() => navigation.navigate("signup")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
