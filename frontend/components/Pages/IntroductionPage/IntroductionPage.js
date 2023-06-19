import React, { useState, useEffect } from "react";
import {
  Center,
  Image,
  Box,
  Text,
  Container,
  Heading,
  Flex,
  Circle,
  Button,
  AspectRatio,
  HStack,
} from "native-base";

const STEPS = [
  {
    title: "Find A Community Near You",
    description:
      "Connect with local communities to foster social connections, promote engagement, and achieve one common goal: take climate actions.",
    image: require("../../../assets/images/intro-step-1.png"),
  },
  {
    title: "Get Involved In Actions",
    description:
      "Access a diverse range of climate actions tailored to your community.",
    image: require("../../../assets/images/intro-step-2.png"),
  },
  {
    title: "Witness Your Impact",
    description:
      "MassEnergize offers you access to compelling and inspirational data, presenting the number of households actively engaged in diverse actions.",
    image: require("../../../assets/images/intro-step-3.png"),
  },
  {
    title: "Take Local Climate Action",
    description:
      "MassEnergize works with community organizers and local leaders to scale household and community-level climate actions.",
    image: require("../../../assets/images/intro-step-4.png"),
  },
];

export default function IntroductionPage({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [imgSrc, setImgSrc] = useState(STEPS[currentStep].image);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate("chooseCommunity");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    setImgSrc(STEPS[currentStep].image);
  }, [currentStep]);

  return (
    <Box width="100%" flex="1">
      <Button
        position="absolute"
        variant="ghost"
        top="10"
        right="5"
        zIndex={1}
        _text={{ fontWeight: "bold", color: "white", fontSize: "lg" }}
        onPress={() => navigation.navigate("chooseCommunity")}
      >
        Skip
      </Button>
      <AspectRatio>
        <Image source={imgSrc} key={imgSrc} alt="image" />
      </AspectRatio>
      <Box
        width="100%"
        height="100%"
        position="absolute"
        backgroundColor="primary.400"
        opacity="30"
      ></Box>
      <Center
        position="absolute"
        width="100%"
        height="55%"
        bottom="0"
        pt="10"
        borderTopRadius="30"
        backgroundColor="white"
        style={{
          shadowColor: "#000",
          shadowRadius: 5,
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: -10,
          },
        }}
      >
        <Container>
          <Heading alignSelf="center" color="primary.600">
            {STEPS[currentStep].title}
          </Heading>
          <Text
            textAlign="center"
            pt="5"
            mb="20"
            height="40%"
            color="muted.400"
            fontSize="md"
            lineHeight="xl"
            alignSelf="center"
          >
            {STEPS[currentStep].description}
          </Text>
          <HStack space="5" alignSelf="center" mb="5">
            {STEPS.map((_, index) => {
              return (
                <Circle
                  key={index}
                  mr="0.5"
                  size="5px"
                  backgroundColor={
                    index === currentStep ? "primary.400" : "muted.200"
                  }
                />
              );
            })}
          </HStack>
          <Box>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              width="100%"
            >
              <Button
                size="lg"
                variant="ghost"
                _text={{ fontWeight: "bold" }}
                onPress={handlePrev}
                colorScheme={currentStep === 0 ? "muted" : "primary"}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                size="lg"
                variant={currentStep === STEPS.length - 1 ? "solid" : "ghost"}
                _text={{ fontWeight: "bold" }}
                onPress={handleNext}
              >
                {currentStep === STEPS.length - 1 ? "Get Started" : "Next"}
              </Button>
            </Flex>
          </Box>
        </Container>
      </Center>
    </Box>
  );
}
