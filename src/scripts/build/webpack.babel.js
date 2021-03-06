export default {
  presets: [
    ['@babel/preset-env', {
      corejs: 3.8,
      useBuiltIns: 'entry'
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties'
  ]
}
