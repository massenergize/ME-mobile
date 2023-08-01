import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { ScrollView, HStack } from "native-base";

import Page from "../../Shared/Page";
import ActionCard from "./ActionCard";
import { CommunityContext } from "../../Contexts/CommunityContext";
import { getActionMetric } from "../../Shared/Utils";

export default function ActionsPage({ navigation }) {
  const { actions } = useContext(CommunityContext);

  return (
    <Page>
      <ScrollView>
        <Text style={styles.category}>Recommended</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            {actions.map((action, index) => {
              return (
                <ActionCard
                  key={index}
                  navigation={navigation}
                  id={action.id}
                  title={action.title}
                  imgUrl={action.image?.url}
                  impactMetric={getActionMetric(action, "Impact")}
                  costMetric={getActionMetric(action, "Cost")}
                />
              );
            })}
          </HStack>
        </ScrollView>
        <Text style={styles.category}>High Impact</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            {actions
              .filter((action) => getActionMetric(action, "Impact") === "High")
              .map((action, index) => {
                return (
                  <ActionCard
                    key={index}
                    navigation={navigation}
                    id={action.id}
                    title={action.title}
                    imgUrl={action.image?.url}
                    impactMetric={getActionMetric(action, "Impact")}
                    costMetric={getActionMetric(action, "Cost")}
                  />
                );
              })}
          </HStack>
        </ScrollView>
        <Text style={styles.category}>Low Cost</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
            {actions
              .filter(
                (action) =>
                  getActionMetric(action, "Cost") === "$" ||
                  getActionMetric(action, "Cost") === "0"
              )
              .map((action, index) => {
                return (
                  <ActionCard
                    key={index}
                    navigation={navigation}
                    id={action.id}
                    title={action.title}
                    imgUrl={action.image?.url}
                    impactMetric={getActionMetric(action, "Impact")}
                    costMetric={getActionMetric(action, "Cost")}
                  />
                );
              })}
          </HStack>
        </ScrollView>
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
