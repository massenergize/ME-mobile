import { Text, Pressable } from "react-native";
import React from "react";
import { Box, Heading, HStack, AspectRatio, Image, Stack } from "native-base";

export default ActionCard = React.memo(({
  navigation,
  id,
  title,
  imgUrl,
  impactMetric = 'Low',
  costMetric = '0',
  ...props
}) => {
  return (
    // <Box alignItems="center" width = "50%">
    // <Box alignItems="center" width={180} shadow={1} bg="white" rounded="lg" marginBottom={1}>
    
      <Pressable
        onPress={() => {
          navigation.navigate("actiondetails", {action_id: id})}
        } 
        // overflow="hidden"
        // bg="white" 
        // borderRadius="2xl"
        {...props}
        >
          <Box 
            bg="white" 
            borderRadius="xl" 
            shadow={2} 
            width={180}
            {...props}
          >
            <Box>
              {/* <AspectRatio w="100%" ratio={16 / 9}> */}
              {imgUrl ? (
                <Image
                  source={{uri: imgUrl}}
                  alt="image"
                  borderTopRadius="xl"
                  resizeMode="cover"
                  height={120}
                  bg="gray.300"
                />
              ) : (
                <Box height={120} bg="gray.300"></Box>
              )}
              {/* </AspectRatio> */}
            </Box>
            <Stack p={3} space={3}>
              <Stack space={2}>
                <Heading size="sm" isTruncated={true} noOfLines={1}>
                  {title ? title : "Action Title"}
                </Heading>
                <Text
                  fontSize="xs"
                  fontWeight="500"
                >
                  {`${impactMetric} Impact | ${costMetric}`}
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
})

