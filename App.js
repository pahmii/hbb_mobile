import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { extendTheme, NativeBaseProvider } from "native-base";
import Navigation from "./src/navigation/index";
import { StatusBar } from "expo-status-bar";

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {},
      defaultProps: {},
      variants: {},
      sizes: {},
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      {/* Rest of the app goes here */}
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
