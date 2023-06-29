import React, { useState } from "react";
import {
  Input,
  Icon,
  Flex,
  Button,
  Popover,
  VStack,
  Text,
  Pressable,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SearchBar({
  filterOptions = [],
  filterHeader = "Filter",
  ...props
}) {
  const [chosenFilters, setChosenFilters] = useState([]); // [{label: "Food", value: "food"}, ...
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
    <VStack space="2" {...props}>
      <Flex flexDirection="row">
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
              <Popover.Header>{filterHeader}</Popover.Header>
              <Popover.Body>
                {/* TODO: There is a slight delay whenever it's being opened. (Potential solution: cache it) */}
                {filterOptions.map((option, idx) => (
                  <Button
                    variant="ghost"
                    key={idx}
                    _text={{
                      color: "black",
                    }}
                    onPress={() => {
                      setChosenFilters([...chosenFilters, option]);
                      setIsOpen(false);
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
      <Flex flexDirection="row" flexWrap="wrap">
        {chosenFilters.map((filter, idx) => (
          <Button borderRadius="full" size="sm" m="1" key={idx}>
            <Text color="white">
              {filter.label}{" "}
              <Pressable
                onPress={() => {
                  setChosenFilters(
                    chosenFilters.filter((f) => f.value !== filter.value)
                  );
                }}
              >
                <Icon as={FontAwesome} name="times" color="white" />
              </Pressable>
            </Text>
          </Button>
        ))}
      </Flex>
    </VStack>
  );
}
