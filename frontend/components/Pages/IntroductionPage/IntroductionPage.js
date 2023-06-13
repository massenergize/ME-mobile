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
} from "native-base";

const STEPS = [
  {
    title: "Title #1",
    description:
      "A brief description about the <bold>purpose</bold> of this step",
    image: require("../../../assets/images/intro-step-1.png"),
  },
  {
    title: "Title #2",
    description:
      "A brief description about the <bold>purpose</bold> of this step",
    image: require("../../../assets/images/intro-step-2.png"),
  },
  {
    title: "Title #3",
    description:
      "A brief description about the <bold>purpose</bold> of this step",
    image: require("../../../assets/images/intro-step-3.png"),
  },
  {
    title: "Take Local Climate Action",
    description:
      "<bold>MassEnergize</bold> works with community organizers and local leaders to scale household and community-level <bold>climate actions</bold>.",
    image: require("../../../assets/images/intro-step-4.png"),
  },
];

export default function IntroductionPage({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [imgSrc, setImgSrc] = useState(STEPS[currentStep].image);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
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
        onPress={() => navigation.navigate("welcome")}
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
        backgroundColor="primary.100"
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
            dangerouslySetInnerHTML={{ __html: STEPS[currentStep].description }}
          >
            {STEPS[currentStep].description}
          </Text>
          <Flex flexDirection="row" alignSelf="center" mb="5">
            {STEPS.map((_, index) => {
              return (
                <Circle
                  key={index}
                  mr="0.5"
                  size="10px"
                  backgroundColor={
                    index === currentStep ? "primary.400" : "muted.200"
                  }
                />
              );
            })}
          </Flex>
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
                variant="ghost"
                _text={{ fontWeight: "bold" }}
                onPress={handleNext}
                colorScheme={
                  currentStep === STEPS.length - 1 ? "muted" : "primary"
                }
                disabled={currentStep === STEPS.length - 1}
              >
                Next
              </Button>
            </Flex>
          </Box>
        </Container>
      </Center>
    </Box>
  );
}
