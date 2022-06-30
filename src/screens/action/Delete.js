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
import ActionApi from "../../api/Action";

export default function DeleteInventory({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigations = useNavigation();
  const toast = useToast();
  const noInventory = route.params.noInventory;
  const deleteApi = new ActionApi();

  const validate = (values) => {
    const errors = {};

    if (!values.reason) errors.reason = "Masukan alasan penghapusan";
    if (!values.remark) errors.remark = "Masukan deskripsi";
    return errors;
  };

  return (
    <NativeBaseProvider>
      <View flex={1} style={IndexStyle.wrapper}>
        <ScrollView>
          <Formik
            initialValues={{
              reason: "",
              remark: "",
            }}
            validate={validate}
            onSubmit={async (values) => {
              setIsLoading(true);
              try {
                const payload = {
                  values,
                  type: "penghapusan",
                  no_hbb: noInventory,
                };
                const result = await deleteApi.deleteInventory(payload);
                console.log("balikan", JSON.stringify(result));
                toast.show({
                  render: () => {
                    return (
                      <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={10}>
                        Data Penghapusan Berhasil
                      </Box>
                    );
                  },
                  placement: "top",
                });
                setIsLoading(false);
                resetForm();
                navigations.popToTop();
              } catch (error) {
                console.log(">>>>>>", error);
                toast.show({
                  title: error?.message,
                  placement: "bottom",
                });
                setIsLoading(false);
                // resetForm();
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <VStack space={4} py={4} px={4} borderRadius={8}>
                <FormControl isRequired={true} isInvalid={"reason" in errors}>
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
                    onBlur={handleBlur("reason")}
                    onValueChange={handleChange("reason")}
                    selectedValue={values.reason}
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
                    {errors.reason}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired={true} isInvalid={"remark" in errors}>
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
                    onBlur={handleBlur("remark")}
                    placeholder="Masukan Keterangan Kerusakan"
                    onChangeText={handleChange("remark")}
                    value={values.remark}
                    fontSize="lg"
                  />
                  <FormControl.ErrorMessage>
                    {errors.remark}
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
                      fontSize: "xl",
                    }}
                    onPress={() => navigations.popToTop()}
                  >
                    Tutup
                  </Button>
                  <Button
                    mt="2"
                    width={100}
                    bg={Colors.primary7}
                    _text={{
                      fontSize: "xl",
                    }}
                    isLoading={isLoading}
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
