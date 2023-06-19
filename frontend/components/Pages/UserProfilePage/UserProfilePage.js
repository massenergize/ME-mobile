import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Center, Box, AspectRatio, Image, VStack, ScrollView, Button, HStack } from "native-base";

export default function ActionDetails() {
    
    return (
        <VStack style={{flex: 1}}>
            <View style={styles.container}> 
              <AspectRatio w="100%" ratio = {9 / 9}>
                <Image style ={styles.profilePicture} source={{
                  uri: "https://images.unsplash.com/photo-1642572285001-20d5d570c7d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80"
                }} alt="image"/>
              </AspectRatio>
              <Text style={{position: 'absolute', bottom: 15, left: 25, color: "white", fontWeight: 'bold', fontSize: 25}}>Name</Text>
            </View>
            <Box bg="white" rounded = "xl" flex="0.4">
                <VStack>
                    <HStack space={4} padding={23} paddingTop={28} justifyContent="space-evenly">
                        <Text style={styles.stats}> 12 </Text>
                        <Text style={styles.stats}> 986 </Text>
                        <Text style={styles.stats}> 128 </Text>
                        <Text style={styles.stats}> 45 </Text>
                    </HStack>
                    <HStack space={4} margin={18} justifyContent="space-evenly">
                        <Text style={styles.stats}> 12 </Text>
                        <Text style={styles.stats}> 986 </Text>
                        <Text style={styles.stats}> 128 </Text>
                        <Text style={styles.stats}> 45 </Text>
                    </HStack>
                </VStack>
            </Box>
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
    flex: 0.6,
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