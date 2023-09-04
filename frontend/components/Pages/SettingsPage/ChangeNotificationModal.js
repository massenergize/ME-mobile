import React, { useState } from "react";
import { Modal, Radio, Text, Button } from "native-base";

const ChangeNotificationModal = ({ isOpen, setIsOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState("weekly");

  // TODO: Handle form submission
  const handleSave = () => {
    console.log(notificationFrequency);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Communication Preferences</Modal.Header>
        <Modal.Body>
          <Text mb="5">
            How often would you like to be notified about new events?
          </Text>
          <Radio.Group
            name="notificationFrequency"
            accessibilityLabel="Communication Preferences"
            value={notificationFrequency}
            onChange={setNotificationFrequency}
          >
            <Radio my="2" value="daily">
              Daily
            </Radio>
            <Radio my="2" value="weekly">
              Weekly
            </Radio>
            <Radio my="2" value="biweekly">
              Biweekly
            </Radio>
            <Radio my="2" value="monthly">
              Monthly
            </Radio>
            <Radio my="2" value="never">
              Never
            </Radio>
          </Radio.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button variant="ghost" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              isLoading={isSubmitting}
              isLoadingText="Saving..."
              onPress={handleSave}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ChangeNotificationModal;
