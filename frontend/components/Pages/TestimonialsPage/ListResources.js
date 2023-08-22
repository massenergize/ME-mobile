import React from "react";
import { Modal, ScrollView, VStack } from "native-base";

const ListResources = ({ isOpen, setIsOpen, title = "Resources", componentsToRender = [] }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
      <Modal.Content maxHeight="400">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
            <ScrollView>
                <VStack space={2} alignItems="center">
                    {componentsToRender.map((Component, index) => {
                        return <Component key={index} />;
                    })}
                </VStack>
            </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ListResources;
