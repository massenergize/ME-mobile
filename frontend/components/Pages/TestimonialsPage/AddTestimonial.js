import React, { useContext, useState } from "react";

import * as Yup from "yup";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Formik } from "formik";
import {
  View,
  Input,
  ScrollView,
  Text,
  VStack,
  Box,
  Icon,
  Button,
  FormControl,
} from "native-base";
import { TouchableOpacity } from "react-native";

import actionStyles from "../ActionsPage/styles";
import ImageInput from "./ImageInput";
import Page from "../../Shared/Page";
import ListResources from "./ListResources";
import { CommunityContext } from "../../Contexts/CommunityContext";

const ActionInput = ({ data, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (id) => {
    setIsOpen(false);
    onChange(id)
  }

  const renderAction = (id) => {
    const action = data.find((i) => i.id === id);
    return action.title;
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Box
          p="2"
          alignItems="center"
          justifyContent="center"
          borderWidth="1"
          borderColor="muted.300"
          borderRadius="lg"
        >
          {value ? (
            <Text>{renderAction(value)}</Text>
          ): (

          <Icon as={FontAwesome} name="plus" size="lg" color="muted.400" />
          )}
        </Box>
      </TouchableOpacity>
      <ListResources
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Actions"}
        data={data}
        onSelect={onSelect}
      />
    </View>
  );
};

const SPInput = ({ data, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (id) => {
    setIsOpen(false);
    onChange(id)
  }

  const renderSP = (id) => {
    const sp = data.find((i) => i.id === id);
    return sp.name;
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Box
          p="2"
          alignItems="center"
          justifyContent="center"
          borderWidth="1"
          borderColor="muted.300"
          borderRadius="lg"
        >
          {value ? (
            <Text>{renderSP(value)}</Text>
          ): (
            <Icon as={FontAwesome} name="plus" size="lg" color="muted.400" />
          )}
        </Box>
      </TouchableOpacity>
      <ListResources
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Service Providers"}
        data={data}
        onSelect={onSelect}
      />
    </View>
  );
};

const validationSchema = Yup.object().shape({
  image: Yup.mixed().nullable(),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  action: Yup.string().nullable(),
  vendor: Yup.string().nullable(),
});

export default function AddTestimonial() {
  // TODO: waiting for dashboard/user context to be implemented
  const { actions, vendors } = useContext(CommunityContext);

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            image: null,
            title: "",
            description: "",
            action: null,
            vendor: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <VStack space={4} px="5" pt="10">
              <FormControl>
                <ImageInput
                  onChange={handleChange("image")}
                  value={values.image}
                />
              </FormControl>
              <FormControl isRequired isInvalid={errors.title && touched.title}>
                <Input
                  borderRadius="lg"
                  placeholder="Story Title"
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
                  placeholder="Your Story (limit: 9000 characters)"
                  maxLength={9000}
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
              <Text>Which action is this testimonial about?</Text>
              <FormControl>
                <ActionInput data={actions} onChange={(value) => setFieldValue("action", value)} value={values.action}/>
              </FormControl>
              <Text>Who helped you complete this action?</Text>
              <FormControl>
                <SPInput data={vendors} onChange={(value) => setFieldValue("vendor", value)} value={values.vendor}/>
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
