// this configuration is to ensure that the Firebase JS SDK is bundled correctly.
// https://docs.expo.dev/guides/using-firebase/#configure-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;

