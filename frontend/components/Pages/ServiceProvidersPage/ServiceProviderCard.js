import { Flex, Image, Pressable, Box, Text } from "native-base";
import React from "react";

export default function ServiceProviderCard({
  direction, // "row" or "column"
  name,
  description,
  imageURI,
  onPress,
  ...props
}) {
  const parseDescription = (description) => {
    // give a longer description if the direction is row
    if (direction === "row") {
      return description.length > 100
        ? description.slice(0, 100) + "..."
        : description;
    }
    // give a shorter description if the direction is column
    return description.length > 40
      ? description.slice(0, 40) + "..."
      : description;
  };

  return (
    <Pressable onPress={onPress}>
      <Flex
        flexDirection={direction}
        alignItems={direction === "row" ? "center" : "baseline"}
        {...props}
      >
        {/* image */}
        <Image
          source={{ uri: imageURI }}
          alt="service provider's image"
          resizeMode="contain"
          size="40"
          backgroundColor="gray.200"
          borderRadius="20"
        />
        <Box
          width="40"
          pl={direction === "row" ? "3" : "0"}
          pt={direction === "column" ? "3" : "0"}
        >
          {/* name */}
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
          {/* description */}
          <Text fontWeight="thin">{parseDescription(description)}</Text>
        </Box>
      </Flex>
    </Pressable>
  );
}
