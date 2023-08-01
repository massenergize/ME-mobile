import { View, useWindowDimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Box,
  Image,
  VStack,
  ScrollView,
  Button,
  Container,
  HStack,
  Spacer,
  Spinner,
  Center,
  Modal,
  Icon
} from "native-base";
import Page from "../../Shared/Page";
import HTMLParser from "../../Shared/HTMLParser";
import ServiceProviderCard from "../ServiceProvidersPage/ServiceProviderCard";
import { CommunityContext, useDetails } from "../../Contexts/CommunityContext";
import { TestimonialCard } from "../TestimonialsPage/TestimonialsCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ActionDetails({ route, navigation }) {
  const { action_id } = route.params;
  const { width } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState("description")

  const [action, isActionLoading] = useDetails("actions.info", {action_id: action_id});
  const { testimonials } = useContext(CommunityContext);

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

  const [actionTestimonials, setActionTestimonials] = useState([])

  const getTestimonials = () => {
    const relatedTestimonials = [];
    for (let i = 0; i < testimonials.length; i++) {
      if (testimonials[i].action?.id === action_id) {
        relatedTestimonials.push(testimonials[i]);
      }
    }
    console.log(relatedTestimonials)
    setActionTestimonials(relatedTestimonials);
  }

  useEffect(() => {
    getTestimonials();
  }, [])

  const generateTestimonialsTab = () => {
    return (
      actionTestimonials.length === 0 
      ? <Text>No testimonials available.</Text> 
      :
      actionTestimonials.map((testimonial, index) => {
        return (
          <TestimonialCard navigation={navigation} data={testimonial} key={index} picture={testimonial.file != null}/>
        )
      })
      
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

  const [ isDoneOpen, setIsDoneOpen ] = useState(false);

  return (
    <Page>
      {
        isActionLoading 
        ? 
        <Center width="100%" height="100%">
          <Spinner size="lg"/>
        </Center>
        :
        <View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack style={{ flex: 1 }}>
              <Image
                source={{
                    // uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg",
                  uri: (action.image != null) ? action.image.url : null,
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
                  <HStack alignItems="center" mx={4} mt={2} mb={1}>
                    <Text bold fontSize="lg">Cost</Text>
                    <Spacer />
                    <Text fontSize="lg">{getMetric("Cost")}</Text>
                  </HStack>
                  <HStack space={2} justifyContent="center" width="100%" mb={3}>
                    <Button
                      size="md"
                      variant="solid"
                      _text={{
                        color: "white",
                        fontWeight: "bold",
                      }}
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
                      onPress={() => setIsDoneOpen(true)}
                    >
                      Done
                    </Button>
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
                  // position="absolute"
                  // bottom={15}
                >
                </Container>
              </Box>
            </VStack>
            <Container height={20}></Container>
          </ScrollView>

          <Modal isOpen={isDoneOpen} onClose={() => {}}>
            <Modal.Content maxWidth="400px">
              <Modal.Body>
                <Center mb="5">
                  <Ionicons name={"ribbon-outline"} size={90} color="#64B058" />
                  <Text fontSize="xl" fontWeight="bold" py={2}>
                    Congratulations!
                  </Text>
                  <Text textAlign="center" fontSize="lg">
                    You just completed <Text bold color="primary.600">{action.title}</Text>!
                  </Text>
                </Center>
                <HStack width="100%" justifyContent={"center"}>
                  <Button 
                    color={"primary.600"} 
                    onPress={() => {setIsDoneOpen(false), navigation.navigate("addTestimonial")}} 
                    mr={3}
                  >
                    Leave a Testimonial
                  </Button>
                  <Button variant={"outline"} px={5} onPress={() => setIsDoneOpen(false)}>
                    Exit
                  </Button>
                </HStack>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </View>
      }
    </Page>
  );
}

const textStyle = {
  fontSize: "16px",
};