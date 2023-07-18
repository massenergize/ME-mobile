import React, { useState, useEffect, useContext } from "react";
import Page from "../../Shared/Page";
import { Container, Image, VStack, ScrollView, Spinner, Text } from "native-base";
import HTMLParser from "../../Shared/HTMLParser";

// import aboutData from "./../../../data/about_us_page_settingsInfo.json";
// import { apiCall } from "../../../api/functions";
import { CommunityContext } from "../../Contexts/CommunityContext";

export default function AboutPage({ route, navigation }) {

  const { community_id } = route.params;

  // const [about, setAbout] = useState(null);
  // const [isAboutLoading, setIsAboutLoading] = useState(true);
  const { about } = useContext(CommunityContext);

  // const getAbout = () => {
  //   apiCall("about_us_page_settings.info", {community_id: community_id}).then((json) => {
  //     if (json.success) {
  //         setAbout(json.data);
  //         // console.log(json.data)
  //     } else {
  //         console.log(json);
  //     }
  //     setIsAboutLoading(false);
  //   });
  // }

  // useEffect(() => {
  //   getAbout();
  // }, []);

  return (
    <Page>
      {
        // isAboutLoading
        // ? <Spinner />
        // :
        <ScrollView showsVerticalScrollIndicator={false} px="5">
          <VStack alignItems="center" m={4}>
            <Container maxHeight={200} width="100%" alignItems="center">
              <Image
                  source={{uri: about.community.logo.url}}
                  alt="Community Logo"
                  resizeMode="contain"
                  height="full"
                  width="full"
              />
            </Container>
            <Text bold fontSize="lg">{about.community.name}</Text>
            <HTMLParser
                    htmlString={about.description}
                    baseStyle={textStyle}
                  />
          </VStack>
        </ScrollView>
      }
    </Page>
  );
}

const textStyle = {
  fontSize: "16px",
};