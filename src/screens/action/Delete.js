import React, { useState } from "react";
import {
  NativeBaseProvider,
  VStack,
  View,
  useToast,
  FormControl,
  TextArea,
  Button,
  HStack,
  Box,
  ScrollView,
  CheckIcon,
  Select,
} from "native-base";
import { IndexStyle, Colors } from "../../assets/styles";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

// export default function DeleteInventory({ route, navigation }) {
export default function DeleteInventory() {
  const [user, setUser] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [pickingImage, setPickingImage] = useState(null);
  let [service, setService] = React.useState("");
  const navigations = useNavigation();
  const toast = useToast();
  // const { dataInventory } = route.params;

  // const pickImage = async () => {
  //   let imageView = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quantity: 1,
  //   });
  //   console.log(
  //     "🚀 ~ file: DetailRequestBox.js ~ line 77 ~ pickImage ~ result",
  //     imageView
  //   );

  //   if (!imageView.cancelled) {
  //     setPickingImage(imageView.uri);
  //   }
  // };

  const validate = (values) => {
    const errors = {};

    if (!values.reasonDelete)
      errors.reasonDelete = "Masukan alasan penghapusan";
    if (!values.description) errors.description = "Masukan deskripsi";
    return errors;
  };

  // const _handleSubmit = async (values, { resetForm }) => {
  const _handleSubmit = async (values) => {
    // setIsLoading(true);
    try {
      const payload = {
        reason: values.reasonDelete,
        description: values.description,
      };
      // const result = await authProfile.resetPassword(resetPayload);
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={10}>
              {JSON.stringify(payload)}
            </Box>
          );
        },
        placement: "top",
      });
      console.log(
        "🚀 ~ file: DeleteInventory.js ~ line 115 ~ _handleSubmit ~ result",
        payload
      );
    } catch (error) {
      console.log(">>>>>>", error);
      toast.show({
        title: error?.message,
        placement: "bottom",
      });
      // setIsLoading(false);
      // resetForm();
    }
  };

  return (
    <NativeBaseProvider>
      <View flex={1} style={IndexStyle.wrapper}>
        <ScrollView>
          <Formik
            initialValues={{
              reasonDelete: "",
              description: "",
            }}
            validate={validate}
            onSubmit={(values) => {
              _handleSubmit(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <VStack space={4} mt="4" py={8} px={4} borderRadius={8}>
                <FormControl
                  isRequired={true}
                  isInvalid={"reasonDelete" in errors}
                >
                  <FormControl.Label
                    _text={{
                      color: "coolGray.800",
                      fontSize: "lg",
                      fontWeight: 500,
                    }}
                  >
                    Alasan Penghapusan
                  </FormControl.Label>
                  <Select
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder="Choose Service"
                    _selectedItem={{
                      bg: "primary.300",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    fontSize="lg"
                    onBlur={handleBlur("reasonDelete")}
                    onValueChange={handleChange("reasonDelete")}
                    selectedValue={values.reasonDelete}
                  >
                    <Select.Item label="Rusak" value="rusak" />
                    <Select.Item label="Musnah" value="musnah" />
                    <Select.Item label="Hilang" value="hilang" />
                    <Select.Item
                      label="Tinggal Guna (Obsolete)"
                      value="obsolete"
                    />
                    <Select.Item
                      label="Turun Mutu (Deteriorated)"
                      value="deteriorated"
                    />
                    <Select.Item label="Kadaluwarsa" value="kadaluwarsa" />
                    <Select.Item
                      label="Dekanibalisasi"
                      value="dekanibalisasi"
                    />
                    <Select.Item label="Lain-lain" value="lain-lain" />
                  </Select>

                  <FormControl.ErrorMessage>
                    {errors.reasonDelete}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isRequired={true}
                  isInvalid={"description" in errors}
                >
                  <FormControl.Label
                    _text={{
                      color: "coolGray.800",
                      fontSize: "lg",
                      fontWeight: 500,
                    }}
                  >
                    Keterangan
                  </FormControl.Label>
                  <TextArea
                    onBlur={handleBlur("description")}
                    placeholder="Masukan Keterangan Kerusakan"
                    onChangeText={handleChange("description")}
                    value={values.description}
                    fontSize="lg"
                  />
                  <FormControl.ErrorMessage>
                    {errors.description}
                  </FormControl.ErrorMessage>
                </FormControl>
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
                    // isLoading={isLoading}
                    // isLoadingText="Waiting response from server..."
                    // onPress={() => navigations.popToTop()}
                    onPress={() => {
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
                              DUAR! *sensor*!
                            </Box>
                          );
                        },
                        placement: "top",
                      });
                      console.log("DUAR! *sensor*!");
                    }}
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
                    // isLoading={isLoading}
                    // isLoadingText="Waiting response from server..."
                    // onPress={() => navigation.navigate("Home")}
                    onPress={handleSubmit}
                  >
                    Proses
                  </Button>
                </HStack>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}
