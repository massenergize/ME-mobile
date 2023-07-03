import { View, StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import {
  Text,
  Box,
  AspectRatio,
  Image,
  VStack,
  ScrollView,
  Button,
  Container,
  HStack,
  Spacer
} from "native-base";
import Page from "../../Shared/Page";


export default function ActionDetails() {

  const { width } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState("description")

  const generateDescriptionTab = () => {
    return (
      <Text>Description Tab</Text>
    )
  }

  const generateStepsTab = () => {
    return (
      <Text>Steps Tab</Text>
    )
  }

  const generateDeepDiveTab = () => {
    return (
      <Text>Deep Dive Tab</Text>
    )
  }

  const generateTestimonialsTab = () => {
    return (
      <Text>Testimonials Tab</Text>
    )
  }


  const generateServiceProvidersTab = () => {
    return (
      <Text>Service Providers Tab</Text>
    )
  }

  function TabButton({ label, name }) {
    return (
      <Button 
        variant={activeTab === name ? "solid" : "outline"}
        onPress={() => setActiveTab(name)}
        mr={2}
        >
        {label}
      </Button>
    )
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case "description":
        return generateDescriptionTab();
      case "steps":
        return generateStepsTab();
      case "deep_dive":
        return generateDeepDiveTab();
      case "testimonials":
        return generateTestimonialsTab();
      case "service_providers":
        return generateServiceProvidersTab();
      default:
        return generateDescriptionTab();
    }
  }

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>

        <VStack style={{ flex: 1 }}>
          {/* <View style={styles.container}>
            <AspectRatio w="90%" ratio={9 / 9}>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg",
                }}
                alt="image"
              />
            </AspectRatio>
          </View> */}
          <Image
            source={{
                // uri: "https://massenergize-prod-files.s3.amazonaws.com/media/Acton_Boxborough__BioBlitz_2023_A-230529-160415.jpg",
                uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg"
            }}
            my={3}
            h={250}
            w={width}
            alt="image"
            // borderRadius="xl"
            resizeMode="contain"
        />
          <Box bg="white" rounded="xl" flex="0.6">
            <VStack>
              <Text bold fontSize="2xl" m={4}>Change to LED</Text>
              <HStack alignItems="center" mx={4}>
                <Text bold fontSize="lg">Impact</Text>
                <Spacer />
                <Text fontSize="lg">~1.42 tons CO2e</Text>
              </HStack>
              <HStack alignItems="center" mx={4} mt={2} mb={4}>
                <Text bold fontSize="lg">Cost</Text>
                <Spacer />
                <Text fontSize="lg">$$$</Text>
              </HStack>
              <ScrollView horizontal={true} style={styles.menu} showsHorizontalScrollIndicator={false}>
                <TabButton label="Description" name="description" />
                <TabButton label="Steps" name="steps" />
                <TabButton label="Deep Dive" name="deep_dive" />
                <TabButton label="Testimonials" name="testimonials" />
                <TabButton label="Service Providers" name="service_providers" />
              </ScrollView>
              {/* <Text style={{ margin: 15 }}>
                {" "}
                A Brief Description about the action, why it matters, what impact
                it has, any statistics about usage, how many people have switched,
                how easy it is, cost, etc.
              </Text> */}
              <Box m={15}>
                {renderTabContent()}
              </Box>
            </VStack>
            <Container
              // style={{ flexDirection: "row", position: "absolute", bottom: 35 }}
              position="absolute"
              bottom={15}
            >
              {/* <Button
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
              </Button> */}
            </Container>
          </Box>
        </VStack>
      </ScrollView>
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
