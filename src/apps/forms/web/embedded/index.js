import 'babel-polyfill'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './app'
import qs from 'qs'

const query = qs.parse(window.location.search.substr(1))
const embedded = query.embedded !== undefined

ReactDOM.render(<App embedded={ embedded } />, document.getElementById('form'))
