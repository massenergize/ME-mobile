import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  Box,
  AspectRatio,
  Image,
  VStack,
  ScrollView,
  Button,
} from "native-base";
import Page from "../../Shared/Page";

export default function ActionDetails() {
  const buttonOne = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      margin: 20,
      backgroundColor: "white",
      flex: 1,
    };

    buttonOne.current.setNativeProps({
      style: styleObj,
    });
  }, [buttonOne]);
  const buttonTwo = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      margin: 20,
      backgroundColor: "green",
      flex: 1,
    };

    buttonTwo.current.setNativeProps({
      style: styleObj,
    });
  }, [buttonTwo]);
  const buttonMenu = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      backgroundColor: "white",
      width: 110,
      height: 40,
    };

    buttonMenu.current.setNativeProps({
      style: styleObj,
    });
  }, [buttonMenu]);
  return (
    <Page>
      <VStack style={{ flex: 1 }}>
        <View style={styles.container}>
          <AspectRatio w="90%" ratio={9 / 9}>
            <Image
              source={{
                uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
        </View>
        <Box bg="white" rounded="xl" flex="0.6">
          <VStack>
            <Text style={styles.actionname}>Change to LED</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textStyle}>Impact</Text>
              <Text
                style={[
                  styles.textStyle,
                  { marginRight: 25, textAlign: "right", fontWeight: "normal" },
                ]}
              >
                ~1.42 tons CO2e
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textStyle}>Cost</Text>
              <Text
                style={[
                  styles.textStyle,
                  { marginRight: 25, textAlign: "right", color: "#edb809" },
                ]}
              >
                {"\u0024   \u0024   "}
              </Text>
            </View>
            <ScrollView horizontal={true} style={styles.menu}>
              <Button
                size="md"
                variant="outline"
                marginRight="15"
                _text={{
                  color: "black",
                  fontWeight: "bold",
                }}
                ref={buttonMenu}
              >
                Description
              </Button>
              <Button
                size="md"
                variant="outline"
                marginRight="15"
                _text={{
                  color: "black",
                  fontWeight: "bold",
                }}
                ref={buttonMenu}
              >
                Steps
              </Button>
              <Button
                size="md"
                variant="outline"
                marginRight="15"
                _text={{
                  color: "black",
                  fontWeight: "bold",
                }}
                ref={buttonMenu}
              >
                Testimonials
              </Button>
              <Button
                size="md"
                variant="outline"
                marginRight="15"
                _text={{
                  color: "black",
                  fontWeight: "bold",
                }}
                ref={buttonMenu}
              >
                Service Providers
              </Button>
              <Button
                size="md"
                variant="outline"
                marginRight="15"
                _text={{
                  color: "black",
                  fontWeight: "bold",
                }}
                ref={buttonMenu}
              >
                Deep Dive
              </Button>
            </ScrollView>
            <Text style={{ margin: 15 }}>
              {" "}
              A Brief Description about the action, why it matters, what impact
              it has, any statistics about usage, how many people have switched,
              how easy it is, cost, etc.
            </Text>
          </VStack>
          <View
            style={{ flexDirection: "row", position: "absolute", bottom: 35 }}
          >
            <Button
              size="md"
              variant="outline"
              _text={{
                color: "black",
                fontWeight: "bold",
              }}
              ref={buttonOne}
            >
              Add to To-Do
            </Button>
            <Button
              size="md"
              variant="solid"
              _text={{
                color: "white",
                fontWeight: "bold",
              }}
              ref={buttonTwo}
            >
              Done
            </Button>
          </View>
        </Box>
      </VStack>
    </Page>
  );
}

const styles = StyleSheet.create({
  actionname: {
    padding: 15,
    fontSize: 23,
    fontWeight: "bold",
  },
  container: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    padding: 15,
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  menu: {
    marginLeft: 15,
  },
});
