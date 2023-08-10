import { Flex, Image, Pressable, Box, Text, Heading } from "native-base";
import React from "react";
import styles from "./styles";

export default function ServiceProviderCard({
  id,
  direction, // "row" or "column"
  name,
  description,
  imageURI,
  onPress,
  navigation,
  ...props
}) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("serviceProviderDetails", { vendor_id: id })
      }
    >
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
          size={direction === "row" ? styles.rSPImageSize : styles.cSPImageSize}
          borderRadius="20"
          alignSelf="center"
        />
        <Box
          width={direction === "row" ? "60%" : "40"}
          pl={direction === "row" && "3"}
          pt={direction === "column" && "3"}
        >
          {/* name */}
          {direction === "row" ? (
            <Text fontWeight="bold" fontSize={styles.SPNameSize}>
              {name}
            </Text>
          ) : (
            <Text fontWeight="bold">{name.slice(0, 20) + "..."}</Text>
          )}
        </Box>
      </Flex>
    </Pressable>
  );
}
