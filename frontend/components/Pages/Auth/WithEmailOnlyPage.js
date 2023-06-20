import React from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
} from "native-base";
import Page from "../../Shared/Page";

export default function WithEmailOnlyPage() {
  return (
    <Page>
      <Center width="100%" flex="1">
        <Box w="100%" maxW="300">
          <Heading mt="1" color="coolGray.600" fontWeight="medium">
            Sign in or join with email
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <Input
                variant="rounded"
                size="lg"
                placeholder="Email address..."
              />
              <Text fontSize="xs" mt="2" ml="2" color="muted.400">
                We will send you an email with a verification link.
              </Text>
            </FormControl>
            <Button mt="10" _text={{ color: "white" }}>
              Send
            </Button>
          </VStack>
        </Box>
      </Center>
    </Page>
  );
}
