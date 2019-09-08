import { hot } from 'react-hot-loader'
import Style from './components/style'
import Email from './components/email'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  _handleMessage = this._handleMessage.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  state = {
    config: null
  }

  render() {
    if(!this.state.config) return null
    return [
      <Style key="style" { ...this._getStyle() } />,
      <Email key="email" { ...this._getEmail() } />
    ]
  }

  componentDidMount() {
    window.addEventListener('message', this._handleMessage, false)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._handleMessage, false)
  }

  _getEmail() {
    const { config } = this.state
    return { config }
  }

  _getStyle() {
    const { config } = this.state
    return { config }
  }

  _handleMessage(e) {
    const message = e.data
    if(message.target !== 'designer') return
    if(message.action === 'update') this._handleUpdate(message.data)
  }

  _handleUpdate({ config }) {
    this.setState({ config })
  }

}

export default hot(module)(App)
