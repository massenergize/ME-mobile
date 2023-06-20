import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Center, Box, AspectRatio, Image, VStack, ScrollView, Button, HStack, Pressable } from "native-base";
import ActionCard from '../ActionsPage/ActionCard';


export default function ProfileExpanded({ navigation }) {
    
    return (
        <VStack>
            
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