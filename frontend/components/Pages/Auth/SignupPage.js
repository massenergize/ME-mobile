import React, { useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Text,
} from "native-base";
import * as Yup from "yup";
import { Formik } from "formik";

import Page from "../../Shared/Page";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupPage({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = (values) => {
    setIsSubmitting(true);
    // setTimeout(() => {
    //   setIsSubmitting(false);
    // }, 3000);
    console.log(values);
  };

  return (
    <Page>
      <Center width="100%" flex="1">
        <Box w="100%" maxW="300">
          <Heading mt="1" color="coolGray.600" fontWeight="medium">
            Sign up to join your community!
          </Heading>

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
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
                    size="lg"
                    placeholder="Email address..."
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={errors.password && touched.password}
                >
                  <Input
                    variant="rounded"
                    size="lg"
                    placeholder="Password..."
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    type="password"
                  />
                  {errors.password && touched.password && (
                    <FormControl.ErrorMessage>
                      {errors.password}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={errors.confirmPassword && touched.confirmPassword}
                >
                  <Input
                    variant="rounded"
                    size="lg"
                    placeholder="Confirm password..."
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    type="password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <FormControl.ErrorMessage>
                      {errors.confirmPassword}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <Button
                  mt="10"
                  _text={{ color: "white" }}
                  isLoading={isSubmitting}
                  onPress={handleSubmit}
                >
                  Sign up
                </Button>
                <HStack mt="6" justifyContent="center" alignItems="center">
                  <Text fontSize="sm" color="muted.700" fontWeight={400}>
                    I have an account.{" "}
                  </Text>
                  <Link
                    _text={{ color: "primary.300", bold: true, fontSize: "sm" }}
                    onPress={() => navigation.navigate("login")}
                  >
                    Sign In
                  </Link>
                </HStack>
              </VStack>
            )}
          </Formik>
        </Box>
      </Center>
    </Page>
  );
}
