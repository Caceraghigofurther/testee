import React from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { s } from "./style";

type IndicateButtonProps = TouchableOpacityProps & {
  backgroundImage: any;
  buttonText: string;
  navigateTo: any;
  variant?: "primary" | "secondary";
};

export default function Indication({
  backgroundImage,
  buttonText,
  navigateTo,
  variant = "primary",
  ...rest
}: IndicateButtonProps) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(navigateTo);
  };

  const words = buttonText.split(" ");

  return (
    <TouchableOpacity
      style={[s.button, variant === "secondary" && s.buttonSecondary]}
      onPress={handleNavigation}
      activeOpacity={0.7}
      {...rest}
    >
      <ImageBackground source={backgroundImage} style={s.buttonImageBackground}>
        <View style={s.buttonContent}>
          {words.map((word, index) => (
            <Text key={index} onPress={handleNavigation} style={s.buttonText}>
              {word}
            </Text>
          ))}
        </View>
        <Text onPress={handleNavigation} style={s.buttonTextSecondary}>
          Confira &gt;
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}