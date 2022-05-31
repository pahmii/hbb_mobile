import * as React from "react";
import { ColorSchemeName } from "react-native";
import { View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import ScanCamera from "../screens/scan/ScanCamera";
import DefaultCamera from "../screens/scan/DefaultCamera";
import SearchInventory from "../screens/inventory/SearchInventory";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      {/* HOME */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* HOME - - - END */}

      {/* CAMERA */}
      <Stack.Screen
        name="Camera"
        component={ScanCamera}
        options={({ route, navigation }) => ({
          headerTitle: "Scan Barcode",
          headerShown: true,
          // headerLeft: () => <Text>"BACK"</Text>,
        })}
      />
      {/* CAMERA- - - END */}
      {/* INVENTORY */}
      <Stack.Screen
        name="inventory"
        component={SearchInventory}
        options={{
          title: "Search Inventory",
          headerShown: true,
        }}
      />
      {/* INVENTORY - - - END */}
    </Stack.Navigator>
  );
}

function Camera() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.secondary5,
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
      >
        {/* SCAN */}
        <Stack.Screen
          name="scan"
          component={ScanCamera}
          options={({ route, navigation }) => ({
            headerTitle: "SCAN QR",
            headerShown: true,
            // headerLeft: () => <Text>"BACK"</Text>,
          })}
        />
        <Stack.Screen
          name="camera"
          component={DefaultCamera}
          options={{
            title: "Ambil Gambar",
            headerShown: true,
          }}
        />
        {/* SCAN - - - END */}
        {/* INVENTORY */}
        <Stack.Screen
          name="inventory"
          component={SearchInventory}
          options={{
            title: "Search Inventory",
            headerShown: true,
          }}
        />
        {/* INVENTORY - - - END */}
      </Stack.Navigator>
    </>
  );
}
