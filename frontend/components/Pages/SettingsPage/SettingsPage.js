import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Flex, Icon, Text, VStack } from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Page from "../../Shared/Page";
import EditProfileModal from "./EditProfileModal";
import ChangeEmailModal from "./ChangeEmailModal";
import ChangePasswordModal from "./ChangePasswordModal";

const SettingOptions = [
  {
    name: "profile",
    label: "Edit my profile",
    icon: "user",
  },
  {
    name: "email",
    label: "Change my email",
    icon: "envelope",
  },
  {
    name: "password",
    label: "Change my password",
    icon: "key",
  },
  {
    name: "notification",
    label: "Change communication preferences",
    icon: "bell",
  },
  {
    name: "delete",
    label: "Delete my account",
    icon: "trash",
  },
];

export default function SettingsPage() {
  const [isEMPOpen, setIsEMPOpen] = useState(false);
  const [isCMEOpen, setIsCMEOpen] = useState(false);
  const [isCMPOpen, setIsCMPOpen] = useState(false);

  const handleOpenModal = (name) => {
    if (name === "profile") {
      setIsEMPOpen(true);
    } else if (name === "email") {
      setIsCMEOpen(true);
    } else if (name === "password") {
      setIsCMPOpen(true);
    }
  };

  return (
    <Page>
      <VStack space="5" pt="10" padding="5">
        {SettingOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOpenModal(option.name)}
          >
            <Flex flexDirection="row" alignItems="center">
              <Icon
                as={FontAwesome}
                name={option.icon}
                size="md"
                color="primary.600"
                textAlign="center"
              />
              <Text fontSize="md" px="5" flexGrow="1">
                {" "}
                {option.label}{" "}
              </Text>
              <Icon
                as={FontAwesome}
                name="arrow-right"
                size="md"
                color="primary.600"
              />
            </Flex>
          </TouchableOpacity>
        ))}
        <EditProfileModal isOpen={isEMPOpen} setIsOpen={setIsEMPOpen} />
        <ChangeEmailModal isOpen={isCMEOpen} setIsOpen={setIsCMEOpen} />
        <ChangePasswordModal isOpen={isCMPOpen} setIsOpen={setIsCMPOpen} />
      </VStack>
    </Page>
  );
}
