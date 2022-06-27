import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  LayoutAnimation,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import {
  Box,
  Button,
  Text,
  ScrollView,
  HStack,
  FormControl,
  Input,
  Pressable,
  VStack,
  View,
  FlatList,
  Row,
  SectionList,
} from "native-base";
import { useToast, Actionsheet, useDisclose } from "native-base";

import { Colors, Dimensions } from "../../assets/styles";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { isEmptyArray } from "formik";

import ScanInventory from "../../api/ScanCam";

export default function ScanCamera() {
  const layouts = useWindowDimensions();
  const toast = useToast();
  const scanInventory = new ScanInventory();

  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrType, setQrType] = useState(null);
  const [scannedData, setScannedData] = useState();
  const [detailId, setDetailId] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detailBarcode, setDetailBarcode] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    reset();
  }, []);

  // // BIKIN ACCORDION //
  // const Accordion = (props) => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const index = props.index;
  //   const title = props.title;
  //   const children = props.children;

  //   const toggleOpen = () => {
  //     setIsOpen((value) => !value);
  //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //     setIsLoading(false);
  //   };

  //   return (
  //     <>
  //       <View pt={index != 0 ? 2 : 0} style={{ width: "100%" }}>
  //         <TouchableOpacity
  //           onPress={toggleOpen}
  //           activeOpacity={0.6}
  //           style={{
  //             width: "100%",
  //             backgroundColor: "#ddd",
  //             paddingHorizontal: 12,
  //             paddingVertical: 6,
  //             borderRadius: 4,
  //           }}
  //         >
  //           <HStack alignItems={"center"}>
  //             <Text color="#2D3545">{title}</Text>
  //             <Entypo
  //               name={isOpen ? "chevron-up" : "chevron-down"}
  //               size={18}
  //               color="#2D3545"
  //               style={{ marginLeft: "auto" }}
  //             />
  //           </HStack>
  //         </TouchableOpacity>
  //         <View
  //           px={2}
  //           style={[styles.list, !isOpen ? styles.hidden : undefined]}
  //         >
  //           {children}
  //         </View>
  //       </View>
  //     </>
  //   );
  // };
  // // ---### END OF ACCORDION ###--- //

  // const MasterList = (props) => {
  //   const data = props.data;

  //   return (
  //     <SafeAreaView>
  //       <FlatList
  //         data={data}
  //         renderItem={({ item, key }) => (
  //           <Box
  //             borderBottomWidth="1"
  //             _dark={{
  //               borderColor: "gray.600",
  //             }}
  //             borderColor="coolGray.200"
  //             py="2"
  //           >
  //             {item.layout === "vertical" ? (
  //               <VStack space={3} justifyContent="space-between" key={key}>
  //                 <Text
  //                   _dark={{
  //                     color: "warmGray.50",
  //                   }}
  //                   color="coolGray.800"
  //                   bold
  //                 >
  //                   {item.name}
  //                 </Text>
  //                 {typeof item.value === "string" ? (
  //                   <Text>{item.value}</Text>
  //                 ) : (
  //                   <HStack w={"100%"}>
  //                     <View w={"100%"} key={key}>
  //                       {item.value}
  //                     </View>
  //                   </HStack>
  //                 )}
  //               </VStack>
  //             ) : (
  //               <HStack
  //                 space={3}
  //                 justifyContent="space-between"
  //                 alignItems="flex-start"
  //                 key={key}
  //               >
  //                 <Text
  //                   _dark={{
  //                     color: "warmGray.50",
  //                   }}
  //                   color="coolGray.800"
  //                   bold
  //                 >
  //                   {item.name}
  //                 </Text>
  //                 {typeof item.value === "object" ? (
  //                   <HStack>
  //                     <View ml="auto" key={key}>
  //                       {item.value}
  //                     </View>
  //                   </HStack>
  //                 ) : (
  //                   <Text>{item.value}</Text>
  //                 )}
  //               </HStack>
  //             )}
  //           </Box>
  //         )}
  //         keyExtractor={(item, index) => item?.id + "" + index}
  //         // keyExtractor={(item) => `_key${item.id.toString()}`}
  //         // keyExtractor={(item) => item.id}
  //       />
  //     </SafeAreaView>
  //   );
  // };

  const reset = () => {
    setQrType(null);
    setScanned(false);
    setDetailId(null);
    onClose();
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setIsLoading(true);
    toast.closeAll();
    toast.show({
      render: () => {
        return (
          <Box bg={Colors.primary5} px="2" py="1" rounded="sm" mb={2}>
            Verify QR Data. Please wait...
          </Box>
        );
      },
      placement: "top",
    });
    try {
      const result = await scanInventory.scanInventaris(data);
      if (result.status === 200) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm">
                Data Found ✅
              </Box>
            );
          },
          placement: "top",
        });
        // navigation.navigate("inventory");
        onOpen();
        setDetailBarcode(result.data[0]);
        // console.log(result.data[0]);
        setResultData(result);
        setScannedData(data);

        setIsLoading(true);
      } else {
        toast.show({
          render: () => {
            return (
              <Box bg="danger.500" px="2" py="1" rounded="sm" mb={10}>
                {result.message}
              </Box>
            );
          },
          placement: "top",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // no BAST
  // tanggal BAST
  // negara pembuat

  // tahun pembuatan
  // merk
  // tipe

  // jenis
  // model
  // warna
  // kapasitas
  // ukuran
  // noseri
  // nopol
  // no rangka
  // no mesin
  // no bpkb
  // no kontrak

  // tanggal kontrak
  // harga perolehan
  // bisnis unit
  // area
  // satuan kerja
  // lokasi
  // penanggung jawab
  // kondisi
  // keterangan

  const ScanContent = () => {
    const scanResult = [
      {
        name: "Jenis Barang",
        value: detailBarcode?.jenis ?? "-",
      },
      {
        name: "Main Group",
        value: detailBarcode?.id_main_group ?? "-",
      },
      {
        name: "Sub Group",
        value: detailBarcode?.id_sub_group ?? "-",
      },
      {
        name: "Tahun Perolehan",
        value: detailBarcode?.year ?? "-",
      },
      {
        name: "No Urut",
        value: detailBarcode?.id_barang ?? "-",
      },
      {
        name: "Nama Barang",
        value: detailBarcode?.name ?? "-",
      },
      {
        name: "Distributor",
        value: detailBarcode?.distributor ?? "-",
      },
      {
        name: "Jumlah Barang",
        value: detailBarcode?.jumlah ?? "-",
      },
      {
        name: "No Akuntansi",
        value: detailBarcode?.no_akuntansi ?? "-",
      },
      {
        name: "No BAST",
        value: detailBarcode?.no_bast ?? "-",
      },
      {
        name: "Negara Pembuat",
        value: detailBarcode?.country ?? "-",
      },
      {
        name: "Tahun Pembuatan",
        value: detailBarcode?.year_made ?? "-",
      },
      {
        name: "Merk",
        value: detailBarcode?.merk ?? "-",
      },
      {
        name: "Tipe",
        value: detailBarcode?.type ?? "-",
      },
      {
        name: "Action",
        value: null,
      },
      //   <>
      //     {resultData?.data?.map((item, index) => {
      //       const title = (
      //         <View>
      //           <Text numberOfLines={1} w={"90%"}>
      //             Action
      //           </Text>
      //         </View>
      //       );

      //       const Body = () => {
      //         const accordionBodyData = [
      {
        name: "Perbaikan",
        value: (
          <Button
            onPress={() => {
              navigation.navigate("Repair", {
                noInventory: scannedData,
              });
              reset();
            }}
          >
            Click Me!
          </Button>
        ),
      },
      {
        name: "Penghapusan",
        value: (
          <Button
            onPress={() => {
              navigation.navigate("Delete", {
                noInventory: scannedData,
              });
              reset();
            }}
          >
            Click Me!
          </Button>
        ),
      },
      {
        name: "Pemindahan",
        value: (
          <Button
            onPress={() => {
              navigation.navigate("Move", {
                noInventory: scannedData,
              });
              reset();
            }}
          >
            Click Me!
          </Button>
        ),
      },
    ];

    return (
      <SafeAreaView>
        <FlatList
          data={scanResult}
          renderItem={({ item, key }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              py="2"
            >
              {item.layout === "vertical" ? (
                <VStack space={3} justifyContent="space-between" key={key}>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.name}
                  </Text>
                  {typeof item.value === "string" ? (
                    <Text>{item.value}</Text>
                  ) : (
                    <HStack w={"100%"}>
                      <View w={"100%"} key={key}>
                        {item.value}
                      </View>
                    </HStack>
                  )}
                </VStack>
              ) : (
                <HStack
                  space={3}
                  justifyContent="space-between"
                  alignItems="flex-start"
                  key={key}
                >
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.name}
                  </Text>
                  {typeof item.value === "object" ? (
                    <HStack>
                      <View ml="auto" key={key}>
                        {item.value}
                      </View>
                    </HStack>
                  ) : (
                    <Text>{item.value}</Text>
                  )}
                </HStack>
              )}
            </Box>
          )}
          keyExtractor={(item, index) => item?.id + "" + index}
        />
      </SafeAreaView>
    );

    //         return (
    //           <Accordion title={title} index={index}>
    //             <Body />
    //           </Accordion>
    //         );
    //       })}
    //     </>
    //   ),
    //   layout: "vertical",
    // },
    // {
    //   name: " ",
    //   value: " ",
    // },
    // {
    //   name: " ",
    //   value: " ",
    // },
    // ];

    // return <MasterList data={scanResult} />;
  };

  const showDisplayData = () => {
    return (
      <Actionsheet
        style={{ position: "absolute", bottom: 0, height: "100%" }}
        onClose={reset}
        isOpen={isOpen}
      >
        <Actionsheet.Content>
          <Box
            w="100%"
            pb={2}
            justifyContent="center"
            borderBottomWidth={1}
            borderBottomColor={"rgba(0,0,0,0.05)"}
          >
            <HStack mb={2}>
              <Text
                color="gray.600"
                fontSize="2xl"
                fontWeight={700}
                _dark={{
                  color: "gray.300",
                }}
              >
                Hasil Scan Barcode
              </Text>
            </HStack>
          </Box>
          <ScrollView
            nestedScrollEnabled={true}
            style={{ width: "100%", marginBottom: 0 }}
          >
            <View pt={2} px={4}>
              {ScanContent()}
            </View>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    );
  };

  if (hasPermission === null)
    return <Text>Requesting for camera permission</Text>;

  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.absoluteFillObject}
        />

        {scanned && (
          <Button
            style={{
              position: "absolute",
              // left: "20%",
              bottom: 35,
              width: 200,
              height: 48,
              borderRadius: 48,
              backgroundColor: Colors.secondary5,
              zIndex: 5,
              color: Colors.darkContrast,
            }}
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          >
            <Text>Tap to Scan Again</Text>
          </Button>
        )}

        <Text
          style={{
            position: "absolute",
            bottom: 35,
            zIndex: 3,
            color: Colors.darkContrast,
          }}
        >
          Scan Your Barcode
        </Text>

        <Image
          style={{
            position: "absolute",
            top: (Dimensions.Window.width / 6) * -1,
            zIndex: 1,
            opacity: 1,
            width: Dimensions.Window.width,
            height: Dimensions.Window.height,
          }}
          source={require("../../assets/images/scan-overlay.png")}
        />
        {showDisplayData()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.Window.height,
  },
  cameraContainer: {
    height: Dimensions.Window.height,
    flex: 1,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
    width: Dimensions.Window.width,
    height: Dimensions.Window.height,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: "hidden",
  },
  absoluteFillObject: {
    width: Dimensions.Window.width,
    height: Dimensions.Window.height,
  },
});
