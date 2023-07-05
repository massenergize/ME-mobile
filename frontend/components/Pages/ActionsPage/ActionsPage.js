import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  ScrollView,
  HStack
} from "native-base";
import ActionCard from "./ActionCard";
import Page from "../../Shared/Page";
import actions from "./../../../data/actionsList.json";

export default function ActionsPage({ navigation }) {

  // for (let i = 0; i < actions.data.length; i++) {
  //   for (let j = 0; j < actions.data[i].tags.length; j++) {
      
  //   }
  // }

  return (
    //the styling should apply to something else
    //<ScrollView style = {styles.scroll}>
    <Page>
      <ScrollView>
        <Text style={styles.category}>Recommended</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            {/* <ActionCard navigation={navigation} /> */}
            {/* <ActionCard navigation={navigation} />
            <ActionCard navigation={navigation} /> */}
            {/*<Button onPress={() => navigation.navigate("welcome")}>Take Action</Button>*/}
            {
              actions.data.map((action, index) => {
                return (
                  <ActionCard navigation={navigation} action={action} key={index}></ActionCard>
                )
              })
            }
          </HStack>
        </ScrollView>
        {/* <Text style={styles.category}>Daily</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            <ActionCard navigation={navigation} />
            <ActionCard navigation={navigation} />
            <ActionCard navigation={navigation} />
          </HStack>
        </ScrollView>
        <Text style={styles.category}>High Impact</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            <ActionCard navigation={navigation} />
            <ActionCard navigation={navigation} />
            <ActionCard navigation={navigation} />
          </HStack>
        </ScrollView>
        <Text style={styles.category}>Low Cost</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            <ActionCard navigation={navigation} />
            <ActionCard navigation={navigation} />
            <ActionCard navigation={navigation} />
          </HStack>
        </ScrollView> */}
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
