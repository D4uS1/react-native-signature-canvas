const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// 库的根目录
const libraryRoot = path.resolve(__dirname, '../..');

// 添加库目录到 watchFolders（只添加库的源码目录）
config.watchFolders = [libraryRoot];

// 这些模块必须从 sign-app 的 node_modules 解析，防止重复实例
const exclusiveModules = [
  'react',
  'react-native',
  'react-native-webview',
  'expo',
];

// 配置 extraNodeModules 确保关键模块从正确位置解析
config.resolver.extraNodeModules = exclusiveModules.reduce((acc, name) => {
  acc[name] = path.resolve(__dirname, 'node_modules', name);
  return acc;
}, {});

// 阻止从库的 node_modules 加载任何模块
config.resolver.blockList = [
  new RegExp(`${libraryRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/node_modules/.*`),
  new RegExp(`${libraryRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/example/(?!sign-app).*`),
];

module.exports = config;
