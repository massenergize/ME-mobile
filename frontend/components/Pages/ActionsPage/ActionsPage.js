import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  HStack,
  Spinner
} from "native-base";
import ActionCard from "./ActionCard";
import Page from "../../Shared/Page";
// import actions from "./../../../data/actionsList.json";
import { apiCall } from "../../../api/functions";

export default function ActionsPage({ route, navigation }) {

  const { community_id } = route.params;

  const [actions, setActions] = useState(null);
  const [isActionsLoading, setIsActionsLoading] = useState(true);

  const getActionList = () => {
    apiCall("actions.list", {community_id: community_id}).then((json) => {
      if (json.success) {
          setActions(json.data);
          // console.log(json.data)
      } else {
          console.log(json);
      }
      setIsActionsLoading(false);
    });
  }

  useEffect(() => {
    getActionList();
  }, []);

  const getMetric = (action, metric) => {
    for (let i = 0; i < action.tags.length; i++) {
      if (action.tags[i].tag_collection_name === metric) {
        return action.tags[i].name;
      }
    }
    return "-"
  }

  return (
    //the styling should apply to something else
    //<ScrollView style = {styles.scroll}>
    <Page>
      { isActionsLoading 
        ? <Spinner />
        :
        <ScrollView>
          <Text style={styles.category}>Recommended</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
              {/* <ActionCard navigation={navigation} /> */}
              {/* <ActionCard navigation={navigation} />
              <ActionCard navigation={navigation} /> */}
              {/*<Button onPress={() => navigation.navigate("welcome")}>Take Action</Button>*/}
              {
                actions.map((action, index) => {
                  return (
                    <ActionCard navigation={navigation} action={action} key={index}></ActionCard>
                  )
                })
              }
            </HStack>
          </ScrollView>
          <Text style={styles.category}>High Impact</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
              {
                actions.map((action, index) => {
                  if (getMetric(action, "Impact") === "High") {
                    return (
                      <ActionCard navigation={navigation} action={action} key={index}></ActionCard>
                    )
                  }
                  else {
                    return null;
                  }
                })
              }
            </HStack>
          </ScrollView>
          <Text style={styles.category}>Low Cost</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            {
              actions.map((action, index) => {
                if (getMetric(action, "Cost") === "$" || getMetric(action, "Cost") === "0") {
                  return (
                    <ActionCard navigation={navigation} action={action} key={index}></ActionCard>
                  )
                }
                else {
                  return null;
                }
              })
            }
            </HStack>
          </ScrollView>
        </ScrollView> 
    }
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
