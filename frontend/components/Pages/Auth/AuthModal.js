import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Modal, VStack, Button } from "native-base";
import AuthModalController from "./AuthModalController";
import { useNavigation } from "@react-navigation/native";
import { CommunityContext } from "../../Contexts/CommunityContext";
import useAuth from "../../Hooks/useAuth";

function AuthModal() {
  const modalRef = useRef();
  const navigation = useNavigation();
  const { communityInfo } = useContext(CommunityContext);
  const { authenticateWithGoogle } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);

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
            {/* <Button
              shadow="5"
              size="lg"
              backgroundColor="primary.400"
              onPress={() => {
                navigation.navigate("withEmailOnly");
                AuthModalController.hideModal();
              }}
            >
              With email only
            </Button> */}
            <Button
              shadow="5"
              size="lg"
              backgroundColor="black"
              onPress={() => {
                navigation.navigate("login", {
                  community_id: communityInfo.community_id,
                });
                AuthModalController.hideModal();
              }}
            >
              With email and password
            </Button>
            <Button
              shadow="5"
              size="lg"
              backgroundColor="red.400"
              onPress={() => {
                authenticateWithGoogle(() =>
                  navigation.navigate("login", {
                    community_id: communityInfo.community_id,
                  })
                );

                AuthModalController.hideModal();
              }}
            >
              With Google
            </Button>
            {/* <Button shadow="5" size="lg" backgroundColor="blue.400">
              With Facebook
            </Button> */}
            {/* <Button
              size="lg"
              variant="ghost"
              onPress={() => {
                // TODO: Implement guest login. Where should this go?
                AuthModalController.hideModal();
              }}
            >
              Proceed as guest
            </Button> */}
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default forwardRef(AuthModal);
