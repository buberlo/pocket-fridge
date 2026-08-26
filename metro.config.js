let getDefaultConfig;
let mergeConfig;

try {
  ({ getDefaultConfig, mergeConfig } = require('@react-native/metro-config'));
} catch (error) {
  ({ getDefaultConfig, mergeConfig } = require('metro-config'));
}

/** @type {import('metro-config').MetroConfig} */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);