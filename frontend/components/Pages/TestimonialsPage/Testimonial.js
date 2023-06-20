import { ScrollView } from "react-native";
import React from "react";
import { Box, VStack, Image, Text } from "native-base";
import ActionCard from "./../ActionsPage/ActionCard.js";
import { RenderHTML } from "react-native-render-html";
import { useWindowDimensions } from "react-native";

export default function Testimonial({ route, navigation }) {
    const { data } = route.params;
    const { width } = useWindowDimensions();

  return (
    <ScrollView>
        <VStack bg="white" space={2} px="3" pb="20">
            {
                (data.file != null) ? (
                    <Box
                        my={3}
                        maxHeight={250}
                        shadow={1}
                        bg="white"
                        borderRadius="xl"
                        overflow="hidden"
                    >
                        <Image
                            source={{
                                // uri: "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
                                uri: data.file.url
                            }}
                            alt="image"
                            h="full"
                            w="full"
                            resizeMode="cover"
                        />
                    </Box>
                ) : <></>
            }
            <Text bold fontSize="2xl" mt={3}>{data.title}</Text>
            <Text fontSize="md" color="#BAB9C0">By {data.preferred_name} | {data.created_at}</Text>
            {/* <Text fontSize="md" mb={4}>{data.body}</Text> */}
            <RenderHTML 
                contentWidth={width}
                source={{html: data.body}}/>
            <Text bold fontSize="lg">Action Associated With</Text>
            <ActionCard navigation={navigation} />
        </VStack>
    </ScrollView>
  );
}
