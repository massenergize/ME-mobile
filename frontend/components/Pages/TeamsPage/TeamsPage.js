import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Text,
  VStack,
  Image,
  Flex,
  Box,
  Pressable,
} from "native-base";
import Page from "../../Shared/Page";
import TeamCard from "./TeamCard";
// import { apiCall } from "../../../api/functions";
import teams from "./../../../data/teamsStats.json"
import { CommunityContext } from "../../Contexts/CommunityContext";

export default function TeamsPage({ route, navigation }) {

  const { teams } = useContext(CommunityContext);

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="5" p="5">
          {/* {generateTeams()} */}
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
