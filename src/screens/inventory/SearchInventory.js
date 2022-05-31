import React from "react";
import { NativeBaseProvider } from "native-base";
import { Button, Alert } from "react-native";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export default function SearchInventory() {
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <WebView
        source={{
          //   uri: "http://103.93.57.36:9000/hbb-responsive",
          uri: "https://hbb.pgnmas.co.id/hbb-responsive/repair",
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
