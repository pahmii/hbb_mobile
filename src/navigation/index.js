import * as React from "react";
import { ColorSchemeName } from "react-native";
import { View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import ScanCamera from "../screens/scan/ScanCamera";
import DefaultCamera from "../screens/scan/DefaultCamera";
import SearchInventory from "../screens/inventory/SearchInventory";
import RepairInventory from "../screens/action/Repair";
import DeleteInventory from "../screens/action/Delete";
import MoveInventory from "../screens/action/Move";

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
      {/* ACTION */}
      <Stack.Screen
        name="Repair"
        component={RepairInventory}
        options={{
          title: "Perbaikan Barang",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteInventory}
        options={{
          title: "Penghapusan Barang",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Move"
        component={MoveInventory}
        options={{
          title: "Pemindahan Barang",
          headerBackVisible: false,
        }}
      />
      {/* ACTION - - - END */}
    </Stack.Navigator>
  );
}
