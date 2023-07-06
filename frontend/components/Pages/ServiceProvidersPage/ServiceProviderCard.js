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
          size={direction === "row" ? "100px" : "128px"}
          backgroundColor="muted.50"
          borderRadius="20"
        />
        <Box
          width={direction === "row" ? "80%" : "40"}
          pl={direction === "row" ? "3" : "0"}
          pt={direction === "column" ? "3" : "0"}
        >
          {/* name */}
          {direction === "row" ? (
            <Text fontWeight="bold" fontSize="lg">
              {name}
            </Text>
          ) : (
            <Text fontWeight="bold" fontSize="lg">
              {name.slice(0, 20) + "..."}
            </Text>
          )}
        </Box>
      </Flex>
    </Pressable>
  );
}
