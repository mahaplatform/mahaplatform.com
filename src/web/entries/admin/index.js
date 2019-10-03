import 'babel-polyfill'
import initReactFastclick from 'react-fastclick'
import { setConfig } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import App from './app'
import React from 'react'

setConfig({
  errorReporter: false
})

initReactFastclick()

ReactDOM.render(<App />, document.getElementById('platform'))
