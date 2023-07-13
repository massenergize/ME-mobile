import React, { useState } from "react";
import {
  Actionsheet,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useDisclose,
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CATEGORIES = [
  "Home Energy",
  "Solar",
  "Transportation",
  "Food",
  "Waste & Recylcing",
  "Land, Soil & Water",
  "Activism & Education",
];

const IMPACTS = ["Low", "Medium", "High"];

const COSTS = ["0", "$", "$$", "$$$"];

const Filter = ({ label, values, initValue = null }) => {
  const [chosenFilter, setChosenFilter] = useState(initValue);
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleClick = (value) => {
    if (chosenFilter === value) setChosenFilter(null);
    else setChosenFilter(value);
    onClose();
  };

  return (
    <Box>
      <Button variant="outline" rounded="full" onPress={onOpen}>
        <Text>
          {chosenFilter
            ? chosenFilter.length > 4
              ? chosenFilter.slice(0, 4) + "..."
              : chosenFilter
            : label}{" "}
          {"  "}
          <Icon as={FontAwesome} name="chevron-down" size="sm" />
        </Text>
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {values.map((value, idx) => (
            <Actionsheet.Item
              key={idx}
              onPress={() => handleClick(value)}
              bgColor={chosenFilter === value ? "muted.200" : "white"}
            >
              {value}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default function ActionsFilter() {
  return (
    <Flex flexDirection="row" justifyContent="space-evenly">
      <Filter
        label={"Status"}
        values={["Todo", "Completed"]}
        initValue={"Todo"}
      />
      <Filter label={"Category"} values={CATEGORIES} />
      <Filter label={"Impact"} values={IMPACTS} />
      <Filter label={"Cost"} values={COSTS} />
    </Flex>
  );
}
