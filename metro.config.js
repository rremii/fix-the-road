const { getDefaultConfig } = require('expo/metro-config')

module.exports = (() => {
  const config = getDefaultConfig(__dirname)

  const { transformer, resolver } = config

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  }
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  }

  const ALIASES = {
    '@shared/*': './src/shared/*',
    '@widgets/*': './src/widgets/*',
    '@features/*': './src/features/*',
    '@pages/*': './src/pages/*',
    '@icons/*': './assets/icons/*',
    '@fonts/*': './assets/fonts/*',
    '@modules/*': './modules/*',
  }

  config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (platform === 'web') {
      // The alias will only be used when bundling for the web.
      return context.resolveRequest(
        context,
        ALIASES[moduleName] ?? moduleName,
        platform,
      )
    }
    // Ensure you call the default resolver.
    return context.resolveRequest(context, moduleName, platform)
  }

  return config
})()
