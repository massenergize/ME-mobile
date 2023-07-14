import { ScrollView, View, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { VStack, Image, Text, Spinner } from "native-base";
import Page from "../../Shared/Page";
import Moment from 'moment';

import ActionCard from "./../ActionsPage/ActionCard.js";
import ServiceProviderCard from "./../ServiceProvidersPage/ServiceProviderCard.js";
import HTMLParser from "../../Shared/HTMLParser";
import { apiCall } from "../../../api/functions";

export default function Testimonial({ route, navigation }) {
    const { data } = route.params;
    const { width } = useWindowDimensions();

    const { testimonial_id } = route.params;

    const [testimonial, setTestimonial] = useState(null);
    const [isTestimonialLoading, setIsTestimonialLoading] = useState(true);

    const getTestimonial = () => {
        apiCall("testimonials.info", {testimonial_id: testimonial_id}).then((json) => {
        if (json.success) {
            setTestimonial(json.data);
            console.log(json.data)
        } else {
            console.log(json);
        }
        setIsTestimonialLoading(false);
        });
    }

    useEffect(() => {
        getTestimonial();
    }, []);

  return (
    <Page>  
        <ScrollView>
            {
                isTestimonialLoading
                ? <Spinner />
                :
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
                            <ActionCard navigation={navigation} action={testimonial.action} />
                        </View>
                        : <></>
                    }
                    {
                        (testimonial.vendor != null)
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
            }
        </ScrollView>
    </Page>
  );
}

const textStyle = {
    fontSize: "16px",
};