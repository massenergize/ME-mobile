import { ScrollView, Text } from "react-native";
import React from "react";
import { TestimonialCardWithPic, TestimonialCardWithoutPic } from "./TestimonialsCards.js";
import { Container } from "native-base";

export default function TestimonialsPage({ navigation }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TestimonialCardWithPic navigation={navigation}/>
      <TestimonialCardWithoutPic navigation={navigation}/>
      <TestimonialCardWithoutPic navigation={navigation}/>
      <TestimonialCardWithPic navigation={navigation}/>
      <TestimonialCardWithoutPic navigation={navigation}/>
      <Container h={10}/>
    </ScrollView>
  );
}
