import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, HStack, Text, Spinner, Center } from "native-base";

import Page from "../../Shared/Page";
import ActionCard from "./ActionCard";
import { CommunityContext } from "../../Contexts/CommunityContext";
import { getActionMetric } from "../../Shared/Utils";

export default function ActionsPage({ navigation }) {
  const { actions } = useContext(CommunityContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (actions) {
      setIsLoading(false);
    }
  }, []);

  return (
    <Page>
      {isLoading ? (
        <Center flex="1">
          <Spinner />
        </Center>
      ) : (
        <ScrollView>
          {/* Currently "All" instead of "Recommended" for v1 (v2 will have filtering) */}
          <Text style={styles.category}>All</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
              {/* Display all actions */}
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
              {/* Display all actions with high impact */}
              {actions
                .filter(
                  (action) => getActionMetric(action, "Impact") === "High"
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
          <Text style={styles.category}>Low Cost</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
              {/* Display all actions with low cost (0 or $) */}
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
      )}
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
