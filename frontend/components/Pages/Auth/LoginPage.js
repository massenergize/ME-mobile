import React, { useState, useEffect } from "react";
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
import EmailVerificationPage from "./EmailVerificationPage";
import useAuth from "../../Hooks/useAuth";
import Constants from "../../Constants";
import { DashboardContext, useDashboardContext } from "../../Contexts/DashboardContext";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage({ route, navigation }) {
  const { community_id } = route.params;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { user, authState, signInWithEmailAndPassword } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState(null);
  const [userPass, setUserPass] = useState("");

  const handleSignIn = (values) => {
    // const [userEmail, setUserEmail] = useState("");
    setUserEmail(values.email);
    setUserPass(values.password);
    setIsSubmitting(true);
    signInWithEmailAndPassword(
      values.email,
      values.password,
      (userCreds, error) => {
        // useAuth.signInWithEmailAndPassword is fetching ME's token behind the scenes.
        setIsSubmitting(false);
        if (error) {
          setErrorMsg(error);
        } else {
          setUserEmail(values.email);
          console.log("User signed in successfully!");
          console.log("is user email verified?", userCreds.user.emailVerified);
          console.log("authState: ", authState);
          console.log("The user signed up with", values.email, " " , userEmail, " ", userCreds.user.email);
          if (authState === Constants.USER_IS_AUTHENTICATED) {
            navigation.navigate("dashboard", { userEmail: userCreds.user.email });
          }
          console.log("testing");
        }
      }
    );
    
  };

  const refreshUser = async () => {
    console.log("Refreshing user's credentials...");
    await user.reload();
    setIsEmailVerified(user.emailVerified);
  };

  // Hacky way to redirect to createProfile page if user is not registered in ME yet.
  useEffect(() => {
    if (authState === Constants.NEEDS_REGISTRATION) {
      navigation.navigate("createProfile", { userEmail: userEmail, userPass: userPass });
    } else if (authState === Constants.USER_IS_AUTHENTICATED) {
      navigation.navigate("dashboard", { userEmail: userEmail, userName: userName });
    }
  }, [authState]);

  // display email verification page if user is not verified.
  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.emailVerified);
    }
  }, [user]);

  if (user && !isEmailVerified) {
    return <EmailVerificationPage onRefresh={() => refreshUser()} />;
  } else {
    return (
      <Page>
        <Center width="100%" flex="1">
          <Box w="100%" maxW="300">
            <Heading mt="1" color="coolGray.600" fontWeight="medium">
              Sign in to continue!
            </Heading>

            {errorMsg && (
              <Text mt="2" color="red.500">
                {errorMsg}
              </Text>
            )}

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}
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
                      type="password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <FormControl.ErrorMessage>
                        {errors.password}
                      </FormControl.ErrorMessage>
                    )}
                    <Link
                      _text={{
                        fontSize: "xs",
                        fontWeight: "700",
                        color: "primary.300",
                      }}
                      alignSelf="flex-end"
                      mt="1"
                      mr="2"
                      onPress={() =>
                        navigation.navigate("resetPassword")
                      }
                    >
                      Forgot Password?
                    </Link>
                  </FormControl>
                  <Button
                    mt="10"
                    isLoading={isSubmitting}
                    isLoadingText="Signing in..."
                    onPress={handleSubmit}
                  >
                    Sign in
                  </Button>
                  <HStack mt="6" justifyContent="center" alignItems="center">
                    <Text fontSize="sm" color="muted.700" fontWeight={400}>
                      I'm a new user.{" "}
                    </Text>
                    <Link
                      _text={{
                        color: "primary.300",
                        bold: true,
                        fontSize: "sm",
                      }}
                      onPress={() =>
                        navigation.navigate("signup", {
                          community_id: community_id,
                        })
                      }
                    >
                      Sign Up
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
}
