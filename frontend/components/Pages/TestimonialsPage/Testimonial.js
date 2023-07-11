import { ScrollView, View, useWindowDimensions } from "react-native";
import React from "react";
import { VStack, Image, Text } from "native-base";
import Moment from 'moment';

import ActionCard from "./../ActionsPage/ActionCard.js";
import ServiceProviderCard from "./../ServiceProvidersPage/ServiceProviderCard.js";
import HTMLParser from "../../Shared/HTMLParser";

export default function Testimonial({ route, navigation }) {
    const { data } = route.params;
    const { width } = useWindowDimensions();

  return (
    <ScrollView>
        <VStack bg="white" space={2} px="3" pb="20">
            {
                (data.file != null) ? (
                    // <Box
                    //     borderRadius="xl"
                    //     overflow="hidden"
                    // >
                        <Image
                            source={{
                                // uri: "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
                                uri: data.file.url
                            }}
                            my={3}
                            h={250}
                            w={width}
                            alt="image"
                            // borderRadius="xl"
                            resizeMode="contain"
                        />
                    // </Box>
                ) : <></>
            }
            <Text bold fontSize="2xl" mt={3}>{data.title}</Text>
            <Text fontSize="md" color="#BAB9C0">By {data.preferred_name} | {Moment(data.created_at).format('ll')}</Text>
            <HTMLParser
                  htmlString={data.body}
                  baseStyle={textStyle}
                />
            {
                data.action != null  
                ?
                <View>
                    <Text bold fontSize="lg" mb={3}>Associated Action</Text>
                    <ActionCard navigation={navigation} action={data.action} />
                </View>
                : <></>
            }
            {
                (data.vendor != null)
                ?
                <View>
                    <Text bold fontSize="lg" my={3}>Related Vendor</Text>
                    <ServiceProviderCard
                        direction="row"
                        name={data.vendor.name}
                        description="This could be a brief description of the service provider."
                        image={(data.vendor.logo != null ) ? data.vendor.logo.url : null}
                        onPress={() => navigation.navigate("serviceProviderDetails")}
                        my="2"
                        />
                </View>
                : <></>
            }
        </VStack>
    </ScrollView>
  );
}

const textStyle = {
    fontSize: "16px",
};