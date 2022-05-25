import React from "react";
import { NativeBaseProvider } from "native-base";
import { Button, Alert } from "react-native";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <WebView
        source={{
          uri: "http://103.93.57.36:9000/hbb-responsive",
        }}
        style={{ width: "100%", height: "100%" }}
      />

      <Button
        title="Scannya Dimarih Ceng"
        onPress={() => navigation.navigate("Camera")}
      />
    </NativeBaseProvider>
  );
}
