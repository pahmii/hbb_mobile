import React, { useState, useEffect } from "react";
import {
  NativeBaseProvider,
  VStack,
  Center,
  View,
  Text,
  useToast,
  FormControl,
  Input,
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
import SearchableDropdown from "react-native-searchable-dropdown";
import ActionApi from "../../api/Action";

export default function DeleteInventory({ route, navigation }) {
  const [user, setUser] = useState([]);
  const actionApi = new ActionApi();

  // const [isLoading, setIsLoading] = useState(false);
  const [requestData, setRequestData] = useState({});
  let [service, setService] = React.useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const navigations = useNavigation();
  const toast = useToast();
  const noInventory = route.params.noInventory;

  const initialData = async () => {
    try {
      const result = await actionApi.findToInventory();
      const rename = result.map((obj) => {
        obj["name"] = obj["emp_name"]; // Assign new key
        delete obj["emp_name"]; // Delete old key
        return obj;
      });
      setRequestData(result);
    } catch (e) {
      console.log("🚀 ~ initialData ~ error", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    initialData();
    // console.log("tetot", requestData);
  }, []);

  return (
    <NativeBaseProvider>
      <View flex={1} style={IndexStyle.wrapper}>
        <SearchableDropdown
          onItemSelect={(item) => {
            setSelectedItems(item);
          }}
          containerStyle={{ padding: 5 }}
          // onRemoveItem={(item, index) => {
          //   const items = selectedItems.selectedItems.filter(
          //     (sitem) => sitem.id !== item.id
          //   );
          //   setSelectedItems({ selectedItems: items });
          // }}
          itemStyle={{
            padding: 10,
            marginTop: 4,
            backgroundColor: "#ddd",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{ color: "#222" }}
          itemsContainerStyle={{ maxHeight: 140 }}
          // items={items}
          items={requestData}
          defaultIndex={0}
          resetValue={false}
          textInputProps={{
            placeholder: "Cari Nama Tujuan Pemindahan Barang",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            },
            onTextChange: (text) => {
              console.log(selectedItems?.selectedItems?.name);
            },
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
        <ScrollView>
          <Formik
            enableReinitialize={true}
            initialValues={selectedItems}
            onSubmit={async (values) => {
              try {
                const payload = {
                  values,
                  type: "pemindahan",
                  no_hbb: noInventory,
                };
                const result = await actionApi.movingInventory(payload);
                console.log("balikan", JSON.stringify(result));
                toast.show({
                  render: () => {
                    return (
                      <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={10}>
                        Data Pemindahan Berhasil Terkirim Ke {values.name}
                      </Box>
                    );
                  },
                  placement: "top",
                });
              } catch (error) {
                console.log(">>>>>>", error);
                toast.show({
                  title: error?.message,
                  placement: "bottom",
                });
              }
            }}
          >
            {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
              <VStack space={4} mt="4" py={8} px={4} borderRadius={8}>
                <FormControl isRequired={true} isInvalid={"name" in errors}>
                  <FormControl.Label
                    _text={{
                      color: "coolGray.800",
                      fontSize: "lg",
                      fontWeight: 500,
                    }}
                  >
                    Nama Tujuan
                  </FormControl.Label>
                  <Input
                    onBlur={handleBlur("name")}
                    value={values?.name}
                    fontSize="lg"
                    isDisabled={true}
                    style={{ backgroundColor: "gray", color: "black" }}
                  />
                  <FormControl.ErrorMessage>
                    {errors.name}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired={true} isInvalid={"area" in errors}>
                  <FormControl.Label
                    _text={{
                      color: "coolGray.800",
                      fontSize: "lg",
                      fontWeight: 500,
                    }}
                  >
                    Area
                  </FormControl.Label>
                  <Input
                    value={values.area}
                    fontSize="lg"
                    isDisabled={true}
                    style={{ backgroundColor: "gray", color: "black" }}
                  />
                  <FormControl.ErrorMessage>
                    {errors.area}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired={true} isInvalid={"satker" in errors}>
                  <FormControl.Label
                    _text={{
                      color: "coolGray.800",
                      fontSize: "lg",
                      fontWeight: 500,
                    }}
                  >
                    Satuan Kerja
                  </FormControl.Label>
                  <Input
                    value={values.satker}
                    fontSize="lg"
                    isDisabled={true}
                    style={{ backgroundColor: "gray", color: "black" }}
                  />
                  <FormControl.ErrorMessage>
                    {errors.satker}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired={true} isInvalid={"lokasi" in errors}>
                  <FormControl.Label
                    _text={{
                      color: "coolGray.800",
                      fontSize: "lg",
                      fontWeight: 500,
                    }}
                  >
                    Lokasi
                  </FormControl.Label>
                  <Input
                    onBlur={handleBlur("lokasi")}
                    value={values.lokasi}
                    fontSize="lg"
                    isDisabled={true}
                    style={{ backgroundColor: "gray", color: "black" }}
                  />
                  <FormControl.ErrorMessage>
                    {errors.lokasi}
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
