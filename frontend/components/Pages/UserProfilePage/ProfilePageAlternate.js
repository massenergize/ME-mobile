
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Center, Box, AspectRatio, Image, VStack, ScrollView, Button, HStack, Pressable } from "native-base";
import ActionCard from '../ActionsPage/ActionCard';


export default function ProfilePageAlternate({ navigation }) {
    
    return (
        <VStack style={{flex: 1}}>
            <View style={styles.container}> 
              <AspectRatio w="100%" ratio = {9 / 9}>
                <Image style ={styles.profilePicture} source={{
                  uri: "https://images.unsplash.com/photo-1642572285001-20d5d570c7d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80"
                }} alt="image"/>
              </AspectRatio>
              <Text style={{position: 'absolute', bottom: 20, left: 25, color: "white", fontWeight: 'bold', fontSize: 25}}>Name</Text>
            </View>
            <Pressable bg="white" rounded = "xl" flex="0.5" onPress={() => {console.log("expand"), navigation.navigate("userProfile")}}>
              <HStack padding={23} justifyContent="space-evenly">
                <VStack>
                  <Text style={styles.stats}> 12 </Text>
                  <Text> CO2 Saved </Text>
                </VStack>
                <VStack>
                  <Text style={styles.stats}> 987 </Text>
                  <Text> Trees </Text>
                </VStack>
                <VStack>
                  <Text style={styles.stats}> 128 </Text>
                  <Text> Actions </Text>
                </VStack>
                <VStack>
                  <Text style={styles.stats}> 45 </Text>
                  <Text> Points </Text>
                </VStack>
              </HStack>
              <Text style={{color: "black", fontSize: 15, paddingTop: 0, paddingBottom: 20, paddingRight: 25, textAlign: 'right'}}>See more</Text>
              <ScrollView>
                <Text style={{fontWeight: 'bold', paddingLeft: 20, paddingBottom: 15, fontSize: 20}}>Actions To Do</Text>
                <HStack space={2} justifyContent="center" mx="15" marginBottom="15">
                  <ActionCard navigation={ navigation } />
                  <ActionCard navigation={ navigation } />
                </HStack>
                <HStack space={2} justifyContent="center" mx="15" marginBottom="15">
                  <ActionCard navigation={ navigation } />
                  <ActionCard navigation={ navigation } />
                </HStack>
              </ScrollView>
            </Pressable>
        </VStack>
  );
}


const styles = StyleSheet.create({
  stats: {
    fontWeight: "bold",
    fontSize: 18,
  },
  profilePicture: {
    width:"100%",
    height: undefined,
  }, 
  actionname: {
    padding: 15,
    fontSize: 23,
    fontWeight: "bold",    
  },
  container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
    
  },
  textStyle: {
    padding: 15,
    fontSize: 18,
    fontWeight: "bold",
    flex: 1
  },
});