import { ScrollView } from "react-native";
import React from "react";
import { Box, VStack, Image, Text } from "native-base";
import ActionCard from "./../ActionsPage/ActionCard.js";

export default function Testimonial({ navigation }) {
  return (
    <ScrollView>
        <VStack bg="white" space={2} px="3" pb="20">
            <Box
                my="3"
                maxHeight={250}
                shadow={1}
                bg="white"
                borderRadius="xl"
                overflow="hidden"
            >
                <Image
                    source={{
                        uri: "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
                    }}
                    alt="image"
                    h="full"
                    w="full"
                    resizeMode="cover"
                />
            </Box>
            <Text bold fontSize="2xl">Testimonial Title</Text>
            <Text fontSize="md" color="#BAB9C0">By Person's Name | Nov 12th, 2021</Text>
            <Text fontSize="md" mb={4}>This would be the text of the testimonial. Users are able to share their personal stories, and other users are able to learn from their experience. In addition other users can interact with the testimonial.</Text>
            <Text bold fontSize="lg">Action Associated With</Text>
            <ActionCard navigation={navigation} />
        </VStack>
    </ScrollView>
  );
}
