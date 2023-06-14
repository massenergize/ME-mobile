import { View, Text } from "react-native";
import React from "react";
import { Button } from "native-base";

export default function WelcomePage({ navigation }) {
  return (
    <View>
      <Text>WelcomePage</Text>
      <Button onPress={() => navigation.navigate("login")}>Login</Button>
      <Button onPress={() => navigation.navigate("drawer")}>Community</Button>
    </View>
  );
}
