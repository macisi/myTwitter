module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@screen': './src/screen',
          '@model': './src/model',
          '@utils': './src/utils',
        },
        extensions: ['.ts', 'tsx', '.js', '.json', '.es', '.mjs'],
      },
    ],
    '@babel/plugin-transform-runtime',
    [
      'import',
      {
        libraryName: 'react-use',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
    ],
  ],
};
