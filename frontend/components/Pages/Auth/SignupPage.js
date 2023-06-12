import { Text } from "react-native";
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
  Divider,
} from "native-base";

export default function SignupPage({ navigation }) {
  return (
    <Center width="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading mt="1" color="coolGray.600" fontWeight="medium">
          Sign up to join your community!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="cyan" _text={{ color: "white" }}>
            Sign up
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              I have an account.{" "}
            </Text>
            <Link
              _text={{ color: "cyan.500", bold: true, fontSize: "sm" }}
              onPress={() => navigation.navigate("login")}
            >
              Sign In
            </Link>
          </HStack>
        </VStack>
        <Divider my="6" />
        <HStack justifyContent="center" mt="6">
          <Button
            variant="outline"
            colorScheme="muted"
            _text={{ color: "muted.700", bold: true }}
          >
            Sign up with Google
          </Button>
          <Button
            variant="outline"
            colorScheme="muted"
            _text={{ color: "muted.700", bold: true }}
          >
            Sign In As Guest
          </Button>
        </HStack>
      </Box>
    </Center>
  );
}
