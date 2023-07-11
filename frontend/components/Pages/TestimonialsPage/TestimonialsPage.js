import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState} from "react";
import { Box, Container, Fab, Button, Pressable, Spinner } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Page from "../../Shared/Page";
import { TestimonialCard } from "./TestimonialsCard.js";

import testimonials from "./../../../data/testimonialsList.json";
import { apiCall } from "../../../api/functions";

export default function TestimonialsPage({ route, navigation }) {
  const { community_id } = route.params;

  const [testimonials, setTestimonials] = useState(null);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);

  const getTestimonialList = () => {
    apiCall("testimonials.list", {community_id: community_id}).then((json) => {
      if (json.success) {
          setTestimonials(json.data);
          // console.log(json.data)
      } else {
          console.log(json);
      }
      setIsTestimonialsLoading(false);
    });
  }

  useEffect(() => {
    getTestimonialList();
  }, []);

  return (
    <Page>
      {
        isTestimonialsLoading
        ? <Spinner />
        :
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              testimonials.map((item, index) => {
                  return (
                    <TestimonialCard navigation={navigation} data={item} key={index} picture={item.file != null}/>
                  )
              })
            }
            <Container h={10}/>
          </ScrollView>
          {/* <Button bg="primary.400" size="lg" onPress={() => props.navigation.navigate("welcome")} position="absolute" bottom={2} right={2}>ADD TESTIMONIAL</Button> */}
          {/* <Pressable onPress={() => navigation.navigate("addTestimonial")} position="absolute" bottom={5} right={5}>
            <Box p={4} bg="primary.400" borderRadius="full" alignItems="center" justifyContent="center">
              <Ionicons name={"add-outline"} color="white" size={30}/>
            </Box>
          </Pressable> */}
        </View>
      }
    </Page>
  );
}
