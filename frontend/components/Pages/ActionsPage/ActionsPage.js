import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "native-base";
import ActionCard from './ActionCard';

export default function ActionsPage() {
  return (
    //the styling should apply to something else
    <ScrollView style = {styles.card}>
      <ActionCard/>
      <ActionCard/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
  }
});