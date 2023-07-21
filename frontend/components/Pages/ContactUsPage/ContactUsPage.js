import React, { useState, useEffect, useContext } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Text, FormControl, Input, VStack, ScrollView, Divider, Button, Spinner, View } from "native-base";
import Page from "../../Shared/Page";
import { CommunityContext } from "../../Contexts/CommunityContext";

export default function ContactUsPage({ route, navigation }) {
  const { community_id } = route.params;

  const { communityInfo } = useContext(CommunityContext);

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false} px={3}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <VStack>  
          <Text bold fontSize="lg" mt={5}>Community Administrator</Text>
          <Text fontSize="lg">{communityInfo.admins[0].full_name}</Text>
          {
            communityInfo.admins[0].households[0].location.city ?
            <View>
              <Text bold fontSize="lg" mt={3}>Location</Text>
              <Text fontSize="lg">{communityInfo.admins[0].households[0].location.city}, Massachusetts, {communityInfo.admins[0].households[0].location.zipcode}</Text>
            </View>
            : null
          }
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
        </VStack>
      </KeyboardAvoidingView>
      </ScrollView>
    </Page>
  );
}
