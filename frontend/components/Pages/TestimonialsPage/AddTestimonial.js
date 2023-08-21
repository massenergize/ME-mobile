import React from "react";

import * as Yup from "yup";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Formik } from "formik";
import {
  Input,
  ScrollView,
  Text,
  VStack,
  Box,
  Icon,
  Button,
  FormControl,
} from "native-base";

import actionStyles from "../ActionsPage/styles";
import ImageInput from "./ImageInput";
import Page from "../../Shared/Page";

const ActionInput = () => {
  return (
    <Box
      height={actionStyles.imageSize}
      width={actionStyles.imageSize}
      alignItems="center"
      justifyContent="center"
      borderWidth="1"
      borderColor="muted.300"
      borderRadius="lg"
    >
      <Icon as={FontAwesome} name="plus" size="lg" color="muted.400" />
    </Box>
  );
};

const SPInput = () => {
  return (
    <Box
      height="100"
      alignItems="center"
      justifyContent="center"
      borderWidth="1"
      borderColor="muted.300"
      borderRadius="lg"
    >
      <Icon as={FontAwesome} name="plus" size="lg" color="muted.400" />
    </Box>
  );
};

const validationSchema = Yup.object().shape({
  image: Yup.mixed().nullable(),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  action: Yup.mixed().nullable(),
  serviceProvider: Yup.mixed().nullable(),
});

export default function AddTestimonial() {
  // TODO: waiting for dashboard/user context to be implemented

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            image: null,
            title: "",
            description: "",
            action: null,
            serviceProvider: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <VStack space={4} px="5" pt="10">
              <FormControl>
                <ImageInput onChange={handleChange("image")} value={values.image} />
              </FormControl>
              <FormControl isRequired isInvalid={errors.title && touched.title}>
                <Input
                  borderRadius="lg"
                  placeholder="Title"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
                {errors.title && touched.title ? (
                  <FormControl.ErrorMessage
                    _text={{
                      fontSize: "xs",
                      color: "error.500",
                      fontWeight: 500,
                    }}
                  >
                    {errors.title}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={errors.description && touched.description}
              >
                <Input
                  borderRadius="lg"
                  textAlignVertical="top"
                  multiline={true}
                  placeholder="Description"
                  height={20}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />
                {errors.description && touched.description ? (
                  <FormControl.ErrorMessage
                    _text={{
                      fontSize: "xs",
                      color: "error.500",
                      fontWeight: 500,
                    }}
                  >
                    {errors.description}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
              <Text>Associated Action</Text>
              <FormControl>
                <ActionInput />
              </FormControl>
              <Text>Associated Service Provider</Text>
              <FormControl>
                <SPInput />
              </FormControl>
              <Button my="10" onPress={handleSubmit}>
                Share
              </Button>
            </VStack>
          )}
        </Formik>
      </ScrollView>
    </Page>
  );
}
