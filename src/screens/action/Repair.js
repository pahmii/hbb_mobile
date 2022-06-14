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

export default function RepairInventory({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pickingImage, setPickingImage] = useState(null);
  const navigations = useNavigation();
  const toast = useToast();
  // const { dataInventory } = route.params;

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
      setPickingImage(imageView.uri);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.damageType)
      errors.damageType = "Masukan jenis kerusakan yang dialami";
    return errors;
  };

  const _handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      let resetPayload = {
        password: values.oldPassword,
      };
      const result = await authProfile.resetPassword(resetPayload);
      toast.show({
        title: result?.data?.message,
        placement: "bottom",
      });
      console.log("ress", result);
      setIsLoading(false);
      //   navigation.navigate("Profile");
      // const token = await SecureStore.getItemAsync("accessToken");
    } catch (error) {
      console.log(">>>>>>", error);
      toast.show({
        title: error?.message,
        placement: "bottom",
      });
      setIsLoading(false);
      // resetForm();
    }
  };

  //   const getInitialData = async () => {
  //     let user = await SecureStore.getItemAsync("user");

  //     setUser(JSON.parse(user));
  //   };

  //   useEffect(() => {
  //     getInitialData();
  //   }, []);

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
              <VStack space={4} mt="4" py={8} px={4} borderRadius={8}>
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
              </VStack>
            )}
          </Formik>
          {pickingImage && (
            <>
              <Image
                source={{ uri: pickingImage }}
                style={{ width: 200, height: 200, marginLeft: 16 }}
              />
              <Text fontSize="sm" marginLeft={4}>
                Upload Image : /...{pickingImage.slice(-16)}{" "}
              </Text>
            </>
          )}
          <VStack space={4} px={4} mt="2" borderRadius={8}>
            <Text fontSize="lg" fontWeight={500}>
              Attachment Upload
            </Text>
            <Button
              onPress={() => {
                // changeRequestStatus(requestData?.data?.status);
                toast.show({
                  render: () => {
                    return (
                      <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={10}>
                        Data ke upload
                      </Box>
                    );
                  },
                  placement: "top",
                });
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
                  // color: "white",
                  fontSize: "xl",
                }}
                isLoading={isLoading}
                isLoadingText="Waiting response from server..."
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
                isLoadingText="Waiting response from server..."
                // onPress={() => navigation.navigate("Home")}
                onPress={() =>
                  toast.show({
                    render: () => {
                      return (
                        <Box
                          bg="emerald.500"
                          px="2"
                          py="1"
                          rounded="sm"
                          mb={10}
                        >
                          Ceritanya Mengirim Data
                        </Box>
                      );
                    },
                    placement: "top",
                  })
                }
              >
                Proses
              </Button>
            </HStack>
          </VStack>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}
