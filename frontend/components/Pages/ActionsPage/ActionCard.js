import React from "react";
import { Text, Pressable } from "react-native";
import { Box, Heading, Image, Stack } from "native-base";

import styles from './styles'

export default ActionCard = React.memo(
  ({
    navigation = null,
    id,
    title,
    imgUrl,
    impactMetric = "Low",
    costMetric = "0",
    ...props
  }) => {
    return (
      <Pressable
        onPress={() => {
          navigation && navigation.navigate("actiondetails", { action_id: id });
        }}
        {...props}
      >
        <Box bg="white" borderRadius="xl" shadow={2} width={styles.cardWidth} {...props}>
          <Box>
            {imgUrl ? (
              <Image
                source={{ uri: imgUrl }}
                alt="image"
                borderTopRadius="xl"
                resizeMode="cover"
                height={styles.imageSize}
                bg="gray.300"
              />
            ) : (
              <Box height={styles.imageSize} bg="gray.300"></Box>
            )}
          </Box>
          <Stack p={3} space={3}>
            <Stack space={2}>
              <Heading size="sm" isTruncated={true} noOfLines={1}>
                {title ? title : "Action Title"}
              </Heading>
              <Text fontSize="xs" fontWeight="500">
                {`${impactMetric} Impact | ${costMetric}`}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Pressable>
    );
  }
);
