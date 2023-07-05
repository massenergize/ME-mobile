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
import HTMLParser from "../../Shared/HTMLParser";


export default function ActionDetails({ route, navigation}) {

  const { width } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState("description")

  const { action } = route.params;

  const generateDescriptionTab = () => {
    return (
      <HTMLParser
        htmlString={action.about}
        baseStyle={textStyle}
      />
    )
  }

  const generateStepsTab = () => {
    return (
      <HTMLParser
        htmlString={action.steps_to_take}
        baseStyle={textStyle}
      />
    )
  }

  const generateDeepDiveTab = () => {
    return (
      <HTMLParser
        htmlString={action.deep_dive}
        baseStyle={textStyle}
      />
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
                // uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg",
               uri: action.image.url,
            }}
            m={3}
            h={250}
            // w={width}
            alt="image"
            // borderRadius="xl"
            resizeMode="contain"
        />
          <Box bg="white" rounded="xl" flex="0.6">
            <VStack>
              <Text bold fontSize="2xl" m={4}>{action.title}</Text>
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
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} px={3}>
                <TabButton label="Description" name="description" />
                <TabButton label="Steps" name="steps" />
                <TabButton label="Deep Dive" name="deep_dive" />
                <TabButton label="Testimonials" name="testimonials" />
                <TabButton label="Service Providers" name="service_providers" />
                <Container width={5}></Container>
              </ScrollView>
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

const textStyle = {
  fontSize: "16px",
};