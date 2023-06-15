import React from "react";
import {
  Center,
  Text,
  VStack,
  Image,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
} from "native-base";

export default function CreateProfile() {
  return (
    <Center width="full" height="full">
      <VStack space="4" width="80%" alignItems="center">
        <Image
          source={require("../../../assets/images/cooler-concord.png")}
          resizeMode="contain"
          size="32"
          alt="image"
        />
        <Box>
          <Heading textAlign="center">Almost there!</Heading>
          <Text textAlign="center">Please create a profile.</Text>
        </Box>
        <VStack width="full" space="5">
          <FormControl>
            <Input variant="rounded" size="lg" placeholder="First name..." />
          </FormControl>
          <FormControl>
            <Input variant="rounded" size="lg" placeholder="Last name..." />
          </FormControl>
          <FormControl>
            <Input variant="rounded" size="lg" placeholder="Username..." />
          </FormControl>
          <FormControl>
            <Input variant="rounded" size="lg" placeholder="Zip Code..." />
          </FormControl>
          <Text textAlign="center" fontSize="10px">
            By cotinuing, I accept the{" "}
            <Text color="blue.400">Privacy Policy</Text> (in short, MassEnergize
            or host organization won't share my data) and agree to comply with
            the <Text color="blue.400">Terms of Service</Text>.
          </Text>
        </VStack>
        <Button shadow="5" size="lg" width="full">
          Finish Singing Up
        </Button>
        <Button size="lg" width="full" variant="ghost">
          Cancel
        </Button>
      </VStack>
    </Center>
  );
}
