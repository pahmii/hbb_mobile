import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import { Alert, View } from "react-native";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export default function SearchInventory() {
  const navigation = useNavigation();
  const [hiddenButton, setHiddenButton] = useState(true);

  return (
    <NativeBaseProvider>
      <WebView
        source={{
          uri: "https://hbb.pgnmas.co.id/hbb-responsive/repair",
        }}
        onNavigationStateChange={(newNavState) => {
          const { url } = newNavState;
          // if (!url) return;
          if (url.includes("https://hbb.pgnmas.co.id/hbb-responsive/repair")) {
            setHiddenButton(false);
          }
        }}
        style={{ width: "100%", height: "100%", marginTop: 36 }}
      />

      <View
        style={{
          display: hiddenButton === true ? "none" : "flex",
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <Button
          onPress={() => navigation.navigate("Camera")}
          style={{ height: 48 }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
            Scan Here
          </Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
}
