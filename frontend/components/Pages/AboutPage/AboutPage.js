import React, { useContext } from "react";
import Page from "../../Shared/Page";
import { Container, Image, VStack, ScrollView, Text } from "native-base";
import HTMLParser from "../../Shared/HTMLParser";
import { CommunityContext } from "../../Contexts/CommunityContext";

export default function AboutPage() {
  const { about } = useContext(CommunityContext);

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false} px="5">
        <VStack alignItems="center" m={4}>
          <Container maxHeight={200} width="100%" alignItems="center">
            <Image
              source={{ uri: about.community.logo.url }}
              alt="Community Logo"
              resizeMode="contain"
              height="full"
              width="full"
            />
          </Container>
          <Text bold fontSize="lg">
            {about.community.name}
          </Text>
          <HTMLParser htmlString={about.description} baseStyle={textStyle} />
        </VStack>
      </ScrollView>
    </Page>
  );
}

const textStyle = {
  fontSize: "16px",
};
