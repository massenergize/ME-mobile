import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  VStack,
  HStack,
  View,
  Pressable,
  Text,
  Spacer
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Page from "../../Shared/Page";
import TeamCard from "./TeamCard";
import { CommunityContext } from "../../Contexts/CommunityContext";


export default function TeamsPage({ navigation }) {

  const { teams } = useContext(CommunityContext);
  const [subteamsExpanded, setSubteamsExpanded] = useState({})
  const [teamsList, setTeamsList] = useState([])

  const getTeams = () => {
    console.log("Getting teams")
    teamsDict = {}
    expanded = {}
    for (var i = 0; i < teams.length; i++) {
      // console.log(teams[i])
      // console.log(teams[i].team.parent)
      if (teams[i].team.parent === null) {
        teamsDict[teams[i].team.id] = teams[i]
        teamsDict[teams[i].team.id].subteams = []
      }
    }
    for (var i = 0; i < teams.length; i++) {
      // console.log(teams[i])
      if (teams[i].team.parent) {
        teamsDict[teams[i].team.parent.id].subteams.push(teams[i])
        expanded[teams[i].team.id] = false
      }
    }
    setTeamsList(Object.values(teamsDict))
    setSubteamsExpanded(expanded)
    // return Object.values(teamsDict)
  }

  const changeExpanded = (team_id) => {
    let copy = {...subteamsExpanded}
    copy[team_id] = !copy[team_id]
    setSubteamsExpanded(copy)
  }

  useEffect(() => {
    getTeams()
  }, [teams])

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={5} p={5}>
          {
            teamsList.map((team, i) => {
              return <View key={i}>
                <TeamCard navigation={navigation} team={team} isSubteam={false} />
                {
                  (team.subteams.length > 0) ? (
                    <View>
                      <Pressable onPress={() => changeExpanded(team.team.id)}>
                        <HStack mt={2} alignItems="center">
                          <Spacer />
                          <Text color="primary.600" mr={1}>Expand Subteams</Text>
                          <Ionicons
                            name={
                              subteamsExpanded[team.team.id]
                                ? "chevron-up-outline"
                                : "chevron-down-outline"
                            }
                            color="#3182ce"
                          />
                        </HStack>
                      </Pressable>
                      {
                        subteamsExpanded[team.team.id] ? (
                          <VStack ml={5} space={3} mt={3}>
                          {
                            team.subteams.map((subteam, j) => {
                              // return <Text key={j}>{subteam.team.name}</Text>
                              return <TeamCard key={j} navigation={navigation} team={subteam} isSubteam={true}/>
                            })
                          }
                          </VStack>
                        ) : null
                      }
                    </View>
                  )
                  : null
                }
              </View>
              // return <TeamCard key={i} navigation={navigation} team={team} />
            })
          }
        </VStack>
      </ScrollView>
    </Page>
  );
}
