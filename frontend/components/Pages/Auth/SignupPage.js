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

export default function SignupPage({ navigation }) {
  return (
    <Center width="100%" flex="1">
      <Box w="100%" maxW="300">
        <Heading mt="1" color="coolGray.600" fontWeight="medium">
          Sign up to join your community!
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
          </FormControl>
          <FormControl>
            <Input
              variant="rounded"
              size="lg"
              placeholder="Confirm password..."
              type="password"
            />
          </FormControl>
          <Button mt="10" _text={{ color: "white" }}>
            Sign up
          </Button>
          <HStack mt="6" justifyContent="center" alignItems="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              I have an account.{" "}
            </Text>
            <Link
              _text={{ color: "primary.300", bold: true, fontSize: "sm" }}
              onPress={() => navigation.navigate("login")}
            >
              Sign In
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
