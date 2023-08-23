import React from "react";
import { Modal, ScrollView, VStack, Button } from "native-base";

const ListResources = ({
  isOpen,
  setIsOpen,
  data,
  onSelect,
  title = "Resources",
}) => {

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
      <Modal.Content maxHeight="400">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <VStack space={2} alignItems="center">
              {data.map((i, index) => {
                return (
                  <Button
                    key={index}
                    onPress={() => onSelect(i.id)}
                    variant="ghost"
                  >
                    {i.title || i.name}
                  </Button>
                );
              })}
            </VStack>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ListResources;
