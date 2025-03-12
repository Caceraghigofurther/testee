import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/styles/theme';

export const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
    height: '100%',
    borderRadius: 8,
    
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
  },
  headerText: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    marginBottom: 16,
    color: colors.text.primary,
  },
  obraItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  obraImagem: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  obraInfo: {
    flex: 1,
  },
  obraTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  obraData: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily  : fontFamily.medium,
    marginBottom: 8,
  },
  obraStatus: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily  : fontFamily.semiBold,
  },
});