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
} from "native-base";
import { useToast, Actionsheet, useDisclose } from "native-base";

import { Colors, Dimensions } from "../../assets/styles";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function ScanCamera() {
  const layouts = useWindowDimensions();
  const toast = useToast();

  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrType, setQrType] = useState(null);
  const [displayData, setDisplayData] = useState([]);
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
            Verify QR Data
          </Box>
        );
      },
      placement: "top",
    });
    try {
      if (data) {
        setDetailBarcode(data);

        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={10}>
                Data Found ✅
              </Box>
            );
          },
          placement: "top",
        }),
          onOpen();
        setIsLoading(true);
      } else {
        toast.show({
          render: () => {
            return (
              <Box bg="danger.500" px="2" py="1" rounded="sm" mb={10}>
                UNIDENTIFIED QR CODE
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

  const showDisplayData = () => {
    return (
      <Actionsheet
        style={{ position: "absolute", bottom: 0, height: 500 }}
        onClose={onClose}
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
            <HStack px={4}>
              <Text
                color="gray.600"
                fontSize="2xl"
                _dark={{
                  color: "gray.300",
                }}
              >
                Hasil Scan adalah {detailBarcode}
              </Text>
            </HStack>
          </Box>
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
