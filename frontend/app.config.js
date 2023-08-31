export default {
  expo: {
    name: "MassEnergize Mobile App",
    slug: "me-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#64B058",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      adaptiveIcon: {
        foregroundImage: "",
        backgroundColor: "#ffffff",
      },
      package: "com.ntdkhiem.memobile",
    },
    web: {
      favicon: "",
    },
    extra: {
      eas: {
        projectId: "b1d2fe9e-3308-4d2d-bc68-3e9640ae2699",
      },
    },
    plugins: ["@react-native-google-signin/google-signin"],
    scheme: "me-mobile",
  },
};
