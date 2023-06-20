import { View, ScrollView, Text } from "react-native";
import React from "react";
import { TestimonialCardWithPic, TestimonialCardWithoutPic } from "./TestimonialsCards.js";
import { Box, Container, Fab, Button, Pressable } from "native-base";
import testimonials from "./../../../data/testimonialsList.json";
import Ionicons from "react-native-vector-icons/Ionicons";

// const testimonials = require("./../../../data/testimonialsList.json")

export default function TestimonialsPage({ navigation }) {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          testimonials.data.map((item, index) => {
            if (item.file != null) {
              return (
                <TestimonialCardWithPic navigation={navigation} data={item} key={index}/>
              )
            }
            else {
              return (
                <TestimonialCardWithoutPic navigation={navigation} data={item} key={index}/>
              )
            } 
            })
          }
        <Container h={10}/>
      </ScrollView>
      {/* <Button bg="primary.400" size="lg" onPress={() => props.navigation.navigate("welcome")} position="absolute" bottom={2} right={2}>ADD TESTIMONIAL</Button> */}
      <Pressable onPress={() => navigation.navigate("addTestimonial")} position="absolute" bottom={5} right={5}>
        <Box p={4} bg="primary.400" borderRadius="full" alignItems="center" justifyContent="center">
          <Ionicons name={"add-outline"} color="white" size={30}/>
        </Box>
      </Pressable>
    </View>
  );
}
