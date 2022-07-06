import React, { useState, useEffect, useRef } from "react";
import {
  NativeBaseProvider,
  VStack,
  View,
  Text,
  useToast,
  FormControl,
  Input,
  Button,
  HStack,
  Box,
  ScrollView,
} from "native-base";
import { Image } from "react-native";
import { IndexStyle, Colors } from "../../assets/styles";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import ActionApi from "../../api/Action";

export default function RepairInventory({ route, navigation }) {
  const actionApi = new ActionApi();
  const [isLoading, setIsLoading] = useState(false);
  const [pickingImage, setPickingImage] = useState(null);
  const navigations = useNavigation();
  const toast = useToast();
  const noInventory = route.params.noInventory;
  const noNIPG = route.params.nipgUser;

  const pickImage = async () => {
    let imageView = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quantity: 1,
    });
    console.log(
      "🚀 ~ file: DetailRequestBox.js ~ line 77 ~ pickImage ~ result",
      imageView
    );

    if (!imageView.cancelled) {
      setPickingImage(imageView);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.damageType)
      errors.damageType = "Masukan jenis kerusakan yang dialami";
    return errors;
  };
  1;

  const _handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const payload = {
        no_hbb: noInventory,
        remark: values.damageType,
        attachment_file: pickingImage,
        type: "perbaikan",
        nipgUser: noNIPG,
      };
      const result = await actionApi.repairInventory(payload);
      const messageRes = JSON.parse(result);

      if (messageRes.status === 200) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={10}>
                Permintaan Perbaikan Barang Berhasil
              </Box>
            );
          },
          placement: "top",
        });
        setIsLoading(false);
        resetForm();
        navigations.popToTop();
      } else {
        toast.show({
          render: () => {
            return (
              <Box
                bg="danger.100"
                px="4"
                py="2"
                rounded="sm"
                mb={10}
                _text={{
                  color: "#cf1322",
                }}
              >
                {messageRes.message}
              </Box>
            );
          },
          placement: "top",
        });
        setIsLoading(false);
        resetForm();
        // navigations.popToTop();
      }
    } catch (error) {
      console.log(">>>>>>", error);
      toast.show({
        title: error,
        placement: "bottom",
      });
      setIsLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <View flex={1} style={IndexStyle.wrapper}>
        <ScrollView>
          <Formik
            initialValues={{
              damageType: "",
            }}
            validate={validate}
            onSubmit={(values, { resetForm }) => {
              _handleSubmit(values, { resetForm });
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <VStack space={4} py={8} px={4} borderRadius={8}>
                <FormControl
                  isRequired={true}
                  isInvalid={"damageType" in errors}
                >
                  <FormControl.Label
                    _text={{
                      color: "coolGray.800",
                      fontSize: "lg",
                      fontWeight: 500,
                    }}
                  >
                    Jenis Kerusakan
                  </FormControl.Label>
                  <Input
                    onBlur={handleBlur("damageType")}
                    placeholder="Masukan Jenis Kerusakan"
                    onChangeText={handleChange("damageType")}
                    value={values?.damageType}
                    fontSize="lg"
                  />
                  <FormControl.ErrorMessage>
                    {errors.damageType}
                  </FormControl.ErrorMessage>
                </FormControl>
                {pickingImage && (
                  <>
                    <Image
                      source={{ uri: pickingImage.uri }}
                      style={{ width: 200, height: 200, marginLeft: 16 }}
                      key={() => {
                        Math.random();
                      }}
                    />
                    <Text fontSize="sm" marginLeft={4}>
                      Upload Image : /...{pickingImage.uri.slice(-16)}{" "}
                    </Text>
                  </>
                )}
                <VStack space={4} borderRadius={8}>
                  <Text fontSize="lg" fontWeight={500}>
                    Attachment Upload
                  </Text>
                  <Button
                    onPress={() => {
                      pickImage();
                    }}
                    mb={2}
                    _text={{
                      // color: "white",
                      fontSize: "xl",
                    }}
                  >
                    Upload Image
                  </Button>
                  <HStack>
                    <Button
                      mt="2"
                      ml={4}
                      mr={32}
                      width={100}
                      bg={Colors.mediumTint}
                      _text={{
                        fontSize: "xl",
                      }}
                      // isLoading={isLoading}
                      // isLoadingText="Waiting response from server..."
                      onPress={() => navigations.popToTop()}
                    >
                      Tutup
                    </Button>
                    <Button
                      mt="2"
                      //   ml={16}
                      width={100}
                      bg={Colors.primary7}
                      _text={{
                        // color: "white",
                        fontSize: "xl",
                      }}
                      isLoading={isLoading}
                      // isLoadingText="Waiting response from server..."
                      // onPress={() => navigation.navigate("Home")}
                      onPress={handleSubmit}
                    >
                      Proses
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}
