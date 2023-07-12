import React from "react";
import { Flex, Image, Pressable, Box, Text } from "native-base";

export default function CommunityCard({ community, ...props }) {
  return (
    <Pressable {...props}>
      <Flex flexDirection="row" alignItems="center">
        <Image
          source={{
            uri: community.logo?.url,
          }}
          alt="Community Logo"
          size="100px"
          resizeMode="contain"
        />
        <Box width="70%" pl="5">
          <Text fontSize="lg" fontWeight="bold">
            {community.name}
          </Text>

          <Text fontSize="sm" color="muted.400">
            {community.is_geographically_focused
              ? `${community.location.city}, ${community.location.state}`
              : `${community.location?.country}`}
          </Text>
        </Box>
      </Flex>
    </Pressable>
  );
}