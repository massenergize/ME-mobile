import React, { useState } from "react";
import moment from "moment";

import { Button, Modal, Select } from "native-base";

const ActionSelectDateModal = ({ action, isOpen, setIsOpen, title, handleSubmit }) => {
  const [completionDate, setCompletionDate] = useState(null);

  const renderOptions = () => {
    if (action === "DONE") {
      return [
        "Just completed it!",
        `Earlier this year (${moment().format("YYYY")})`,
        `Last year (${moment().subtract(1, "years").format("YYYY")})`,
        "Before last year",
      ]
    }

    return [
      "Very soon",
      `Later this year (${moment().format("YYYY")})`,
      "Next few years",
    ]
  }

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
            {renderOptions().map((option, index) => (
              <Select.Item key={index} label={option} value={option} />
            ))}
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
