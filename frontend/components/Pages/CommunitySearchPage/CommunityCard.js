import React from "react";
import { Flex, Image, Pressable, Box, Text, View } from "native-base";

export default function CommunityCard({ community, ...props }) {
  return (
    <Pressable {...props}>
      <Flex flexDirection="row" alignItems="center">
        {community.logo?.url ? (
          <Image
            source={{
              uri: community.logo?.url,
            }}
            alt="Community Logo"
            size="100px"
            resizeMode="contain"
          />
        ) : (
          <Box height={100} width={100} bg="gray.300"></Box>
        )}
        <Box width="70%" pl="5">
          <Text fontSize="lg" fontWeight="bold">
            {community.name}
          </Text>

          {community.is_geographically_focused ? (
            <View>
              <Text fontSize="sm" color="muted.400">
                {community.location?.city || "null"}, {community.location?.state || community.location?.country || "null"}
              </Text>
              <Text fontSize="sm" color="muted.400">
                {Math.round(community.location.distance)} miles away
              </Text>
            </View>
          ) : (
            <View>
              <Text fontSize="sm" color="muted.400">
                {community.location?.country || "null"}
              </Text>
              <Text fontSize="sm" color="muted.400">
                Non-geographically-focused
              </Text>
            </View>
          )}
        </Box>
      </Flex>
    </Pressable>
  );
}
