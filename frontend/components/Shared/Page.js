import React from "react";
import { View } from "native-base";

export default function Page(props) {
  return (
    <View backgroundColor="white" flex="1" {...props}>
      {props.children}
    </View>
  );
}
