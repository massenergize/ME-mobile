import React, { useContext } from "react";
import {
  ScrollView,
  VStack
} from "native-base";
import Page from "../../Shared/Page";
import TeamCard from "./TeamCard";
import { CommunityContext } from "../../Contexts/CommunityContext";

export default function TeamsPage({ navigation }) {

  const { teams } = useContext(CommunityContext);

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="5" p="5">
          {
            teams.map((team, i) => {
              return <TeamCard key={i} navigation={navigation} team={team} />
            })
          }
        </VStack>
      </ScrollView>
    </Page>
  );
}
