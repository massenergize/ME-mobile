import React, { useState } from "react";
import { Modal, FormControl, Input, VStack, Button } from "native-base";

const EditProfileModal = ({ isOpen, setIsOpen }) => {
  const [fullName, setFullName] = useState("");
  const [preferredName, setPreferredName] = useState("");

  const handleChange = (type, text) => {
    if (type === "fn") {
      setFullName(text);
    } else if (type === "pn") {
      setPreferredName(text);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Edit My Profile</Modal.Header>
        <Modal.Body>
          <VStack space="5">
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                variant="rounded"
                size="lg"
                onChangeText={(text) => handleChange("fn", text)}
                value={fullName}
                placeholder="Full Name"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Preferred Name</FormControl.Label>
              <Input
                variant="rounded"
                size="lg"
                onChangeText={(text) => handleChange("pn", text)}
                value={preferredName}
                placeholder="Preferred Name"
              />
            </FormControl>
            {/* TODO: Add option to upload your profile image. */}
          </VStack>
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
            {/* TODO: Submit changes to the backend */}
            <Button>Apply</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default EditProfileModal;
