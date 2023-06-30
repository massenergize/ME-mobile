import { Text, Pressable } from "react-native";
import React from "react";
import { Box, Heading, HStack, AspectRatio, Image, Stack } from "native-base";

import Page from "../../Shared/Page";

const investigateAction = () => {
  // const [actionCard, setActionCard] = useState();
  // setActionCard(true);
};

function ActionCard({ navigation }) {
  return (
    // <Box alignItems="center" width = "50%">
    <Box alignItems="center" width={200} shadow={1} bg="white" rounded="lg" marginBottom={1}>
    
      <Pressable onPress={() => {console.log("Action clicked"), investigateAction(), navigation.navigate("actiondetails")}} maxW={80} rounded="lg" overflow="hidden" borderRadius= {15} backgroundColor = "white" borderColor="coolGray.200" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "white"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "white"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Change to LED
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
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
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                5 completed recently.
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Pressable>
    </Box>
  );
}

export default ActionCard;
