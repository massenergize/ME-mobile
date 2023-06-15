import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Center, Box, AspectRatio, Image, VStack, HStack } from "native-base";

export default function ActionDetails() {
  return (
    <VStack>
        <View style={styles.container}> 
            <AspectRatio w="100%" ratio={9 / 9}>
                <Image source={{
                    uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg"
                }} alt="image"/>
            </AspectRatio>
        </View>
        <Box bg="white" rounded = "xl">
            <VStack>
                <Text style={styles.actionname}>Change to LED</Text>
                <HStack>
                    <Text style = {styles.header}>Cost</Text>
                </HStack>
            </VStack>
        </Box>
    </VStack>
    
  );
}


const styles = StyleSheet.create({
    actionname: {
        padding: 15,
        fontSize: 23,
        fontWeight: "bold",    
    },
    container: {
        padding: 50,
    },
    header: 
    {
        padding: 15,
        fontSize: 18,
        fontWeight: "bold",
    }
  });