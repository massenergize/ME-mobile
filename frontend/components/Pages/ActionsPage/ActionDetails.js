import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Center, Box, AspectRatio, Image, VStack, HStack, Button } from "native-base";

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
                <View style={{flexDirection:'row'}}>
                    <Text style = {styles.textStyle}>Impact</Text>
                    <Text style = {[styles.textStyle,{marginRight:25, textAlign:'right', fontWeight: 'normal'}]}>~1.42 tons CO2e</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style = {styles.textStyle}>Cost</Text>
                    <Text style = {[styles.textStyle,{marginRight:25, textAlign:'right', color:'#edb809'}]}>{'\u0024   \u0024   '}</Text>
                </View>
                <Text style = {{margin: 15}}> A Brief Description about the action, why it matters, what impact it has, any statistics abotu usage, how many people have switched, how easy it is, cost, etc.</Text>
                <HStack justifyContent="center">
                    <Button size = "md" variant="outline" _text={{
                        color: 'black',
                        fontWeight: 'bold',
                    }}>
                        Add to To-Do
                    </Button>
                    <Button size = "md" variant = "solid" bg = "green" _text={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>
                        Done
                    </Button>
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
    textStyle: {
        padding: 15,
        fontSize: 18,
        fontWeight: "bold",
        flex: 1
    },
  });