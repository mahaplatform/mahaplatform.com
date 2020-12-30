export default {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      corejs: 3.8,
      targets: {
        chrome: 57,
        edge: 14,
        firefox: 53,
        ie: 11,
        safari: 10,
        node: 7.5
      }
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties'
  ]
}
