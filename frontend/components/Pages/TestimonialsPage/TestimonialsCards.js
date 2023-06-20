import { View } from "react-native";
import React from "react";
import { Box, HStack, VStack, Text, Pressable, Container, Image } from "native-base";

function TestimonialCardWithPic({ navigation, data }) {
  return (
    <Pressable onPress={() => navigation.navigate("testimonial", {data: data})}>
        <Box mx={3} mt={2} bg="white" borderRadius="xl" shadow={1} borderTopLeftRadius="lg" borderBottomLeftRadius="lg" overflow="hidden">
            <HStack alignItems="center">
                <Container width="30%" maxHeight={185}> 
                    <Image
                        source={{
                            // uri: "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
                            uri: data.file.url
                        }}
                        alt={data.file.url}
                        w="full"
                        resizeMode="cover"
                        h="full"
                    />
                </Container>
                <Container p={3} width="70%">
                    <Text bold fontSize="lg">{data.title}</Text>
                    <Text fontSize="sm" color="#BAB9C0">By {data.preferred_name} | {data.created_at}</Text>
                    {
                        (data.action != null) ? <Text fontSize="sm" color="primary.400">{data.action.title}</Text> : <></>
                    }
                    <Text isTruncated={true} noOfLines={3}>{data.body.replace(/(<([^>]+)>)/gi, "")}</Text>
                </Container>
            </HStack>
        </Box>
    </Pressable>
  );
}

function TestimonialCardWithoutPic({ navigation, data }) {
    return (
        <Pressable onPress={() => navigation.navigate("testimonial", {data: data})}>
            <Box mx={3} mt={2} bg="white" borderRadius="xl" shadow={1}>
                <Box p={3}>
                    <Text bold fontSize="lg">{data.title}</Text>
                    <Text fontSize="sm" color="#BAB9C0">By {data.preferred_name} | {data.created_at}</Text>
                    {
                        (data.action != null) ? <Text fontSize="sm" color="primary.400">{data.action.title}</Text> : <></>
                    }
                    <Text isTruncated={true} noOfLines={3}>{data.body.replace(/(<([^>]+)>)/gi, "")}</Text>
                </Box>
            </Box>
        </Pressable>
    )
}

export { TestimonialCardWithPic, TestimonialCardWithoutPic }