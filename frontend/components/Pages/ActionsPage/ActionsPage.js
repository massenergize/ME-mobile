import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView, Center, Heading, VStack, HStack } from "native-base";
import ActionCard from './ActionCard';

export default function ActionsPage() {
  return (
    //the styling should apply to something else
    //<ScrollView style = {styles.scroll}>
    
    <ScrollView>
      <Text style={styles.category}>One-Time Actions</Text>
      <HStack space={2} justifyContent="center">
        <ActionCard/>
        <ActionCard/>
      </HStack>
      <Text style={styles.category}>Recurring Actions</Text>
      <HStack space={2} justifyContent="center">
        <ActionCard/>
        <ActionCard/>
      </HStack>
      <Text style={styles.category}>Other Actions</Text>
      <HStack space={2} justifyContent="center">
        <ActionCard/>
        <ActionCard/>
      </HStack>
      
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  scroll: {
    height: "80",
  },
  category: {
    fontSize: 25,
    fontWeight: "bold",
  }
});