// filepath: /C:/Users/dulac/indica-reduzzi/app.config.js
import 'dotenv/config';

export default {
  expo: {
    owner: "reduzzi",
    name: "indica-reduzzi",
    slug: "indica-reduzzi",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "com.reduzzi.indicareduzzi",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splashscreen_logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: "Este aplicativo precisa de acesso à câmera para tirar fotos.",
        NSLocationWhenInUseUsageDescription: "Este aplicativo precisa de acesso à sua localização para fornecer serviços baseados em localização."
      }
    },
    android: {
      package: "com.reduzzi.indicareduzzi",
      versionCode: 1,
      permissions: [
        "CAMERA",
        "ACCESS_FINE_LOCATION"
      ],
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      FIREBASE_PROJECT_ID: process.env.PROJECT_ID,
      eas: {
        projectId: process.env.EAS_PROJECT_ID
      }
    }
  }
};