import React, { useState, useEffect } from "react";
import {
    Button,
    Center,
    Image,
    Text,
    Box,
    VStack,
    Input,
    ScrollView,
    HStack,
    Icon,
    Modal,
    Heading,
    Flex,
    Pressable,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Page from "../../Shared/Page";
import SearchBar from "../../Shared/SearchBar";

import { apiCall } from "../../../api/functions";

const filterOptions = [
    {
        value: "all",
        label: "All",
    },
    {
        value: "cities & towns",
        label: "Cities & Towns",
    },
    {
        value: "other communities",
        label: "Other Communities",
    },
    {
        value: "schools",
        label: "Schools",
    },
];

export default function CommunitySearchPage({ navigation }) {
    const [communities, setCommunities] = useState([]);
    const [zipCode, setZipCode] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleZipCodeSubmit = () => {
        // TODO: validate zip code
        setShowModal(false);
    };

    useEffect(() => {
        // TODO: add loading state
        // TODO: is it possible to add extra parameters like limit, offset, etc.? (for pagination)
        apiCall("communities.list").then((json) => {
            if (json.success) {
                setCommunities(json.data);
            } else {
                console.log(json);
            }
        });
    }, []);

    return (
        <Page>
            <Box height="50%" backgroundColor={"amber.100"}>
                <Center h="full">
                    {/* TODO: Add an image here */}
                    <Heading>IMAGE</Heading>
                </Center>
            </Box>
            <Box
                position="absolute"
                backgroundColor="white"
                width="100%"
                height="60%"
                bottom="0"
                borderTopRadius="30"
            >
                <Box mx="5">
                    <VStack space="5" pt="10">
                        <HStack space="2" alignItems="center">
                            <Text>Communities near: </Text>
                            <Pressable onPress={() => setShowModal(true)}>
                                <HStack space="1" alignItems="center">
                                    <Text
                                        fontSize="2xl"
                                        fontWeight="bold"
                                        color="primary.400"
                                    >
                                        {zipCode ? zipCode : "0000"}
                                    </Text>
                                    <Icon
                                        as={FontAwesome}
                                        name="pencil"
                                        color="primary.400"
                                    />
                                </HStack>
                            </Pressable>
                        </HStack>
                        <SearchBar filterOptions={filterOptions} />
                        {/* Container for communities */}
                        <ScrollView height="80">
                            {communities.map((community) => (
                                <Pressable
                                    key={community.id}
                                    onPress={() =>
                                        navigation.navigate("drawer", {
                                            community_id: community.id,
                                        })
                                    }
                                >
                                    <Flex
                                        flexDirection="row"
                                        alignItems="center"
                                    >
                                        <Image
                                            source={{
                                                uri: community.logo?.url,
                                            }}
                                            alt="Community Logo"
                                            size="100px"
                                            resizeMode="contain"
                                        />
                                        <Box width="70%" pl="5">
                                            <Text
                                                fontSize="lg"
                                                fontWeight="bold"
                                            >
                                                {community.name}
                                            </Text>

                                            <Text
                                                fontSize="sm"
                                                color="muted.400"
                                            >
                                                {community.is_geographically_focused
                                                    ? `${community.location.city}, ${community.location.state}`
                                                    : `${community.location?.country}`}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </VStack>
                </Box>
            </Box>
            {/* Modal for inputting zip code */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                size="lg"
            >
                <Modal.Content maxWidth="400px">
                    <Modal.Body>
                        <Center mb="5">
                            <Icon
                                as={FontAwesome}
                                name="globe"
                                size="90"
                                color="primary.600"
                            />
                            <Text fontSize="lg" fontWeight="bold" py="5">
                                Let's find your community!
                            </Text>
                            <Input
                                placeholder="Enter your zip code..."
                                variant="rounded"
                                value={zipCode}
                                onChangeText={(text) => setZipCode(text)}
                            />
                        </Center>
                        <Button onPress={handleZipCodeSubmit}>Submit</Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Page>
    );
}