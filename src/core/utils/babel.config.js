module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    'transform-promise-to-bluebird',
    ['module-resolver', {
      alias: {
        '@admin': './src/lib/admin',
        '@analytics': './src/analytics',
        '@apps': './src/apps',
        '@core': './src/core',
        '@client': './src/lib/client',
        '@public': './src/lib/public',
        '@web': './src/web'
      }
    }]
  ]
}
