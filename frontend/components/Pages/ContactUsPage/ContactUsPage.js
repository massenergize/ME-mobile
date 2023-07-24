import React, { useState, useContext } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  Text,
  FormControl,
  Input,
  VStack,
  ScrollView,
  Divider,
  Button,
  View,
} from "native-base";
import * as Yup from "yup";
import { Formik } from "formik";

import Page from "../../Shared/Page";
import { CommunityContext } from "../../Contexts/CommunityContext";
import useAuth from "../../Hooks/useAuth";
import { apiCall } from "../../../api/functions";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactUsPage({ route }) {
  const { community_id } = route.params;
  const { communityInfo } = useContext(CommunityContext);
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendMessage = (values, actions) => {
    setIsSubmitting(true);
    const data = {
      community_id: community_id,
      name: values.name,
      email: values.email,
      title: values.subject,
      body: values.message,
    };

    apiCall("admins.messages.add", data).then((response) => {
      setIsSubmitting(false);
      if (response.success && response.data) {
        alert("Message sent successfully!");
      } else {
        alert("Message sending failed!");
      }
    });

    actions.resetForm();
  };

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false} px={3}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <VStack>
            <Text bold fontSize="lg" mt={5}>
              Community Administrator
            </Text>
            <Text fontSize="lg">{communityInfo.admins[0].full_name}</Text>
            {communityInfo.admins[0].households[0].location?.city ? (
              <View>
                <Text bold fontSize="lg" mt={3}>
                  Location
                </Text>
                <Text fontSize="lg">
                  {communityInfo.admins[0].households[0].location.city},
                  Massachusetts,{" "}
                  {communityInfo.admins[0].households[0].location.zipcode}
                </Text>
              </View>
            ) : null}
            <Divider my={5} />
            <Text textAlign="center" fontSize="md">
              We are always striving to make this better and welcome your
              feedback! Reach the community administrator by filling in the
              form.
            </Text>
            <Formik
              initialValues={{
                name: user?.full_name,
                email: user?.email,
                subject: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSendMessage}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <VStack>
                  <FormControl
                    mt={5}
                    isRequired
                    isInvalid={errors.name && touched.name}
                  >
                    <Input
                      variant="rounded"
                      size="lg"
                      placeholder="Name"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                    {errors.name && touched.name ? (
                      <FormControl.ErrorMessage
                        _text={{
                          fontSize: "xs",
                          color: "error.500",
                          fontWeight: 500,
                        }}
                      >
                        {errors.name}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    mt={3}
                    isRequired
                    isInvalid={errors.email && touched.email}
                  >
                    <Input
                      variant="rounded"
                      size="lg"
                      placeholder="Email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <FormControl.ErrorMessage
                        _text={{
                          fontSize: "xs",
                          color: "error.500",
                          fontWeight: 500,
                        }}
                      >
                        {errors.email}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    mt={3}
                    isRequired
                    isInvalid={errors.subject && touched.subject}
                  >
                    <Input
                      variant="rounded"
                      size="lg"
                      placeholder="Subject"
                      onChangeText={handleChange("subject")}
                      onBlur={handleBlur("subject")}
                      value={values.subject}
                    />
                    {errors.subject && touched.subject ? (
                      <FormControl.ErrorMessage
                        _text={{
                          fontSize: "xs",
                          color: "error.500",
                          fontWeight: 500,
                        }}
                      >
                        {errors.subject}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    mt={3}
                    isRequired
                    isInvalid={errors.message && touched.message}
                  >
                    <Input
                      size="lg"
                      borderRadius={25}
                      placeholder="Message"
                      textAlignVertical="top"
                      multiline={true}
                      height={40}
                      onChangeText={handleChange("message")}
                      onBlur={handleBlur("message")}
                      value={values.message}
                    />
                    {errors.message && touched.message ? (
                      <FormControl.ErrorMessage
                        _text={{
                          fontSize: "xs",
                          color: "error.500",
                          fontWeight: 500,
                        }}
                      >
                        {errors.message}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <Button
                    mt={3}
                    bg="primary.400"
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                    disabled={isSubmitting}
                    onPress={handleSubmit}
                  >
                    SEND MESSAGE
                  </Button>
                </VStack>
              )}
            </Formik>
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </Page>
  );
}
