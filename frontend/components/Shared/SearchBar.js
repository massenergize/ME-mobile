import React, { useState } from "react";
import { Input, Icon, Flex, Button, Popover } from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SearchBar({ filterOptions = [], ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const SearchIcon = () => (
    <Icon
      as={<FontAwesome name="search" />}
      size="sm"
      m={2}
      color="muted.400"
    />
  );
  return (
    <Flex flexDirection="row" {...props}>
      <Input
        flexGrow="1"
        placeholder="Search..."
        variant="rounded"
        InputRightElement={<SearchIcon />}
      />
      {filterOptions.length !== 0 && (
        <Popover
          trigger={(triggerProps) => {
            return (
              <Button
                variant="ghost"
                {...triggerProps}
                onPress={() => setIsOpen(true)}
              >
                <Icon
                  as={FontAwesome}
                  name="filter"
                  size="sm"
                  color="muted.400"
                />
              </Button>
            );
          }}
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
        >
          <Popover.Content>
            <Popover.Arrow />
            <Popover.CloseButton onPress={() => setIsOpen(false)} />
            <Popover.Header>Filter</Popover.Header>
            <Popover.Body>
              {/* TODO: There is a slight delay whenever it's being opened. (Potential solution: cache it) */}
              {filterOptions.map((option, idx) => (
                <Button
                  variant="ghost"
                  key={idx}
                  _text={{
                    color: "black",
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Popover.Body>
          </Popover.Content>
        </Popover>
      )}
    </Flex>
  );
}
