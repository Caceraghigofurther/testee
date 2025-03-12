import { ActivityIndicator } from "react-native";
import { s } from "./styles";
import { colors } from "@/styles/color";

export default function Loading() {
  return <ActivityIndicator color={colors.blue.primary} style={s.container} />;
}
