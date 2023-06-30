import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Text, FormControl, Input, VStack, ScrollView, Divider, Button, Container } from "native-base";
import Page from "../../Shared/Page";
import communityInfo from "../../../data/communitiesInfo.json";

export default function ContactUsPage({ navigation }) {
  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false} px={3}>
        {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
        <KeyboardAvoidingView behavior="padding">
        <VStack>  
          <Text bold fontSize="lg" mt={5}>Community Administrator</Text>
          <Text fontSize="lg">{communityInfo.data.admins[0].full_name}</Text>
          <Text bold fontSize="lg" mt={3}>Location</Text>
          <Text fontSize="lg">{communityInfo.data.admins[0].households[0].location.city}, Massachusetts, {communityInfo.data.admins[0].households[0].location.zipcode}</Text>
          <Divider my={5} />
          <Text textAlign="center" fontSize="md">We are always striving to make this better and welcome your feedback! Reach the community administrator by filling in the form.</Text>
          <FormControl mt={5}>
            <Input
              variant="rounded"
              size="lg"
              placeholder="Name"
            />
          </FormControl>
          <FormControl mt={3}>
            <Input
              variant="rounded"
              size="lg"
              placeholder="Email"
            />
          </FormControl>
          <FormControl mt={3}>
            <Input
              variant="rounded"
              size="lg"
              placeholder="Subject"
            />
          </FormControl>
          <FormControl mt={3}>
            <Input
              borderRadius={25}
              size="lg"
              placeholder="Message"
              textAlignVertical="top"
              multiline={true}
              height={40}
            />
          </FormControl>
          <Button mt={3} bg="primary.400" onPress={() => {}}>SEND MESSAGE</Button>
          <Container height={100} />
        </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </Page>
  );
}
