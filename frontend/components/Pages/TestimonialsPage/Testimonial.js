import React, { useContext } from "react";
import Moment from 'moment';
import { VStack, Image, Text, Spinner, Center } from "native-base";
import { ScrollView, View, useWindowDimensions } from "react-native";

import Page from "../../Shared/Page";
import ActionCard from "./../ActionsPage/ActionCard.js";
import ServiceProviderCard from "./../ServiceProvidersPage/ServiceProviderCard.js";
import HTMLParser from "../../Shared/HTMLParser";
import { useDetails, CommunityContext } from "../../Contexts/CommunityContext";
import { getActionMetric } from "../../Shared/Utils";

export default function Testimonial({ route, navigation }) {
    const { width } = useWindowDimensions();

    const { testimonial_id } = route.params;
    const [testimonial, isTestimonialLoading] = useDetails("testimonials.info", {testimonial_id: testimonial_id});
    const { vendorsSettings } = useContext(CommunityContext);

    return (
        <Page>  
            {
                isTestimonialLoading
                ? 
                <Center width="100%" height="100%">
                    <Spinner size="lg"/>
                </Center>
                :
                <ScrollView>
                    <VStack bg="white" px="3" pb="20">
                        {
                            (testimonial.file ) ? (
                                // <Box
                                //     borderRadius="xl"
                                //     overflow="hidden"
                                // >
                                    <Image
                                        source={{
                                            // uri: "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
                                            uri: testimonial.file.url
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
                        <Text bold fontSize="2xl" mt={3}>{testimonial.title}</Text>
                        <Text fontSize="md" color="#BAB9C0" mb={3}>By {testimonial.preferred_name} | {Moment(testimonial.created_at).format('ll')}</Text>
                        <HTMLParser
                            htmlString={testimonial.body}
                            baseStyle={textStyle}
                            />
                        {
                            testimonial.action != null  
                            ?
                            <View>
                                <Text bold fontSize="lg" mb={3} mt={5}>Associated Action</Text>
                                <ActionCard
                                    navigation={navigation}
                                    id={testimonial.action?.id}
                                    title={testimonial.action?.title}
                                    imgUrl={testimonial.action?.image?.url}
                                    impactMetric={getActionMetric(testimonial.action, "Impact")}
                                    costMetric={getActionMetric(testimonial.action, "Cost")}
                                />
                            </View>
                            : <></>
                        }
                        {
                            (vendorsSettings.is_published && testimonial.vendor != null)
                            ?
                            <View>
                                <Text bold fontSize="lg" mb={2} mt={7}>Related Vendor</Text>
                                <ServiceProviderCard
                                    id={testimonial.vendor.id}
                                    direction="row"
                                    name={testimonial.vendor.name}
                                    description="This could be a brief description of the service provider."
                                    imageURI={(testimonial.vendor.logo) ? testimonial.vendor.logo.url : null}
                                    // onPress={() => navigation.navigate("serviceProviderDetails")}
                                    navigation={navigation}
                                    my="2"
                                    />
                            </View>
                            : <></>
                        }
                    </VStack>
                </ScrollView>
            }
        </Page>
    );
}

const textStyle = {
    fontSize: "16px",
};