import { View } from "react-native";
import React from "react";
import { Box, HStack, VStack, Text, Pressable, Container, Image } from "native-base";

function TestimonialCardWithPic({ navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate("testimonial")}>
        <Box mx={3} mt={2} bg="white" borderRadius="xl" shadow={1} borderTopLeftRadius="lg" borderBottomLeftRadius="lg" overflow="hidden">
            <HStack alignItems="center">
                <Container width="30%" maxHeight={160}>
                <Image
                    source={{
                        uri: "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
                    }}
                    alt="Testimonial Image"
                    w="full"
                    resizeMode="cover"
                    h="full"
                />
                </Container>
                <Container p={3} width="70%">
                    <Text bold fontSize="lg">Testimonial Title</Text>
                    <Text fontSize="sm" color="#BAB9C0">By Person's Name | 11/12/21</Text>
                    <Text fontSize="sm" color="primary.400">Action Associated With</Text>
                    <Text isTruncated={true} noOfLines={3}>This would be the text of the testimonial. Users are able to share their personal stories, and other users are able to learn from their experience. In addition other users</Text>
                </Container>
            </HStack>
        </Box>
    </Pressable>
  );
}

function TestimonialCardWithoutPic({ navigation }) {
    return (
        <Pressable onPress={() => navigation.navigate("testimonial")}>
            <Box mx={3} mt={2} bg="white" borderRadius="xl" shadow={1}>
                <Box p={3}>
                    <Text bold fontSize="lg">Testimonial Title</Text>
                    <Text fontSize="sm" color="#BAB9C0">By Person's Name | 11/12/21</Text>
                    <Text fontSize="sm" color="primary.400">Action Associated With</Text>
                    <Text isTruncated={true} noOfLines={3}>This would be the text of the testimonial. Users are able to share their personal stories, and other users are able to learn from their experience. In addition other users can do whatever</Text>
                </Box>
            </Box>
        </Pressable>
    )
}

export { TestimonialCardWithPic, TestimonialCardWithoutPic }