export default {
  presets: [
    ['@babel/preset-env', {
      targets: 'defaults',
      useBuiltIns: 'entry',
      corejs: 3.8
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    'react-hot-loader/babel'
  ]
}
