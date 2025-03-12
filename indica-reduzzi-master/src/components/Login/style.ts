import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme"

export const s = StyleSheet.create({
    mainContainer: {
        minWidth: '90%',
        maxWidth: '95%',
        minHeight: 475,
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    header: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    logo: {
        width: 150,
        height: 45,
    }, 
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 28,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        color: 'grey'
    }, 
    inputBox: {
        width: '100%',
        height: 'auto',
        gap: 15,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    input: {
        minWidth: '50%',
        minHeight: 50,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: fontFamily.medium,
    },
    button: {
        backgroundColor: colors.blue.primary,
        minWidth: '50%',
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray.primary
    },
    buttonText: {
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: '#FFFFFF'
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: '100%',

    },
    link: {
        color: colors.blue.primary,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    }
})

