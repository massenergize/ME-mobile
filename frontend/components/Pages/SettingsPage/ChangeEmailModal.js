import React, { useState } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Modal, FormControl, Input, Text } from "native-base";

const validationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email("Please enter a valid email")
    .required("New email is required"),
  password: Yup.string().required("Password is required"),
});

const ChangeEmailModal = ({ isOpen, setIsOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Handle form submission
  const handleSubmit = async (values) => {
    console.log(values)
    setIsSubmitting(true);
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Formik
        initialValues={{ newEmail: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Change My Email</Modal.Header>
            <Modal.Body>
              {/* TODO: Display current email */}
              {/* <FormControl>
                <FormControl.Label>Current Email</FormControl.Label>
                <Input 
                  variant="rounded"
                  size="lg"
                  value="KHIEM"
                  isDisabled
                />
              </FormControl> */}
              <FormControl>
                <FormControl.Label>New Email</FormControl.Label>
                <Input
                  variant="rounded"
                  size="lg"
                  onChangeText={handleChange("newEmail")}
                  onBlur={handleBlur("newEmail")}
                  value={values.newEmail}
                  placeholder="New Email"
                />
                {errors.newEmail && touched.newEmail && (
                  <Text color="red.500">{errors.newEmail}</Text>
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  variant="rounded"
                  size="lg"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  type="password"
                />
                {errors.password && touched.password && (
                  <Text color="red.500">{errors.password}</Text>
                )}
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group>
                <Button
                  variant="ghost"
                  _text={{ color: "muted.400" }}
                  onPress={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  isLoadingText="Saving..."
                  onPress={handleSubmit}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangeEmailModal;
