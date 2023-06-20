import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Center, Box, AspectRatio, Image, VStack, ScrollView, Button, HStack, Pressable } from "native-base";
import ActionCard from '../ActionsPage/ActionCard';


export default function ProfileExpanded({ navigation }) {
    
    return (
        <VStack>
            <View style={styles.container}>
                <Image source={{uri: "https://images.unsplash.com/photo-1642572285001-20d5d570c7d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80"
                }} alt="image"/>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 24, padding: 25, color: "green", paddingBottom: 15}}>Welcome  
                <Text style={{fontWeight: 'bold', fontSize: 24, color: "black", }}> Your Name!</Text>
            </Text>
            <View style={{borderBottomColor: 'green', borderBottomWidth: 3, marginLeft: 25, marginRight: 25}}>
            </View>
            
        </VStack>
  );
}

const styles = StyleSheet.create({
    container: {
        
    }
})