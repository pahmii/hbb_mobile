import React, { useState, createRef } from "react";
import { NativeBaseProvider, Button, Text } from "native-base";
import { Alert, View } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [scanButton, setScanButton] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const CHECK_COOKIE = `ReactNativeWebView.postMessage("Cookie: " + document.getElementsByName('viewport')[0].getAttribute("content")
  );true;`;

  let webViewRef = createRef();

  const onNavigationStateChange = (navigationState) => {
    const { url } = navigationState;

    // if (!url) return;
    if (
      url === "https://hbb.pgnmas.co.id/hbb-responsive/" ||
      url.includes("https://hbb.pgnmas.co.id/hbb-responsive/login") ||
      url.includes("https://hbb.pgnmas.co.id/hbb-responsive/logout")
    ) {
      setScanButton(true);
    } else {
      setScanButton(false);
    }

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(CHECK_COOKIE);
    }
  };

  const onMessage = (e) => {
    const { data } = e.nativeEvent;

    if (data.includes("Cookie:")) {
      // process the cookies
      console.log("kukis", data);
    }
  };

  return (
    <NativeBaseProvider>
      <WebView
        ref={webViewRef}
        cacheEnabled={false}
        source={{
          uri: "https://hbb.pgnmas.co.id/hbb-responsive",
        }}
        onNavigationStateChange={onNavigationStateChange}
        onMessage={onMessage}
        style={{ width: "100%", height: "100%", marginTop: 36 }}
      />
      <View
        style={{
          display: scanButton === true ? "none" : "flex",
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
