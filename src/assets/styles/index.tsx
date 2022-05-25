import { StyleSheet } from "react-native";
import { Colors } from "./color";
import Dimensions from "./layout";

const IndexStyle = StyleSheet.create({
  wrapper: {
    position: "relative",
    backgroundColor: Colors.BodyBg,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

// console.log(Window);

export { IndexStyle, Colors, Dimensions };
