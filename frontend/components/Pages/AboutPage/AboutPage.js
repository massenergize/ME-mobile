import React from "react";
import Page from "../../Shared/Page";
import { Text, Container, Image, VStack, ScrollView } from "native-base";
import aboutData from "./../../../data/about_us_page_settingsInfo.json";
import HTMLParser from "../../Shared/HTMLParser";

export default function AboutPage() {
  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false} px="5">
        <VStack alignItems="center" m={4}>
          <Container maxHeight={200} width="100%" alignItems="center">
            <Image
                source={{uri: aboutData.data.community.logo.url}}
                alt="Community Logo"
                resizeMode="contain"
                height="full"
                width="full"
            />
          </Container>
          <HTMLParser
                  htmlString={aboutData.data.description}
                  baseStyle={textStyle}
                />
        </VStack>
      </ScrollView>
    </Page>
  );
}

const textStyle = {
  fontSize: "16px",
};