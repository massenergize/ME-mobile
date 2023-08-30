import React, { useState } from "react";
import moment from "moment";

import { Button, Modal, Select } from "native-base";

const ActionSelectDateModal = ({ isOpen, setIsOpen, title, handleSubmit }) => {
  const [completionDate, setCompletionDate] = useState(null);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </Modal.Header>
        <Modal.Body>
          <Select
            selectedValue={completionDate}
            accessibilityLabel="Select completion date"
            placeholder="Select completion date"
            onValueChange={(itemValue) => setCompletionDate(itemValue)}
            _selectedItem={{
              bg: "primary.100",
            }}
          >
            <Select.Item
              label="Just completed it!"
              value="Just completed it!"
            />
            <Select.Item
              label={`Earlier this year (${moment().format("YYYY")})`}
              value={`Earlier this year (${moment().format("YYYY")})`}
            />
            <Select.Item
              label={`Last year (${moment()
                .subtract(1, "years")
                .format("YYYY")})`}
              value={`Last year (${moment()
                .subtract(1, "years")
                .format("YYYY")})`}
            />
            <Select.Item label="Before last year" value="Before last year" />
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button onPress={() => setIsOpen(false)}>Cancel</Button>
            <Button
              onPress={() => {
                handleSubmit(completionDate);
                setIsOpen(false);
              }}
            >
              Apply
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ActionSelectDateModal;
