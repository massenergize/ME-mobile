import { ScrollView, Text } from "react-native";
import React from "react";
import { TestimonialCardWithPic, TestimonialCardWithoutPic } from "./TestimonialsCards.js";
import { Container } from "native-base";
import testimonials from "./../../../data/testimonialsList.json";

// const testimonials = require("./../../../data/testimonialsList.json")

export default function TestimonialsPage({ navigation }) {
  return (
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
  );
}
