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
import eventStyles from "./styles";

export default EventCard = React.memo(
  ({
    title,
    date,
    location,
    imageUrl,
    canRSVP,
    isRSVPED,
    isShared,
    id,
    navigation,
    ...props
  }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("eventDetails", { event_id: id })}
        backgroundColor="white"
        width={eventStyles.cardWidth}
        rounded="lg"
        {...props}
      >
        <Box rounded="lg" flex={1} overflow="hidden">
          {/* image */}
          <Flex>
            {imageUrl ? (
              <AspectRatio width="100%" ratio={16 / 9}>
                <Image
                  source={{ uri: imageUrl }}
                  alt="event's image"
                  resizeMode="cover"
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
          </Flex>

          {/* title */}
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            flexGrow="1"
            px="4"
            pt="4"
            pb="2"
          >
            <Text fontWeight="bold" fontSize="md" w="90%" mr="3">
              {title}
            </Text>
            <Icon
              as={FontAwesome}
              name="arrow-right"
              size="md"
              color="primary.400"
            />
          </Flex>

          {/* meta */}
          <Flex
            backgroundColor="gray.100"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            py={!canRSVP && "2"}
          >
            <Box px="4">
              <Text fontSize={eventStyles.cardMetaFontSize} color="primary.400">
                {date}
              </Text>
            </Box>

            {canRSVP ? (
              <Box
                backgroundColor={isRSVPED ? "secondary.400" : "primary.400"}
                flexGrow="1"
                ml="2"
              >
                <Button
                  variant="ghost"
                  _text={{ fontSize: "xs", color: "white" }}
                >
                  RSVP
                </Button>
              </Box>
            ) : null}
          </Flex>
        </Box>
      </Pressable>
    );
  }
);
