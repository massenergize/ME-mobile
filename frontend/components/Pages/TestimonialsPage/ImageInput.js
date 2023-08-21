import React from "react";
import { TouchableWithoutFeedback } from "react-native";

import {
  Actionsheet,
  View,
  Box,
  Text,
  Icon,
  useDisclose,
  Image,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

const ImageContainer = ({ uri, onDelete, onEdit }) => {
  return (
    <Box
      height="150"
      borderColor="muted.300"
      borderRadius="lg"
      borderWidth="1"
    >
      <Image
        source={{ uri }}
        resizeMode="contain"
        height="100%"
        width="100%"
        alt="image"
      />
      <Icon
        as={FontAwesome}
        name="pencil"
        size="lg"
        color="muted.400"
        position="absolute"
        bottom="5"
        right="5"
        onPress={onEdit}
      />
      <Icon
        as={FontAwesome}
        name="trash"
        size="lg"
        color="muted.400"
        position="absolute"
        bottom="5"
        left="5"
        onPress={onDelete}
      />
    </Box>
  );
}

const ImageInput = ({ onChange, value = null }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    onClose();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    onClose();

    if (!status.granted) {
      await requestPermission();
      takePhoto();
    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        onChange(result.assets[0].uri);
      }
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={onOpen}>
        <Box
          height="150"
          borderColor="muted.300"
          borderRadius="lg"
          borderWidth="1"
        >
          {value ? (
            <ImageContainer uri={value} onDelete={() => onChange("")} onEdit={onOpen} />
          ) : (
            <Box
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="muted.400" mb="2">
                Upload your image here
              </Text>
              <Text>
                <Icon
                  as={FontAwesome}
                  name="upload"
                  size="lg"
                  color="muted.400"
                />{" "}
                /{" "}
                <Icon
                  as={FontAwesome}
                  name="camera"
                  size="lg"
                  color="muted.400"
                />
              </Text>
            </Box>
          )}
        </Box>
      </TouchableWithoutFeedback>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={pickImage}
            startIcon={<Icon as={FontAwesome} name="upload" size="6" />}
          >
            Upload from gallery
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={takePhoto}
            startIcon={<Icon as={FontAwesome} name="camera" size="6" />}
          >
            Take a photo
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default ImageInput;
