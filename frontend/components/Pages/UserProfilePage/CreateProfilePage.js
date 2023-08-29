import React, { useContext, useState } from "react";
import {
  Center,
  Text,
  VStack,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  Spinner,
  Icon,
} from "native-base";
import * as Yup from "yup";
import { Formik } from "formik";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
  const { user, setUser, signOut, setAuthState } = useAuth();
  const { validateUsername, createUserProfile } = useME();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [usernameError, setUsernameError] = useState(null);

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

    createUserProfile(profile, (response, error) => {
      setIsSubmitting(false);
      if (error) {
        console.log("Error creating profile: ", error);
      } else {
        console.log("Profile created successfully!", response.data.email);
        setUser({ ...user, profile: response.data });
        setAuthState(Constants.USER_IS_AUTHENTICATED);
        navigation.navigate("drawer", { ...route.params });
      }
    });
  };

  const handleUsernameBlur = (username) => {
    if (username) {
      setIsValidating(true);
      setIsUsernameValid(null);
      validateUsername(username, (response, error) => {
        if (error) {
          setIsUsernameValid(false);
          setUsernameError(error)
        } else {
          if (response.valid) {
            setIsUsernameValid(true);
            setUsernameError(null);
          } else {
            setIsUsernameValid(false);
            setUsernameError(response.data)
          }
        }
        setIsValidating(false);
      });
    }
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
                    onBlur={() => {
                      handleBlur("username");
                      handleUsernameBlur(values.username)
                    }}
                    value={values.username}
                  />
                  <Box position="absolute" right="3" top="3" >
                    <Spinner display={isValidating ? "flex" : "none"}/>
                    <Icon as={FontAwesome} name="check" color="primary.400" display={isUsernameValid ? "flex" : "none"}/>
                    {/* ignore below icon if isUsernameValid is null */}
                    <Icon as={FontAwesome} name="times" color="red.400" display={isUsernameValid === false ? "flex" : "none"}/>
                  </Box>
                  {usernameError && <Text color="red.500">{usernameError}</Text>}
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
                  Finish Singing Up
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
