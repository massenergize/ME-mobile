import { View, ScrollView, Text } from "react-native";
import React from "react";
import { Box, Container, Fab, Button, Pressable } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Page from "../../Shared/Page";
import { TestimonialCard } from "./TestimonialsCard.js";
import testimonials from "./../../../data/testimonialsList.json";

// const testimonials = require("./../../../data/testimonialsList.json")

export default function TestimonialsPage({ navigation }) {
  return (
    <Page>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            testimonials.data.map((item, index) => {
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
    </Page>
  );
}
