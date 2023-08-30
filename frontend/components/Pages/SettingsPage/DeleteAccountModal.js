import React, { useState } from "react";
import { Modal, Text, Button, FormControl, Input } from "native-base";

const DeleteAccountModal = ({ isOpen, setIsOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDelete = () => {
    setIsSubmitting(true);
    console.log("Deleting the account...");
    setPassword("");
    setErrorMessage("Password is incorrect.");
    setIsSubmitting(false);
    // setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Delete My Account</Modal.Header>
        <Modal.Body>
          <Text>
            The current email associated with your account is{" "}
            <Text color="secondary.400" fontWeight="bold" fontSize="md">
              null
            </Text>
          </Text>
          <FormControl my="5">
            <FormControl.Label>
              {" "}
              Enter your password to confirm{" "}
            </FormControl.Label>
            <Input
              variant="rounded"
              size="lg"
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Password"
              type="password"
              isInvalid={errorMessage}
            />
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          </FormControl>
          <Text>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button variant="ghost" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              colorScheme="danger"
              isLoading={isSubmitting}
              isLoadingText="Deleting..."
              onPress={handleDelete}
            >
              Delete
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteAccountModal;
