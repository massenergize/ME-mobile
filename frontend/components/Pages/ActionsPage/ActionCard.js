import { Text, Pressable } from "react-native";
import React from "react";
import { Box, Heading, HStack, AspectRatio, Image, Stack } from "native-base";

const investigateAction = () => {
  // const [actionCard, setActionCard] = useState();
  // setActionCard(true);
};

function ActionCard({ navigation }) {
  return (
    // <Box alignItems="center" width = "50%">
    // <Box alignItems="center" width={180} shadow={1} bg="white" rounded="lg" marginBottom={1}>
    
      <Pressable
        onPress={() => {console.log("Action clicked"), investigateAction(), navigation.navigate("actiondetails")}} 
        // overflow="hidden"
        // bg="white" 
        // borderRadius="2xl"
        >
          <Box bg="white" borderRadius="xl" shadow={2} width={180}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg",
                  }}
                  alt="image"
                  borderTopRadius="xl"
                />
              </AspectRatio>
            </Box>
            <Stack p={3} space={3}>
              <Stack space={2}>
                <Heading size="md" isTruncated={true} noOfLines={1}>
                  Change LED
                </Heading>
                <Text
                  fontSize="xs"
                  fontWeight="500"
                >
                  Impact | $$$ | Difficulty
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
