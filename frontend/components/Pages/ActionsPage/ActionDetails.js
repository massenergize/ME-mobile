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
import ServiceProviderCard from "../ServiceProvidersPage/ServiceProviderCard";


export default function ActionDetails({ route, navigation }) {

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
    if (action.deep_dive === "") {
      return (
        <Text>No information available.</Text>
      )
    } 
    else {
      return (
        <HTMLParser
          htmlString={action.deep_dive}
          baseStyle={textStyle}
        />
      )
    }
  }

  const generateTestimonialsTab = () => {
    return (
      <Text>Testimonials Tab</Text>
    )
  }


  const generateServiceProvidersTab = () => {
    if (action.vendors.length === 0) {
      return (
        <Text>No associated service providers.</Text>
      )
    }
    return (
      action.vendors.map((vendor, index) => {
        return <ServiceProviderCard 
          id={vendor.id}
          direction="row" 
          description=""
          imageURI={vendor.logo.url}
          name={vendor.name}
          // onPress={() =>
          //   navigation.navigate("serviceProviderDetails")
          // }
          navigation={navigation}
          key={index}/>
      })
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

  const getMetric = (metric) => {
    for (let i = 0; i < action.tags.length; i++) {
      if (action.tags[i].tag_collection_name === metric) {
        return action.tags[i].name;
      }
    }
    return "-"
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
               uri: (action.image != null) ? action.image.url : "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg",
            }}
            m={3}
            h={250}
            // w={width}
            alt="image"
            // borderRadius="xl"
            resizeMode="contain"
        />
          <Box bg="white" borderRadius="3xl" shadow={5} height="100%">
            <VStack>
              <Text bold fontSize="2xl" m={4}>{action.title}</Text>
              <HStack alignItems="center" mx={4}>
                <Text bold fontSize="lg">Impact</Text>
                <Spacer />
                <Text fontSize="lg">{getMetric("Impact")}</Text>
              </HStack>
              <HStack alignItems="center" mx={4} mt={2} mb={4}>
                <Text bold fontSize="lg">Cost</Text>
                <Spacer />
                <Text fontSize="lg">{getMetric("Cost")}</Text>
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