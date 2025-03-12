import { colors, fontFamily } from "@/styles/theme"
import { StyleSheet } from "react-native"

export const s = StyleSheet.create({
    title: {
        fontSize: 40,
        fontFamily: fontFamily.bold,
        textAlign: 'left'
    },
    mark: {
        color: colors.blue.primary,
    },
})