import { Text, Pressable } from "react-native";
import React from "react";
import { Box, Heading, HStack, AspectRatio, Image, Stack } from "native-base";

function ActionCard({ navigation, action, ...props }) {
  const getMetric = (metric) => {
    for (let i = 0; i < action.tags.length; i++) {
      if (action.tags[i].tag_collection_name === metric) {
        return action.tags[i].name;
      }
    }
    return "-";
  };

  return (
    // <Box alignItems="center" width = "50%">
    // <Box alignItems="center" width={180} shadow={1} bg="white" rounded="lg" marginBottom={1}>
    
      <Pressable
        onPress={() => {console.log("Action clicked"), navigation.navigate("actiondetails", {action_id: action.id})}} 
        // overflow="hidden"
        // bg="white" 
        // borderRadius="2xl"
        >
          <Box bg="white" borderRadius="xl" shadow={2} width={180}>
            <Box>
              {/* <AspectRatio w="100%" ratio={16 / 9}> */}
                <Image
                  source={{
                    // uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg",
                    uri: (action.image != null) ? action.image.url : null,
                  }}
                  alt="image"
                  borderTopRadius="xl"
                  resizeMode="cover"
                  height={120}
                  bg="gray.300"
                />
              {/* </AspectRatio> */}
            </Box>
            <Stack p={3} space={3}>
              <Stack space={2}>
                <Heading size="sm" isTruncated={true} noOfLines={1}>
                  {action.title}
                </Heading>
                <Text
                  fontSize="xs"
                  fontWeight="500"
                >
                  {/* {getMetric("Impact")} | {getMetric("Cost")} | Difficulty */}
                  {getMetric("Impact")} Impact | {getMetric("Cost")}
                </Text>
              </Stack>
              {/*
              <Text fontWeight="400">
                Learn something cool about this task here!
              </Text>
            */}
          {/* <HStack alignItems="center" space={4} justifyContent="space-between">
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
              </HStack> */}
        </Stack>
      </Box>
    </Pressable>
    // </Box>
  );
}

export default ActionCard;
