import 'core-js'
import 'regenerator-runtime/runtime'
import { setConfig } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import App from './app'
import React from 'react'

setConfig({
  errorReporter: false
})

ReactDOM.render(<App />, document.getElementById('platform'))
