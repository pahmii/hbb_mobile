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
import MovingApi from "../../api/Action";

// export default function DeleteInventory({ route, navigation }) {
export default function MoveInventory() {
  const [user, setUser] = useState([]);
  const movingApi = new MovingApi();

  // const [isLoading, setIsLoading] = useState(false);
  const [requestData, setRequestData] = useState({});
  let [service, setService] = React.useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const navigations = useNavigation();
  const toast = useToast();
  // const { dataInventory } = route.params;

  const initialData = async () => {
    try {
      const result = await movingApi.moveInventory();
      const rename = result.map((obj) => {
        obj["name"] = obj["emp_name"]; // Assign new key
        delete obj["emp_name"]; // Delete old key
        return obj;
      });
      console.log("riname", rename);
      setRequestData(result);
    } catch (e) {
      console.log("🚀 ~ initialData ~ error", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    initialData();
    console.log("tetot", requestData);
  }, []);

  // var items = [
  //   {
  //     id: 1,
  //     emp_name: "Sonny Rahmawan Abdi",
  //     area: "Tangerang",
  //     lokasi: "Area Tangerang dan Sekitarnya",
  //     satker: "Sales Area Head",
  //   },
  //   {
  //     id: 2,
  //     emp_name: "Bonny",
  //     area: "Cibinong",
  //     lokasi: "Area Cibinong dan Sekitarnya",
  //     satker: "Manager",
  //   },
  //   {
  //     id: 3,
  //     emp_name: "Budi",
  //     area: "Jakarta",
  //     lokasi: "Area Jakarta dan Sekitarnya",
  //     satker: "Programmer",
  //   },
  //   {
  //     id: 4,
  //     emp_name: "Mukti",
  //     area: "Malang",
  //     lokasi: "Area Malang dan Sekitarnya",
  //     satker: "DevOps",
  //   },
  //   {
  //     id: 5,
  //     emp_name: "Made",
  //     area: "Bali",
  //     lokasi: "Area Bali dan Sekitarnya",
  //     satker: "Fire Force",
  //   },
  // ];

  // const _handleSubmit = async (values, { resetForm }) => {
  const _handleSubmit = async (values) => {
    // setIsLoading(true);
    try {
      const payload = {
        selectedItems,
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
    }
  };

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
            onSubmit={(values) => {
              try {
                const payload = values;
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
                    // isLoading={isLoading}
                    // isLoadingText="Waiting response from server..."
                    onPress={() => navigations.popToTop()}
                    // onPress={() => {
                    //   toast.show({
                    //     render: () => {
                    //       return (
                    //         <Box
                    //           bg="emerald.500"
                    //           px="2"
                    //           py="1"
                    //           rounded="sm"
                    //           mb={10}
                    //         >
                    //           DUAR! *sensor*!
                    //         </Box>
                    //       );
                    //     },
                    //     placement: "top",
                    //   });
                    //   console.log("DUAR! *sensor*!");
                    // }}
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
