import { View, Text } from "react-native";
import React from "react";
import { Box, Center, Heading, HStack, AspectRatio, Image, Stack } from "native-base";

const ActionCard = () => {
  return (
    <Box alignItems="center" width = "50%">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg"
          }} alt="image" />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Change to LED
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              Impact | Cost | Difficulty
            </Text>
          </Stack>
          {/*
          <Text fontWeight="400">
            Learn something cool about this task here!
          </Text>
        */}
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
                5 completed recently.
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
    
  );
}

export default ActionCard;