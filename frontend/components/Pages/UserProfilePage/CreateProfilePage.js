import React, { useContext, useState, useEffect } from "react";
import {
  Center,
  Text,
  VStack,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
} from "native-base";
import * as Yup from "yup";
import { Formik } from "formik";

import Page from "../../Shared/Page";
import useAuth from "../../Hooks/useAuth";
import useME from "../../Hooks/useME";
import Constants from "../../Constants";
import { CommunityContext } from "../../Contexts/CommunityContext";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string(),
  zipCode: Yup.string()
    .required("Zip code is required")
    .matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
});

export default function CreateProfilePage({ route, navigation }) {
  const { communityInfo } = useContext(CommunityContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, authState, setUser, signOut, setAuthState, signInWithEmailAndPassword } = useAuth();
  const { createUserProfile } = useME();
  const handleSignIn = (values) => {
    const [userEmail, setUserEmail] = useState("");
    setUserEmail(values.email);
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
          navigation.navigate("dashboard", { userEmail: userCreds.user.email });
          console.log("testing");
        }
      }
    );
    
  };
  const handleCreateProfile = async (values) => {
    setIsSubmitting(true);

    // TODO: find where to get city and state
    const location = ", , " + values.zipCode;
    const profile = {
      full_name: values.firstName + " " + values.lastName,
      preferred_name: values.username || values.firstName,
      email: user.email,
      location: location,
      is_vendor: false,
      accepts_terms_and_conditions: true,
      subdomain: communityInfo.subdomain,
      color: "#000000",
    };

    createUserProfile(profile, (response, error, userEmail, userPass) => {
      setIsSubmitting(false);
      if (error) {
        console.log("Error creating profile: ", error);
      } else {
        console.log("Profile created successfully!", response.data.email, response.data.password);
        setUser({ ...user, profile: response.data });
        console.log(response);
        setAuthState(Constants.USER_IS_AUTHENTICATED);
        try {
          // Sign in the user
          signInWithEmailAndPassword(userEmail, userPass);
          console.log("User signed in successfully!");
          console.log("is user email verified?", userEmail);
          console.log("authState: ", authState);
          console.log("The user signed up with", userEmail);
          navigation.navigate("dashboard", { userEmail: userEmail });
          console.log("testing");
        } catch (error) {
          // Handle sign-in error
          console.error("Error signing in: ", error);
        }
        // handleSignIn();
        // console.log("attempted sign in w/ new");
        // navigation.navigate("drawer", { ...route.params });
      }
    });
  };

  return (
    <Page>
      <Center width="full" height="full">
        <VStack space="4" width="80%" alignItems="center">
          <Box>
            <Heading textAlign="center">Almost there!</Heading>
            <Text textAlign="center">Please create a profile.</Text>
          </Box>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              zipCode: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleCreateProfile}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <VStack width="full" space="5">
                <FormControl
                  isRequired
                  isInvalid={errors.firstName && touched.firstName}
                >
                  <Input
                    variant="rounded"
                    size="lg"
                    placeholder="First name..."
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName && (
                    <Text color="red.500">{errors.firstName}</Text>
                  )}
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={errors.lastName && touched.lastName}
                >
                  <Input
                    variant="rounded"
                    size="lg"
                    placeholder="Last name..."
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName && (
                    <Text color="red.500">{errors.lastName}</Text>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.username && touched.username}>
                  <Input
                    variant="rounded"
                    size="lg"
                    placeholder="Username..."
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  {errors.username && touched.username && (
                    <Text color="red.500">{errors.username}</Text>
                  )}
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={errors.zipCode && touched.zipCode}
                >
                  <Input
                    variant="rounded"
                    size="lg"
                    placeholder="Zip Code..."
                    onChangeText={handleChange("zipCode")}
                    onBlur={handleBlur("zipCode")}
                    value={values.zipCode}
                  />
                  {errors.zipCode && touched.zipCode && (
                    <Text color="red.500">{errors.zipCode}</Text>
                  )}
                </FormControl>
                <Text textAlign="center" fontSize="10px">
                  By cotinuing, I accept the{" "}
                  <Text color="blue.400">Privacy Policy</Text> (in short,
                  MassEnergize or host organization won't share my data) and
                  agree to comply with the{" "}
                  <Text color="blue.400">Terms of Service</Text>.
                </Text>
                <Button
                  shadow="5"
                  size="lg"
                  width="full"
                  isLoading={isSubmitting}
                  isLoadingText="Completing registration..."
                  onPress={handleSubmit}
                >
                  Finish Signing Up
                </Button>
                <Button
                  size="lg"
                  width="full"
                  variant="ghost"
                  onPress={() => {
                    signOut();
                    navigation.navigate("login", { ...route.params });
                  }}
                >
                  Cancel
                </Button>
              </VStack>
            )}
          </Formik>
        </VStack>
      </Center>
    </Page>
  );
}
