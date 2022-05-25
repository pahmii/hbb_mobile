import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useToast } from "native-base";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Colors, Dimensions } from "../../assets/styles";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DefaultCamera() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestPermissionsAsync();

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      alert("Permission for media access needed. ");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const toast = useToast();
  const navigation = useNavigation();

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      // toast.show({
      //   description: "QR Berhasil di Scan",
      // });
      // navigation.goBack();
      console.log(data.uri);
      setImageUri(data.uri);
    }
  };

  const sendPicture = () => {
    toast.show({
      description: "Bukti Pengiriman Berhasil Dikirim",
    });
    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={[
            styles.fixedRatio,
            {
              // position: "absolute",
              // left: 0,
              // top: 0,
              // width: Dimensions.Window.width,
              // height: Dimensions.Window.height,
            },
          ]}
          type={type}
          ratio={"1:1"}
        />

        {/* <Image
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 1,
            width: Dimensions.Window.width,
            height: Dimensions.Window.height,
            opacity: 1,
          }}
          source={require("../../assets/images/scan-overlay.png")}
        /> */}

        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 24,
            width: Dimensions.Window.width,
            height: 64,
            // backgroundColor: "#ddd",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: -48,
            zIndex: 2,
          }}
        >
          <Pressable
            style={{
              width: 48,
              height: 48,
              borderRadius: 48,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary5,
            }}
            onPress={pickImage}
          >
            <FontAwesome
              name="image"
              size={28}
              style={{ color: Colors.darkContrast }}
            />
          </Pressable>
          <Pressable
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary5,
              marginLeft: 48,
            }}
            onPress={takePicture}
          >
            <FontAwesome
              name="camera"
              size={30}
              style={{ color: Colors.darkContrast }}
            />
          </Pressable>
          {/* <Button onPress={takePicture} width={56} height={56}>
            <FontAwesome name="camera" size={30} style={{ marginBottom: -3 }} />
          </Button> */}
          {/* <Button title={"Take Picture"} onPress={takePicture} />
          <Button title={"Gallery"} onPress={pickImage} /> */}
        </View>
      </View>

      {imageUri && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 9,
          }}
        >
          <Image
            source={{ uri: imageUri }}
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: 64,
              left: 0,
              bottom: 24,
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                width: 64,
                height: 64,
                borderRadius: 64,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.primary5,
              }}
              onPress={sendPicture}
            >
              <FontAwesome
                name="arrow-circle-right"
                size={48}
                style={{ color: Colors.darkContrast }}
              />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
