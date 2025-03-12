import { StyleSheet } from "react-native";
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
    container: {
        minWidth: '90%',
        maxWidth: '95%',
        minHeight: 575,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 32,
        textAlign: 'center'
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
    picker: {
        minWidth: '50%',
        maxHeight: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
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

    
})