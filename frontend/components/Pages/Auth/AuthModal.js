import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Modal, VStack, Button } from "native-base";
import AuthModalController from "./AuthModalController";

function AuthModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef();

  useLayoutEffect(() => {
    AuthModalController.setModalRef(modalRef);
  }, []);

  useImperativeHandle(modalRef, () => ({
    show: () => {
      setIsModalVisible(true);
    },
    hide: () => {
      setIsModalVisible(false);
    },
  }));

  return (
    <Modal
      isOpen={isModalVisible}
      onClose={() => {
        AuthModalController.hideModal();
      }}
      size="lg"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header alignSelf="center">Sign In or Join</Modal.Header>
        <Modal.Body>
          <VStack space="4">
            <Button
              shadow="5"
              size="lg"
              backgroundColor="primary.400"
              //   onPress={() => navigation.navigate("withEmailOnly")}
            >
              With email only
            </Button>
            <Button
              shadow="5"
              size="lg"
              backgroundColor="black"
              //   onPress={() => navigation.navigate("login")}
            >
              With email and password
            </Button>
            <Button shadow="5" size="lg" backgroundColor="red.400">
              With Google
            </Button>
            <Button shadow="5" size="lg" backgroundColor="blue.400">
              With Facebook
            </Button>
            <Button
              size="lg"
              variant="ghost"
              //   onPress={() => navigation.navigate("chooseCommunity")}
            >
              Proceed as guest
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default forwardRef(AuthModal);
