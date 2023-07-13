import { Divider, Flex, Icon, Link, Text, VStack } from "native-base";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Page from "../../Shared/Page";

export default function SettingsPage() {
  return (
    <Page>
      <VStack space="5" pt="10" padding="5">
        <Flex flexDirection="row" alignItems="center">
          <Icon as={FontAwesome} name="user" size="md" color="primary.600" />
          <Text fontSize="md" px="5" flexGrow="1">
            Edit my profile
          </Text>
          <Icon
            as={FontAwesome}
            name="arrow-right"
            size="md"
            color="primary.600"
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon
            as={FontAwesome}
            name="envelope"
            size="md"
            color="primary.600"
          />
          <Text fontSize="md" px="5" flexGrow="1">
            Change my email
          </Text>
          <Icon
            as={FontAwesome}
            name="arrow-right"
            size="md"
            color="primary.600"
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon as={FontAwesome} name="key" size="md" color="primary.600" />
          <Text fontSize="md" px="5" flexGrow="1">
            Change my password
          </Text>
          <Icon
            as={FontAwesome}
            name="arrow-right"
            size="md"
            color="primary.600"
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon as={FontAwesome} name="bell" size="md" color="primary.600" />
          <Text fontSize="md" px="5" flexGrow="1">
            Notifications
          </Text>
          <Icon
            as={FontAwesome}
            name="arrow-right"
            size="md"
            color="primary.600"
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon as={FontAwesome} name="trash" size="md" color="primary.600" />
          <Text fontSize="md" px="5" flexGrow="1">
            Delete my account {"  "}
            <Text color="red.400" fontWeight="bold" fontSize="xs">
              This is Permanent!
            </Text>
          </Text>
          <Icon
            as={FontAwesome}
            name="arrow-right"
            size="md"
            color="primary.600"
          />
        </Flex>
      </VStack>
    </Page>
  );
}
