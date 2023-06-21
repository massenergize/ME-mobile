import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  ScrollView,
  Center,
  Heading,
  VStack,
  HStack,
  Button,
} from "native-base";
import ActionCard from "./ActionCard";
import Page from "../../Shared/Page";

export default function ActionsPage({ navigation }) {
  return (
    //the styling should apply to something else
    //<ScrollView style = {styles.scroll}>
    <Page>
      <ScrollView>
        <Text style={styles.category}>One-Time Actions</Text>
        <HStack space={2} justifyContent="center" mx="15" marginBottom="15">
          <ActionCard navigation={navigation} />
          <ActionCard navigation={navigation} />
          {/*<Button onPress={() => navigation.navigate("welcome")}>Take Action</Button>*/}
        </HStack>
        <Text style={styles.category}>Recurring Actions</Text>
        <HStack space={2} justifyContent="center" mx="15" marginBottom="15">
          <ActionCard navigation={navigation} />
          <ActionCard navigation={navigation} />
        </HStack>
        <Text style={styles.category}>Other Actions</Text>
        <HStack space={2} justifyContent="center" mx="15" marginBottom="15">
          <ActionCard navigation={navigation} />
          <ActionCard navigation={navigation} />
        </HStack>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  scroll: {
    height: "80",
  },
  category: {
    padding: 15,
    fontSize: 23,
    fontWeight: "bold",
  },
});
