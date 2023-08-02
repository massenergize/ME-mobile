import React from "react";
import {
  Box,
  Pressable,
  AspectRatio,
  Image,
  Text,
  Icon,
  Flex,
  Center,
  Button,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default EventCard = React.memo(({
  title,
  date,
  location,
  imageUrl,
  canRSVP,
  isRSVPED,
  isShared,
  // onPress,
  id,
  navigation,
  ...props
}) => {
  return (
    <Box rounded="lg" backgroundColor="white" {...props}>
      <Pressable onPress={() =>
        navigation.navigate("eventDetails", {event_id: id})
      }>
        <Box pt="2">
          {imageUrl ? (
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{ uri: imageUrl }}
                alt="event's image"
                resizeMode="contain"
              />
            </AspectRatio>
          ) : (
            <Box height={200} bg="gray.300"></Box>
          )}

          {isShared && (
            <Center
              bg="secondary.400"
              _text={{
                color: "white",
                fontWeight: "bold",
                fontSize: "xs",
              }}
              position="absolute"
              px="5"
              py="1.5"
              rounded="full"
              right="5"
              top="2"
            >
              SHARED
            </Center>
          )}
        </Box>

        <Flex px="4" pt="4" flexDirection="row" justifyContent="space-between">
          <Text fontWeight="bold" fontSize="md" w="80%" mr="3">
            {title}
          </Text>
          <Icon
            as={FontAwesome}
            name="arrow-right"
            size="md"
            color="primary.400"
          />
        </Flex>

        <Flex
          backgroundColor="gray.100"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          borderBottomRadius="lg"
          overflow="hidden"
        >
          <Box px="4">
            <Text fontSize="sm" color="primary.400">
              {date}
            </Text>
          </Box>

          {canRSVP ? (
            <Box
              backgroundColor={isRSVPED ? "secondary.400" : "primary.400"}
              flexGrow="1"
            >
              <Button
                variant="ghost"
                _text={{ fontSize: "xs", color: "white" }}
              >
                RSVP
              </Button>
            </Box>
          ) : (
            <Box py="2" px="4">
              <Text fontSize="sm" color="primary.400">
                {location ? `${location.city}, ${location.state}` : ""}
              </Text>
            </Box>
          )}
        </Flex>
      </Pressable>
    </Box>
  );
})
