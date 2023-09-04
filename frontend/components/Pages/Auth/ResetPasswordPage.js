import React, { useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
} from "native-base";
import * as Yup from "yup";
import { Formik } from "formik";

import Page from "../../Shared/Page";
import useAuth from "../../Hooks/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export default function ResetPasswordPage({ navigation }) {
  const {sendPasswordResetEmail} = useAuth();
  const [isSending, setIsSending] = useState(false);

  const handleSend = (values) => {
    setIsSending(true);
    sendPasswordResetEmail(values.email, (error) => {
        setIsSending(false);
        if (error) {
            console.error("error sending password reset email: ", error);
        } else {
            // TODO: Create a custom alert system to display messages like this.
            alert("password reset email sent successfully");
            // Assume previous page is the login page.
            navigation.goBack();
        }
    })
  };
  return (
    <Page>
      <Center width="100%" flex="1">
        <Box w="100%" maxW="300">
          <Heading mt="1" color="coolGray.600" fontWeight="medium">
            Forgot your password?
          </Heading>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSend}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <VStack space={3} mt="5">
                <FormControl
                  isRequired
                  isInvalid={errors.email && touched.email}
                >
                  <Input
                    variant="rounded"
                    placeholder="Enter your email address..."
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  <Text fontSize="xs" mt="2" ml="2" color="muted.400">
                    We will send you a link to reset your password.
                  </Text>
                  {errors.email && touched.email && (
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <Button
                  mt="10"
                  _text={{ color: "white" }}
                  isLoading={isSending}
                  isLoadingText="Sending..."
                  onPress={handleSubmit}
                >
                  Send Me A Link
                </Button>
                <Button backgroundColor="muted.400" onPress={() => navigation.goBack()}>Back</Button>
              </VStack>
            )}
          </Formik>
        </Box>
      </Center>
    </Page>
  );
}
