import React, { useState } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Modal, FormControl, Input, Text, Button } from "native-base";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePasswordModal = ({ isOpen, setIsOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Handle form submission
  const handleSubmit = async (values) => {
    console.log(values);
    setIsSubmitting(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
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
            <Modal.Header>Change My Password</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Old Password</FormControl.Label>
                <Input
                  variant="rounded"
                  size="lg"
                  onChangeText={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  value={values.oldPassword}
                  placeholder="Old Password"
                  type="password"
                  isInvalid={touched.oldPassword && errors.oldPassword}
                />
                {touched.oldPassword && errors.oldPassword && (
                  <Text color="red.500">{errors.oldPassword}</Text>
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>New Password</FormControl.Label>
                <Input
                  variant="rounded"
                  size="lg"
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                  placeholder="New Password"
                  type="password"
                  isInvalid={touched.newPassword && errors.newPassword}
                />
                {touched.newPassword && errors.newPassword && (
                  <Text color="red.500">{errors.newPassword}</Text>
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  variant="rounded"
                  size="lg"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  type="password"
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text color="red.500">{errors.confirmPassword}</Text>
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
                  isLoadingText="Updating..."
                  onPress={handleSubmit}
                >
                  Update
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangePasswordModal;
